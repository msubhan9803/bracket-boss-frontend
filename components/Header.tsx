"use client";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaBell } from "react-icons/fa";
import { MobileMenuButton } from "@/components/Sidebar";
import useAuth from "@/hooks/useAuth";
import { ThemeSwitcherButton } from "./theme-switcher-button";

export default function Header() {
  const { signOut } = useAuth();

  return (
    <header className="flex h-14 justify-between md:justify-end items-center gap-4 border-b bg-muted/40 dark:bg-neutral-900 px-4 lg:h-[60px] lg:px-6">
      <MobileMenuButton />

      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <FaBell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>

      <ThemeSwitcherButton />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
