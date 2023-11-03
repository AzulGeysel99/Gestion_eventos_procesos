import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
export const NavitemsU: NavItem[] = [
  {
    label: "Dashboard",
    href: "../page_user/prueba1",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Team",
    href: "../page_user/prueba2",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    label: "Projects",
    href: "/",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "Calendar",
    href: "/",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
];