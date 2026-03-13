"use server";

import { Gender } from "@prisma/client";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { generateAvatar } from "../utils";

const getDoctors = async () => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: { select: { appointments: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.appointments,
    }));
  } catch (error) {
    console.log("Error in getDoctors server action:", error);
    throw new Error("Failed to fetch orders");
  }
};

interface CreateDoctorInput {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
}

const createDoctor = async (input: CreateDoctorInput) => {
  try {
    if (!input.name || !input.email)
      throw new Error("Name and email are required");

    const doctor = await prisma.doctor.create({
      data: {
        ...input,
        imageUrl: generateAvatar(input.name),
      },
    });

    revalidatePath("/admin");

    return doctor;
  } catch (error: any) {
    console.log("Error in createDoctor server action:", error);

    // Handle unique constraint violation (email already exists)
    if (error?.code === "P2002") {
      throw new Error("A doctor with this email already exists");
    }

    throw new Error("Failed to create doctor");
  }
};

interface UpdateDoctorInput extends Partial<CreateDoctorInput> {
  id: string;
}

const updateDoctor = async (input: UpdateDoctorInput) => {
  try {
    if (!input.name || !input.email)
      throw new Error("Name and email are required");

    const currentDoctor = await prisma.doctor.findUnique({
      where: { id: input.id },
      select: { email: true },
    });

    if (!currentDoctor) throw new Error("Doctor not found");

    // If email is changing, check if the new email already exists
    if (input.email !== currentDoctor.email) {
      const existingDoctor = await prisma.doctor.findUnique({
        where: { email: input.email },
      });

      if (existingDoctor)
        throw new Error("A doctor with this email already exists");
    }

    const doctor = await prisma.doctor.update({
      where: { id: input.id },
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        speciality: input.speciality,
        gender: input.gender,
        isActive: input.isActive,
      },
    });

    return doctor;
  } catch (error) {
    console.log("Error in updateDoctor server action:", error);
    throw new Error("Failed to update doctor");
  }
};

const getAvailableDoctors = async () => {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { appointments: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.appointments,
    }));
  } catch (error) {
    console.log("Error in getAvailableDoctors server action:", error);
    throw new Error("Failed to fetch available doctors");
  }
};

export { getDoctors, createDoctor, updateDoctor, getAvailableDoctors };
