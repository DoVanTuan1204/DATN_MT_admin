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
import IconList from "./icons/IconList";

const Nav = ({ show }) => {
  const inactiveLink = " flex gap-1";
  const activeLink = inactiveLink + " bg-white text-blue-900 rounded-lg p-2";
  const router = useRouter();
  const { pathname } = router;
  const logout = () => {
    localStorage.removeItem("JWT");
    router.push("/login");
  };
  return (
    <aside
      className={
        (show ? " left-0" : " -left-full") +
        " top-0 text-white p-6 fixed w-full bg-blue-900 h-screen md:static md:w-auto transition-all"
      }>
      <Link href={"/"} className="flex flex-row gap-2 mb-3 mr-7">
        <IconDashboard />
        <span>Dashboard</span>
      </Link>
      <nav className="flex flex-col gap-3">
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}>
          <IconHome />
          Trang chủ
        </Link>
        <Link
          className={pathname.includes("/products") ? activeLink : inactiveLink}
          href={"/products"}>
          <IconProducts />
          Sản phẩm
        </Link>
        <Link
          className={pathname.includes("/orders") ? activeLink : inactiveLink}
          href={"/orders"}>
          <IconOrders />
          Đơn hàng
        </Link>
        <Link
          className={pathname.includes("/supplier") ? activeLink : inactiveLink}
          href={"/supplier"}>
          <IconCategories />
          Nhà cung cấp
        </Link>
        <Link
          className={pathname.includes("/category") ? activeLink : inactiveLink}
          href={"/category"}>
          <IconList />
          Loại hàng hoá
        </Link>
        <Link
          className={pathname.includes("/settings") ? activeLink : inactiveLink}
          href={"/settings"}>
          <IconSettings />
          Cài đặt
        </Link>
        <span onClick={logout} className="flex flex-row gap-1 cursor-pointer">
          <IconLogout />
          Đăng xuất
        </span>
      </nav>
    </aside>
  );
};

export default Nav;
