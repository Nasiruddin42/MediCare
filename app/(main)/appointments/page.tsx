import React, { type JSX } from "react";
import { getPatientAppointments } from "@/actions/patient";
import PageHeader from "@/components/page-header";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/onboarding";
import AppointmentCard from "@/components/appointment-card";

/**
 * Type definitions matching the appointment shape you provided.
 * Adjust enums/types if you have concrete TS enums elsewhere.
 */
type AppointmentStatus = string; // replace with your enum type if available

interface DoctorInfo {
  name: string | null;
  id: string;
  imageUrl: string | null;
  specialty: string | null;
  [key: string]: any;
}

interface Appointment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  patientId: string;
  doctorId: string;
  starTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  notes: string | null;
  patientDescription: string | null;
  videoSessionId: string | null;
  videoSessionToken: string | null;
  doctor: DoctorInfo;
  [key: string]: any;
}

type GetPatientAppointmentsResult = {
  appointments?: Appointment[] | undefined | null;
  error?: string | null;
};

export default async function PatientAppointmentsPage(): Promise<JSX.Element> {
  const user = await getCurrentUser();

  if (!user || user.role !== "PATIENT") {
    redirect("/onboarding");
  }

  const res = (await getPatientAppointments()) as GetPatientAppointmentsResult;

  // Normalize value
  const appointments: Appointment[] = Array.isArray(res.appointments)
    ? res.appointments
    : [];

  const error: string | null = res.error ?? null;

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        icon={<Calendar />}
        title="My Appointments"
        backLink="/doctors"
        backLabel="Find Doctors"
      />

      <Card className="border-emerald-900/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-emerald-400" />
            Your Scheduled Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-400">Error: {error}</p>
            </div>
          ) : appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment: Appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  userRole="PATIENT"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium text-white mb-2">
                No appointments scheduled
              </h3>
              <p className="text-muted-foreground">
                You don&apos;t have any appointments scheduled yet. Browse our
                doctors and book your first consultation.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
