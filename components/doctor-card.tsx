import React from "react"
import { Card, CardContent } from "./ui/card"
import { Calendar, Star, User } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { Badge } from "./ui/badge"

// 1. Define doctor type
interface Doctor {
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


// 2. Define props type
interface DoctorCardProps {
  doctor: Doctor
}

// 3. Use props type
const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="border-emerald-900/20 hover:border-emerald-700/40 transition-all">
      <CardContent className="pt-4">
        <div className="flex items-start gap-6">
          {/* Doctor Image */}
          <div className="w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
            {doctor.imageUrl ? (
              <img
                  src={doctor.imageUrl ?? ""}
                  alt={doctor.name ?? "Doctor"}
                  className="w-12 h-12 rounded-full object-cover"
               />

            ) : (
              <User className="h-6 w-6 text-emerald-400" />
            )}
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="font-medium text-white text-lg">{doctor.name}</h3>
              <Badge
                variant="outline"
                className="bg-emerald-900/20 border-emerald-900/30 text-emerald-400 self-start"
              >
                <Star className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-1">
              {doctor.specialty} • {doctor.experience} years experience
            </p>

            <div className="mt-4 line-clamp-2 text-sm text-muted-foreground mb-4">
              {doctor.description}
            </div>

            <Button
              asChild
              className="w-full bg-emerald-500 hover:bg-emerald-600 mt-2"
            >
              <Link href={`/doctors/${doctor.specialty}/${doctor.id}`}>
                <Calendar className="h-4 w-4 mr-2" />
                View Profile & Book
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DoctorCard
