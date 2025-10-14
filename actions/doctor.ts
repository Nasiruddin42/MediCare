"use server";

import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function setAvailabilitySlots(formData: any) {
   const {userId} = await auth();

   if(!userId){
      throw new Error("Unauthorized");
   }

   try{
      const doctor = await db.user.findUnique({
         where: {
            clerkUserId : userId,
            role: "DOCTOR",
         },
      });

      if(!doctor){
         throw new Error("Doctor not found");
      }

      // Get form data
      const startTime = formData.get("startTime");
      const endTime = formData.get("endTime");

      //validate input
      if(!startTime || !endTime){
         throw new Error("Start time and end time are required");
      }

      if(startTime >= endTime){
         throw new Error("Start time must be before end time");
      }

      const existingSlots = await db.availability.findMany({
         where: {
            doctorId: doctor.id,
         },
      });

      /*  only allow 1 availability slot per doctor at a time

      if(existingSlots.length > 0){
          // Collect all slots that have no appointments
         const slotsWithNoAppointments = existingSlots.filter(
            (slot: any) => !slot.appointment
         );

         if (slotsWithNoAppointments.length > 0) {
            // Delete all slots without appointments
            await db.availability.deleteMany({
               where: {
                  id: {
                     in: slotsWithNoAppointments.map((slot) => slot.id),
                  },
               },
            });
         }
      }
      */

      // A doctor have multiple different available slots (e.g. morning + afternoon)
      if (existingSlots.length > 0) {
         // Remove only slots with no appointments that overlap with the new slot
         const overlappingSlots = existingSlots.filter(
            (slot: any) =>
               !slot.appointment &&
               new Date(startTime) < new Date(slot.endTime) &&
               new Date(endTime) > new Date(slot.startTime)
         );

         if (overlappingSlots.length > 0) {
            await db.availability.deleteMany({
               where: {
                  id: {
                     in: overlappingSlots.map((slot: any) => slot.id),
                  },
               },
            });
         }
      }

      // Create new availability slot
      const newSlot = await db.availability.create({
         data: {
            doctorId: doctor.id,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            status: "AVAILABLE",
         },
      });

      revalidatePath("/doctor");
      return { success: true, slot: newSlot };

   } catch (error) {
      if (error instanceof Error) {
         throw new Error("Failed to set availability: " + error.message);
      } else {
         throw new Error("Failed to set availability: " + String(error));
      }
   }
}

export async function getDoctorAvailability(){
   const {userId} = await auth();

   if(!userId){
      throw new Error("Unauthorized");
   }

   try {
      const doctor = await db.user.findUnique({
         where: {
            clerkUserId : userId,
            role: "DOCTOR",
         },
      });

      if(!doctor){
         throw new Error("Doctor not found");
      }

      const availabilitySlots = await db.availability.findMany({
         where: {
            doctorId: doctor.id,
         },
         orderBy: {
            startTime: "asc",
         },
      });

      return { slots: availabilitySlots };

   } catch (error) {
      if (error instanceof Error) {
         throw new Error("Failed to fetch availability slots: " + error.message);
      } else {
         throw new Error("Failed to fetch availability slots: " + String(error));
      }
   }
}

export async function getDoctorAppointments(){
   return [];
}