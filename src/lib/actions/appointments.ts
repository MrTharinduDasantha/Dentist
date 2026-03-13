"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { AppointmentStatus } from "@prisma/client";

const transformAppointment = (appointment: any) => {
  return {
    ...appointment,
    patientName:
      `${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim(),
    patientEmail: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl || "",
    date: appointment.date.toISOString().split("T")[0],
  };
};

const getAppointments = async () => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.log("Error getAppointments server action:", error);
    throw new Error("Failed to fetch appointments");
  }
};

const getUserAppointments = async () => {
  try {
    // Get authenticated user from clerk
    const { userId } = await auth();
    if (!userId) throw new Error("You must be logged in to view appointments");

    // Find user by clerkId from authenticated session
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user)
      throw new Error(
        "User not found. Please ensure your account is propely set up.",
      );

    const appointments = await prisma.appointment.findMany({
      where: { userId: user.id },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.log("Error getUserAppointments server action:", error);
    throw new Error("Failed to fetch user appointments");
  }
};

const getUserAppointmentStats = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be authenticated");

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) throw new Error("User not found");

    // These calls will run in parallel, instead of waiting each other
    const [totalCount, completedCount] = await Promise.all([
      prisma.appointment.count({
        where: { userId: user.id },
      }),
      prisma.appointment.count({
        where: {
          userId: user.id,
          status: "COMPLETED",
        },
      }),
    ]);

    return {
      totalAppointments: totalCount,
      completedAppointments: completedCount,
    };
  } catch (error) {
    console.log("Error getUserAppointmentStats server action:", error);
    return {
      totalAppointments: 0,
      completedAppointments: 0,
    };
  }
};

const getBookedTimeSlots = async (doctorId: string, date: string) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: new Date(date),
        status: {
          in: ["CONFIRMED", "COMPLETED"],
        },
      },
      select: { time: true },
    });

    return appointments.map((appointment) => appointment.time);
  } catch (error) {
    console.log("Error getBookedTimeSlots server action:", error);
    return [];
  }
};

interface BookAppointmentInput {
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
}

const bookAppointment = async (input: BookAppointmentInput) => {
  try {
    const { userId } = await auth();
    if (!userId)
      throw new Error("You must be logged in to book an appointment");

    if (!input.doctorId || !input.date || !input.time) {
      throw new Error("Doctor, date, and time are required");
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user)
      throw new Error(
        "User not found. Please ensure your account is properly set up.",
      );

    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        doctorId: input.doctorId,
        date: new Date(input.date),
        time: input.time,
        reason: input.reason || "General consultation",
        status: "CONFIRMED",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true } },
      },
    });

    return transformAppointment(appointment);
  } catch (error) {
    console.log("Error bookAppointment server action:", error);
    throw new Error("Failed to book appointment");
  }
};

const updateAppointmentStatus = async (input: {
  id: string;
  status: AppointmentStatus;
}) => {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: input.id },
      data: { status: input.status },
    });

    return appointment;
  } catch (error) {
    console.log("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }
};

export {
  getAppointments,
  getUserAppointments,
  getUserAppointmentStats,
  getBookedTimeSlots,
  bookAppointment,
  updateAppointmentStatus,
};
