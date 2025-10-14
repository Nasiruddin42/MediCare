import { getDoctorById } from '@/actions/appointments';
import PageHeader from '@/components/page-header';
import { redirect } from 'next/navigation';
import React from 'react';

interface DoctorProfileLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

// ✅ Fix generateMetadata typing
export async function generateMetadata({ params }: { params: { id: string } }) {
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

// ✅ Fix layout typing
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
