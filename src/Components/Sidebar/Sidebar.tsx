"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import {
  Archive,
  BarChart2,
  BicepsFlexed,
  LucideIcon,
  Menu,
  Settings,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";

interface SidebarLinksProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLinks = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinksProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/dashboard" && href === "/");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 gap-3 transition-colors ${
          isActive
            ? "bg-blue-200 dark:bg-blue-700 text-white"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700 dark:text-gray-300`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
    <div className={sidebarClassNames}>
      {/* Logo */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Dashboard Logo"
            width={60} // No need for conditional width/height, it's the same size
            height={60}
            className="w-15 h-15 dark:invert dark:grayscale"
          />
          <h1
            className={`${
              isSidebarCollapsed ? "hidden" : "block"
            } font-extrabold text-2xl pl-3`}
          >
            ADB
          </h1>
        </a>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Links */}
      <div className="flex-grow mt-8">
        {/* User Management */}
        <SidebarLinks
          href="/"
          icon={Users}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        {/* Inventory Management */}
        <SidebarLinks
          href="/InventoryDashboard"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        {/* Analytics & Reporting */}
        <SidebarLinks
          href="/analytics"
          icon={BarChart2}
          label="Analytics"
          isCollapsed={isSidebarCollapsed}
        />
        {/* Admin Features */}
        <SidebarLinks
          href="/admin"
          icon={BicepsFlexed}
          label="Admin"
          isCollapsed={isSidebarCollapsed}
        />
        {/* Additional Utilities */}
        <SidebarLinks
          href="/utilities"
          icon={SlidersHorizontal}
          label="Utilities"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLinks
          href="/settings"
          icon={Settings}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* Footer */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10}`}>
        <p className="text-center text-xs text-gray-500">&copy; 2024 ADB</p>
      </div>
    </div>
  );
};

export default Sidebar;
