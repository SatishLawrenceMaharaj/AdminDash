"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/app/state";
import { Bell, Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* Left */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-300"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500 dark:text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <button onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Sun className="cursor-pointer text-gray-500" size={24} />
            ) : (
              <Moon className="cursor-pointer text-gray-500" size={24} />
            )}
          </button>

          <div className="relative">
            <Bell
              className="cursor-pointer text-gray-500 dark:text-gray-300"
              size={24}
            />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 transform bg-red-600 rounded-full">
              0
            </span>
          </div>

          <hr className="w-0 h-7 border border-solid border-l border-gray-300 dark:border-gray-600 mx-3" />

          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/picture.png"
              alt="Dashboard Profile Picture"
              width={60}
              height={60}
              className="dark:invert dark:grayscale w-9 h-9 rounded-full border dark:border-white"
            />

            <span className="text-gray-500 dark:text-gray-300 font-semibold">
              Satish Maharaj
            </span>
          </div>
        </div>

        <Link href="/">
          <Settings
            className="cursor-pointer text-gray-500 dark:text-gray-300"
            size={24}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
