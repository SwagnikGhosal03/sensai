import React from "react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";
const header = async() => {
  await checkUser() 
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex justify-between items-center px-4 h-16">
        <Link href="/">
          <Image
            src="/logo.png"
            width={200}
            height={60}
            alt="sensai logo"
            className="h-12 w-auto py-1 object-contain"
          ></Image>
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block">Industry Insights</span>
              </Button>
            </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="hidden md:inline-flex items-center gap-2"
              >
                <StarsIcon className="h-4 w-4" />
                <span className="hidden md:block">Growth Tools</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem asChild>
                <Link href={"/resume"} className="flex items-center gap-2">
                <FileText className="h-4 w-4"/>
                Build Resume
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
               <Link href={"/interview"} className="flex items-center gap-2">
               <GraduationCap className="h-4 w-4"/>
               Interview Prep
               </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </SignedIn>
          <SignedOut>
        <SignInButton>
          <Button variant="outline">Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton 
        appearance={{
          elements:{
            avatarBox:"h-10 w-10",
          },
        }}
        afterSignOutUrl="/"
        />
      </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default header;
