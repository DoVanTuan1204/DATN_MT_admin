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

const Nav = ({ show }) => {
  const inactiveLink = " flex gap-1";
  const activeLink = inactiveLink + " bg-white text-blue-900 rounded-lg p-2";
  const router = useRouter();
  const { pathname } = router;
  return (
    <aside
      className={
        (show ? " left-0" : " -left-full") +
        " top-0 text-white p-4 fixed w-full bg-blue-900 h-screen md:static md:w-auto transition-all"
      }>
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
          className={pathname.includes("/supplier") ? activeLink : inactiveLink}
          href={"/supplier"}>
          <IconCategories />
          Supplier
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
