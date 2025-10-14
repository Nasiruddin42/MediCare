import { getAvailableTimeSlots, getDoctorById } from '@/actions/appointments';
import { redirect } from 'next/navigation';
import React from 'react';
import DoctorProfile from './_components/doctor-profile';

interface DoctorProfilePageProps {
  params: Promise<{ id: string }>;
}

const DoctorProfilePage = async ({ params }: DoctorProfilePageProps) => {
  const { id } = await params;

  try {
    const [doctorData, slotsData] = await Promise.all([
      getDoctorById(id),
      getAvailableTimeSlots(id),
    ]);

    if (!doctorData?.doctor) {
      redirect("/doctors");
    }

    return (
      <DoctorProfile 
        doctor={doctorData.doctor}
        availableDays={slotsData?.days || []}
      />
    );
  } catch (error) {
    console.error("Error loading doctor profile:", error);
    redirect("/doctors");
  }
};

export default DoctorProfilePage;
