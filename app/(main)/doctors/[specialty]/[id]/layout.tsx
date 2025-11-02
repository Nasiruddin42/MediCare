import { getDoctorById } from '@/actions/appointments';
import PageHeader from '@/components/page-header';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

interface DoctorProfileLayoutProps {
  children: ReactNode;
  // Next's internal types expect params to be a Promise in this async layout case
  params: Promise<{ id: string }>;
}

// generateMetadata receives params as a potentially async value — await it
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { doctor } = await getDoctorById(id);

  if (!doctor) {
    return {
      title: "Doctor not found - MediCare",
      description: "The requested doctor profile does not exist.",
    };
  }

  return {
    title: `Dr. ${doctor.name} - MediCare`,
    description: `Book an appointment with Dr. ${doctor.name}, ${doctor.specialty} specialist with ${doctor.experience} years of experience.`,
  };
}

const DoctorProfileLayout = async ({ children, params }: DoctorProfileLayoutProps) => {
  const { id } = await params;
  const { doctor } = await getDoctorById(id);

  if (!doctor) redirect("/doctors");

  return (
    <div className='container mx-auto'>
      <PageHeader
        // icon={<Stethoscope />}
        title={`Dr. ${doctor.name}`}
        backLink={`/doctors/${doctor.specialty}`}
        backLabel={`Back to ${doctor.specialty}`}
      />
      {children}
    </div>
  );
};

export default DoctorProfileLayout;
