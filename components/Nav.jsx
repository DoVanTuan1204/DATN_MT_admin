import React from "react";
import IconHome from "./icons/IconHome";
import Link from "next/link";
import IconDashboard from "./icons/IconDashboard";
import IconProducts from "./icons/IconProducts";
import IconOrders from "./icons/IconOrders";
import IconSettings from "./icons/IconSettings";
import { useRouter } from "next/router";
import IconCategories from "./icons/IconCategories";
import IconLogout from "./icons/IconLogout";

const Nav = () => {
  const inactiveLink = "flex gap-1";
  const activeLink = inactiveLink + " bg-white text-blue-900 rounded-lg p-2";
  const router = useRouter();
  const { pathname } = router;
  return (
    <aside className="text-white p-4 pr-0">
      <Link href={"/"} className="flex flex-row gap-2 mb-3 mr-4">
        <IconDashboard />
        <span>Dashboard</span>
      </Link>
      <nav className="flex flex-col gap-3">
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}>
          <IconHome />
          Home
        </Link>
        <Link
          className={pathname.includes("/products") ? activeLink : inactiveLink}
          href={"/products"}>
          <IconProducts />
          Products
        </Link>
        <Link
          className={pathname.includes("/orders") ? activeLink : inactiveLink}
          href={"/orders"}>
          <IconOrders />
          Orders
        </Link>
        <Link
          className={
            pathname.includes("/categories") ? activeLink : inactiveLink
          }
          href={"/categories"}>
          <IconCategories />
          Categories
        </Link>
        <Link
          className={pathname.includes("/settings") ? activeLink : inactiveLink}
          href={"/settings"}>
          <IconSettings />
          Settings
        </Link>
        <Link href={"/"} className="flex flex-row gap-1">
          <IconLogout />
          Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Nav;
