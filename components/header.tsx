
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image' ;
import Link from 'next/link';
import React from 'react' ;
import { checkUser } from '@/lib/checkUser';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, ShieldCheck, Stethoscope, User } from 'lucide-react';
import { Appointment } from '../lib/generated/prisma/index';
import { checkAndAllocateCredits } from '@/actions/credits';
import Pricing from '@/components/pricing';

const Header =async () => {
  const user = await checkUser() ;
  if(user?.role === "PATIENT"){
    await checkAndAllocateCredits(user);
  }
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports
    .[backdrop-filter]:">
        <nav className='container mx-10 px-0 h-15 flex items-center justify-between'>
            <Link href="/">
                <Image
                src = "/logo-single.png"
                alt = "Medimeet Logo"
                width = {200}
                height = {60}
                className="h-10 w-auto object-contain"
                />
            </Link>

            <div className="flex items-center space-x-1">
              <SignedIn>
                {user?.role ==="ADMIN" && (
                  <Link href="/admin">
                    <Button
                      variant = "outline"
                      className="hidden md:inline-flex items-center gap-2"
                    >
                      <ShieldCheck className='h-4 w-4'/>
                      Admin Dashboard
                    </Button>
                    <Button variant="ghost" className='md:hidden w-10 h-10 p-0'>
                      <ShieldCheck className='h-4 w-4 ' />
                    </Button>
                  </Link>
                )}

                {user?.role ==="DOCTOR" && (
                  <Link href="/doctor">
                    <Button
                      variant = "outline"
                      className="hidden md:inline-flex items-center gap-2"
                    >
                      <Stethoscope className='h-4 w-4'/>
                      Doctor Dashboard
                    </Button>
                    <Button variant="ghost" className='md:hidden w-10 h-10 p-0'>
                      <Stethoscope className='h-4 w-4 ' />
                    </Button>
                  </Link>
                )}

                {user?.role ==="PATIENT" && (
                  <Link href="/appointments">
                    <Button
                      variant = "outline"
                      className="hidden md:inline-flex items-center gap-2"
                    >
                      <Calendar className='h-4 w-4'/>
                      My Appointments
                    </Button>
                    <Button variant="ghost" className='md:hidden w-10 h-10 p-0'>
                      <Calendar className='h-4 w-4 ' />
                    </Button>
                  </Link>
                )}
              
                {user?.role ==="UNASSIGNED" && (
                  <Link href="/onboarding">
                    <Button
                      variant = "outline"
                      className="hidden md:inline-flex items-center gap-2"
                    >
                      <User className='h-4 w-4'/>
                      Complete Profile
                    </Button>
                    <Button variant="ghost" className='md:hidden w-10 h-10 p-0'>
                      <User className='h-4 w-4 ' />
                    </Button>
                  </Link>
                )}
              </SignedIn>

                {(!user || user?.role ==="PATIENT") && (
                  <Link href="/pricing">
                    <Badge
                      variant="outline"
                      className="h-9 bg-emerald-900/20 border-emerald-700/30 px-3 py-1 flex items-center gap-2"
                    >
                      <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">
                        {user && user?.role === "PATIENT" ? (
                          <>
                            {user.credits}{" "}
                            <span className="hidden md:inline">Credits</span>
                          </>
                        ) : (
                          <>Pricing</>
                        )}
                      </span>
                    </Badge>
                  </Link>
                )}

              <SignedOut>
              <SignInButton>
              <Button variant={'secondary'} className="bg-[rgba(8,7,7,0.99)] text-ceramic-white rounded-4xl font-medium text-sm sm:text-base px-3 sm:px-3 cursor-pointer">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant={'secondary'} className="text-emerald-400 rounded-4xl font-medium text-sm sm:text-base h-9 sm:h-9 px-2 sm:px-2 cursor-pointer">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </div>
        </nav>
    </header>
  )
}

export default Header  

// bg-[#00e5bf] text-ceramic-white rounded-4xl font-medium text-sm sm:text-base h-6 sm:h-6 px-2 sm:px-2 cursor-pointer