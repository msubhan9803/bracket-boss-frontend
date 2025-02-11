"use client";
import Link from "next/link";
import { FaBox } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useFilteredMenuItems from "@/hooks/useFilteredMenuItems";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  disabled?: boolean;
}

interface NavItemsProps {
  items: MenuItem[];
  currentModuleName: string;
  className?: string;
}

function NavItems({ items, currentModuleName, className = "" }: NavItemsProps) {
  return (
    <nav className={cn("grid gap-2", className)}>
      {items.map((item) => {
        const isActive = item.href.includes(currentModuleName);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
              item.disabled
                ? " !cursor-not-allowed !!pointer-events-none"
                : "",
              isActive
                ? "bg-muted text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
            {item.badge && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {item.badge}
              </Badge>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
function UpgradeCard({ className = "" }: { className?: string }) {
  return (
    <div className={cn("mt-auto p-4", className)}>
      <Card>
        <CardHeader className="p-2 pt-0 md:p-4">
          <CardTitle>Upgrade to Pro</CardTitle>
          <CardDescription>
            Unlock all features and get unlimited access to our support team.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
          <Button size="sm" className="w-full">
            Upgrade
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Sidebar() {
  const { filteredMenuItems, currentModuleName } = useFilteredMenuItems();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full min-h-screen max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <FaBox className="h-6 w-6" />
            <span>Acme Inc</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-scroll min-h-96 px-2 py-4 lg:px-4 text-sm font-medium">
          <NavItems
            items={filteredMenuItems}
            currentModuleName={currentModuleName}
          />
        </div>

        <UpgradeCard />
      </div>
    </div>
  );
}

export function MobileMenuButton() {
  const { filteredMenuItems, currentModuleName } = useFilteredMenuItems();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col">
        <NavItems
          items={filteredMenuItems}
          currentModuleName={currentModuleName}
          className="flex-1 text-lg font-medium overflow-y-auto mt-4 pt-4"
        />

        <UpgradeCard className="mt-0" />
      </SheetContent>
    </Sheet>
  );
}
