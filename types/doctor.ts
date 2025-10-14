// types/doctor.ts
import React from "react";

export interface Doctor {
  description: React.ReactNode;
  credentialUrl: string | null;
  createdAt: Date;
  id: string;
  name: string | null;
  specialty: string | null;
  experience: number | null;
  email?: string;
  imageUrl?: string | null;
  verificationStatus?: string | null;
}
