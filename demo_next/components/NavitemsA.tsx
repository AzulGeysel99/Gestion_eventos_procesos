import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
// define a NavItem prop
export type Navitem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
export const NavitemsA: Navitem[] = [
  {
    label: "Dashboard",
    href: "../page_admin/dashboard",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Tareas",
    href: "../page_admin/listado_tareas",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    label: "Miembros",
    href: "../page_admin/miembrosx",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "Tableros board",
    href: "/",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
];