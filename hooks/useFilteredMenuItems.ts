import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import useUserPermissions from "@/hooks/useUserPermissions";
import { ModuleNames } from "@/lib/app-types";
import { FaHome, FaUsers, FaChartLine, FaComments, FaCog, FaTrophy, FaMedal, FaEnvelopeOpenText, FaUserFriends, FaPaintBrush, FaBuilding, FaCalendarCheck, FaShareAlt, FaMoneyCheckAlt, FaCogs, FaClipboardList } from "react-icons/fa";
import { FaUsersRectangle } from "react-icons/fa6";
import { MdSportsScore, MdScoreboard, MdSportsTennis } from "react-icons/md";
import { PiCourtBasketballFill } from "react-icons/pi";

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

export default function useFilteredMenuItems() {
    const { permissions } = useUserPermissions();
    const pathname = usePathname();
    const currentModuleName = useMemo(() => pathname.split("/")[1], [pathname]);

    const filteredMenuItems = useMemo(() => {
        return menuItems.filter((item) =>
            permissions?.find((p) => p.moduleName === item.name)
        );
    }, [permissions]);

    useEffect(() => {
        console.log('✅✅✅ permissions: ', permissions)
    }, [filteredMenuItems])

    return { filteredMenuItems, currentModuleName };
}