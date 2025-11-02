// app/(main)/doctors/[specialty]/page.tsx
import React from "react";
import { getDoctorsBySpecialty } from "@/actions/doctors-listing";
import DoctorCard from "@/components/doctor-card";
import PageHeader from "@/components/page-header";
import { redirect } from "next/navigation";

interface SpecialtyPageProps {
  // make params a Promise to match the App Router's inferred shape in your project
  params: Promise<{ specialty: string }>;
}

const SpecialtyPage = async ({ params }: SpecialtyPageProps) => {
  // await params because params is a Promise here
  const { specialty } = await params;

  if (!specialty) {
    redirect("/doctors");
  }

  const { doctors, error } = await getDoctorsBySpecialty(specialty);

  if (error) {
    console.error("Error fetching doctors:", error);
    // continue to render; you can also redirect if you prefer
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title={specialty.split("%20").join(" ")}
        backLink="/doctors"
        backLabel="All Specialties"
      />
      {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-white mb-2">No doctors available</h3>
          <p className="text-muted-foreground">
            There are currently no verified doctors in this specialty. Please check back later or choose another specialty.
          </p>
        </div>
      )}
    </div>
  );
};

export default SpecialtyPage;
