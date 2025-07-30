
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image' ;
import Link from 'next/link';
import React from 'react' ;

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports
    .[backdrop-filter]:">
        <nav className='container mx-2 px-0 h-16 flex items-center justify-between'>
            <Link href="/">
                <Image
                src = "/logo-single.png"
                alt = "Medimeet Logo"
                width = {200}
                height = {60}
                className="h-10 w-auto object-contain"
                />
            </Link>

            <div>
              <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#adaab8] text-ceramic-white rounded-4xl font-medium text-sm sm:text-base h-10 sm:h-10 px-4 sm:px-4 cursor-pointer">
                  Sign Up
                </button>
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