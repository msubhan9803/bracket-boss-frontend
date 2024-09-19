import Link from "next/link";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaBox } from "@react-icons/all-files/fa/FaBox";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { FaChartLine } from "@react-icons/all-files/fa/FaChartLine";
import { FaComments } from "@react-icons/all-files/fa/FaComments";
import { FaCog } from "@react-icons/all-files/fa/FaCog";
import { FaFlagCheckered } from "@react-icons/all-files/fa/FaFlagCheckered";
import { GiTennisCourt } from "@react-icons/all-files/gi/GiTennisCourt";
import { RiUserSettingsFill } from "@react-icons/all-files/ri/RiUserSettingsFill";
import { GiTennisRacket } from "@react-icons/all-files/gi/GiTennisRacket";
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

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: FaHome, isActive: true },
  {
    href: "/league-management",
    label: "League Management",
    icon: GiTennisRacket,
    isActive: false,
  },
  {
    href: "/tournament-management",
    label: "Tournament Management",
    icon: FaFlagCheckered,
    isActive: false,
  },
  {
    href: "/club-management",
    label: "Club Management",
    icon: RiUserSettingsFill,
    isActive: false,
  },
  {
    href: "/team-management",
    label: "Team Management",
    icon: FaUsers,
    isActive: false,
  },
  {
    href: "/court-management",
    label: "Court Management",
    icon: GiTennisCourt,
    isActive: false,
  },
  {
    href: "/user-management",
    label: "User Management",
    icon: FaUsers,
    isActive: false,
  },
  {
    href: "/score-standings",
    label: "Score & Standings",
    icon: GiTennisRacket,
    isActive: false,
  },
  {
    href: "/reports",
    label: "Reporting & Analytics",
    icon: FaChartLine,
    isActive: false,
  },
  {
    href: "/chat",
    label: "Chat",
    icon: FaComments,
    isActive: false,
    badge: 6,
  },
  {
    href: "/settings",
    label: "Account Settings",
    icon: FaCog,
    isActive: false,
  },
];

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <FaBox className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
        </div>

        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  item.isActive
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.badge && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export const MobileMenuButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col">
        <nav className="flex-1 grid gap-2 text-lg font-medium overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                item.isActive
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.badge && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};
