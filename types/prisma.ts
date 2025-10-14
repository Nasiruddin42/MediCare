// types/prisma.ts

export interface User {
  id: string;
  clerkUserId: string;
  email: string;
  name?: string | null;
  imageUrl?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  credits: number;
  specialty?: string | null;
  experience?: number | null;
  credentialUrl?: string | null;
  description?: string | null;
  verificationStatus?: VerificationStatus | null;
  doctorAppointments?: Appointment[];
  patientAppointments?: Appointment[];
  availabilities?: Availability[];
  transactions?: CreditTransaction[];
}

export interface Availability {
  formatted: ReactNode;
  id: string;
  doctorId: string;
  startTime: Date;
  endTime: Date;
  status: SlotStatus;
  doctor?: User;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  starTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  notes?: string | null;
  patientDescription?: string | null;
  videoSessionId?: string | null;
  videoSessionToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
  doctor?: User;
  patient?: User;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  packageId?: string | null;
  createdAt: Date;
  user?: User;
}

// Enums
export enum UserRole {
  UNASSIGNED = "UNASSIGNED",
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
}

export enum VerificationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

export enum SlotStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  BLOCKED = "BLOCKED",
}

export enum AppointmentStatus {
  SCHEDULED = "SCHEDULED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum TransactionType {
  CREDIT_PURCHASE = "CREDIT_PURCHASE",
  APPOINTMENT_DEDUCTION = "APPOINTMENT_DEDUCTION",
  ADMIN_ADJUSTMENT = "ADMIN_ADJUSTMENT",
}
