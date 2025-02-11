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
        disabled: false,
    },
    {
        href: "/team-management",
        label: "Team Management",
        icon: FaUsers,
        name: ModuleNames.TEAM_MANAGEMENT,
        disabled: false,
    },
    {
        href: "/court-management",
        label: "Court Management",
        icon: PiCourtBasketballFill,
        name: ModuleNames.COURT_MANAGEMENT,
        disabled: false,
    },
    {
        href: "/tournament-management",
        label: "Tournament Management",
        icon: MdSportsScore,
        name: ModuleNames.TOURNAMENT_MANAGEMENT,
        disabled: false,
    },
    {
        href: "/scheduling",
        label: "Scheduling",
        icon: MdScoreboard,
        name: ModuleNames.SCHEDULING,
        disabled: false,
    },
    {
        href: "/club-management",
        label: "Club Management",
        icon: FaUsersRectangle,
        name: ModuleNames.CLUB_MANAGEMENT,
        disabled: true,
    },
    {
        href: "/league-management",
        label: "League Management",
        icon: MdSportsTennis,
        name: ModuleNames.LEAGUE_MANAGEMENT,
        disabled: true,
    },
    {
        href: "/user-management",
        label: "User Management",
        icon: FaUsers,
        name: ModuleNames.USER_MANAGEMENT,
        disabled: true,
    },
    {
        href: "/reporting-analytics",
        label: "Reporting & Analytics",
        icon: FaChartLine,
        name: ModuleNames.REPORTING_AND_ANALYTICS,
        disabled: true,
    },
    {
        href: "/chat",
        label: "Chat",
        icon: FaComments,
        badge: 6,
        name: ModuleNames.CHAT,
        disabled: true,
    },
    {
        href: "/account-settings",
        label: "Account Settings",
        icon: FaCog,
        name: ModuleNames.ACCOUNT_SETTINGS,
        disabled: true,
    },
    {
        href: "/leagues",
        label: "Leagues",
        icon: FaTrophy,
        name: ModuleNames.LEAGUES,
        disabled: true,
    },
    {
        href: "/tournaments",
        label: "Tournaments",
        icon: FaMedal,
        name: ModuleNames.TOURNAMENTS,
        disabled: true,
    },
    {
        href: "/invitations",
        label: "Invitations",
        icon: FaEnvelopeOpenText,
        name: ModuleNames.INVITATIONS,
        disabled: true,
    },
    {
        href: "/members",
        label: "Members",
        icon: FaUserFriends,
        name: ModuleNames.MEMBERS,
        disabled: true,
    },
    {
        href: "/customization",
        label: "Customization",
        icon: FaPaintBrush,
        name: ModuleNames.CUSTOMIZATION,
        disabled: true,
    },
    {
        href: "/my-club",
        label: "My Club",
        icon: FaBuilding,
        name: ModuleNames.MY_CLUB,
        disabled: true,
    },
    {
        href: "/my-team",
        label: "My Team",
        icon: FaUsers,
        name: ModuleNames.MY_TEAM,
        disabled: true,
    },
    {
        href: "/my-matches",
        label: "My Matches",
        icon: FaCalendarCheck,
        name: ModuleNames.MY_MATCHES,
        disabled: true,
    },
    {
        href: "/referral-management",
        label: "Referral Management",
        icon: FaShareAlt,
        name: ModuleNames.REFERRAL_MANAGEMENT,
        disabled: true,
    },
    {
        href: "/payment-management",
        label: "Payment Management",
        icon: FaMoneyCheckAlt,
        name: ModuleNames.PAYMENT_MANAGEMENT,
        disabled: true,
    },
    {
        href: "/system-settings",
        label: "System Settings",
        icon: FaCogs,
        name: ModuleNames.SYSTEM_SETTINGS,
        disabled: true,
    },
    {
        href: "/activity-logs",
        label: "Activity Logs",
        icon: FaClipboardList,
        name: ModuleNames.ACTIVITY_LOGS,
        disabled: true,
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