"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  getAvailableDoctors,
} from "@/lib/actions/doctors";

const useGetDoctors = () => {
  const result = useQuery({
    queryKey: ["getDoctors"],
    queryFn: getDoctors,
  });

  return result;
};

const useCreateDoctor = () => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: createDoctor,
    // Invalidate related queries to refresh the data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
    },
    onError: (error) => console.log("Error while creating a doctor", error),
  });

  return result;
};

const useUpdateDoctor = () => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
      queryClient.invalidateQueries({ queryKey: ["getAvailableDoctors"] });
    },
    onError: (error) => console.log("Error while updating a doctor", error),
  });

  return result;
};

const useAvailableDoctors = () => {
  const result = useQuery({
    queryKey: ["getAvailableDoctors"],
    queryFn: getAvailableDoctors,
  });

  return result;
};

export { useGetDoctors, useCreateDoctor, useUpdateDoctor, useAvailableDoctors };
