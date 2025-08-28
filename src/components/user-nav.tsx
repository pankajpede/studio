
"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function UserNav() {
  const pathname = usePathname();
  const isFieldBoy = pathname.startsWith('/field-boy');
  const isOversheer = pathname.startsWith('/oversheer');
  const isAdmin = pathname.startsWith('/dashboard');

  let userName: string;
  let userEmail: string;
  let userFallback: string;
  let profileLink: string;

  if (isFieldBoy) {
    userName = "सुनील पवार";
    userEmail = "sunil.pawar@example.com";
    userFallback = "सुप";
    profileLink = "/field-boy/profile";
  } else if (isOversheer) {
    userName = "संजय गायकवाड";
    userEmail = "sanjay.gaikwad@example.com";
    userFallback = "संग";
    profileLink = "/oversheer/profile";
  } else {
    userName = "महेश देशमुख";
    userEmail = "mahesh.deshmukh@canevision.com";
    userFallback = "मदे";
    profileLink = "/dashboard/settings";
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://placehold.co/100x100.png" alt="@user" />
            <AvatarFallback>{userFallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
             <Link href={profileLink}>
              <User className="mr-2 h-4 w-4" />
              <span>प्रोफाइल</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>सेटिंग्ज</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            <span>लॉग आउट</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
