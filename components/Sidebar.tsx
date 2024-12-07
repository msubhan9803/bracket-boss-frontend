"use client";
import { useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  FaHome,
  FaBox,
  FaUsers,
  FaChartLine,
  FaComments,
  FaCog,
  FaBuilding,
  FaCalendarCheck,
  FaClipboardList,
  FaCogs,
  FaEnvelopeOpenText,
  FaMedal,
  FaMoneyCheckAlt,
  FaPaintBrush,
  FaShareAlt,
  FaTrophy,
  FaUserFriends,
} from "react-icons/fa";
import { MdSportsScore } from "react-icons/md";
import { PiCourtBasketballFill } from "react-icons/pi";
import { FaUsersRectangle } from "react-icons/fa6";
import { MdSportsTennis } from "react-icons/md";
import { MdScoreboard } from "react-icons/md";
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
import useUserPermissions from "@/hooks/useUserPermissions";
import { ModuleNames } from "@/lib/app-types";

export const dynamic = "force-dynamic";

const menuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: FaHome,
    name: ModuleNames.DASHBOARD,
  },
  {
    href: "/team-management",
    label: "Team Management",
    icon: FaUsers,
    name: ModuleNames.TEAM_MANAGEMENT,
  },
  {
    href: "/court-management",
    label: "Court Management",
    icon: PiCourtBasketballFill,
    name: ModuleNames.COURT_MANAGEMENT,
  },
  {
    href: "/tournament-management",
    label: "Tournament Management",
    icon: MdSportsScore,
    name: ModuleNames.TOURNAMENT_MANAGEMENT,
  },
  {
    href: "/scheduling",
    label: "Scheduling",
    icon: MdScoreboard,
    name: ModuleNames.SCHEDULING,
  },
  {
    href: "/club-management",
    label: "Club Management",
    icon: FaUsersRectangle,
    name: ModuleNames.CLUB_MANAGEMENT,
  },
  {
    href: "/league-management",
    label: "League Management",
    icon: MdSportsTennis,
    name: ModuleNames.LEAGUE_MANAGEMENT,
  },
  {
    href: "/user-management",
    label: "User Management",
    icon: FaUsers,
    name: ModuleNames.USER_MANAGEMENT,
  },
  {
    href: "/reporting-analytics",
    label: "Reporting & Analytics",
    icon: FaChartLine,
    name: ModuleNames.REPORTING_AND_ANALYTICS,
  },
  {
    href: "/chat",
    label: "Chat",
    icon: FaComments,
    badge: 6,
    name: ModuleNames.CHAT,
  },
  {
    href: "/account-settings",
    label: "Account Settings",
    icon: FaCog,
    name: ModuleNames.ACCOUNT_SETTINGS,
  },
  {
    href: "/leagues",
    label: "Leagues",
    icon: FaTrophy,
    name: ModuleNames.LEAGUES,
  },
  {
    href: "/tournaments",
    label: "Tournaments",
    icon: FaMedal,
    name: ModuleNames.TOURNAMENTS,
  },
  {
    href: "/invitations",
    label: "Invitations",
    icon: FaEnvelopeOpenText,
    name: ModuleNames.INVITATIONS,
  },
  {
    href: "/members",
    label: "Members",
    icon: FaUserFriends,
    name: ModuleNames.MEMBERS,
  },
  {
    href: "/customization",
    label: "Customization",
    icon: FaPaintBrush,
    name: ModuleNames.CUSTOMIZATION,
  },
  {
    href: "/my-club",
    label: "My Club",
    icon: FaBuilding,
    name: ModuleNames.MY_CLUB,
  },
  {
    href: "/my-team",
    label: "My Team",
    icon: FaUsers,
    name: ModuleNames.MY_TEAM,
  },
  {
    href: "/my-matches",
    label: "My Matches",
    icon: FaCalendarCheck,
    name: ModuleNames.MY_MATCHES,
  },
  {
    href: "/referral-management",
    label: "Referral Management",
    icon: FaShareAlt,
    name: ModuleNames.REFERRAL_MANAGEMENT,
  },
  {
    href: "/payment-management",
    label: "Payment Management",
    icon: FaMoneyCheckAlt,
    name: ModuleNames.PAYMENT_MANAGEMENT,
  },
  {
    href: "/system-settings",
    label: "System Settings",
    icon: FaCogs,
    name: ModuleNames.SYSTEM_SETTINGS,
  },
  {
    href: "/activity-logs",
    label: "Activity Logs",
    icon: FaClipboardList,
    name: ModuleNames.ACTIVITY_LOGS,
  },
];

export default function Sidebar() {
  const { permissions } = useUserPermissions();
  const pathname = usePathname();

  useEffect(() => {
    console.log("✅✅✅✅ permissions: ", permissions);
  }, [permissions]);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) =>
      permissions?.find((p) => p.moduleName === item.name)
    );
  }, [permissions]);

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <FaBox className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-scroll min-h-96">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === item.href
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
  const { permissions } = useUserPermissions();
  const pathname = usePathname();

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) =>
      permissions?.find((p) => p.moduleName === item.name)
    );
  }, [permissions]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col">
        <nav className="flex-1 grid gap-2 text-lg font-medium overflow-y-auto mt-4 pt-4">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname === item.href
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
