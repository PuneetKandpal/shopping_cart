import React from "react";

import Cart from "./cart/cart-icon";
import logoImage from "../../../public/assests/logo.png";
import { Image } from "@nextui-org/react";
import Link from "next/link";

async function Header() {
  return (
    <nav
      className="sticky top-0 w-full bg-primary justify-between
       z-50 h-[60px] shadow-inner flex flex-row items-center pr-3 lg:pr-5"
    >
      <Link href={"/"} className="flex flex-row items-center gap-5">
        <Image
          src={logoImage.src}
          alt="logo"
          className="object-fill object-center rounded-sm border-color-fourth"
          height={60}
          width={300}
        />
      </Link>

      <div className="flex flex-row pr-4 pt-1">
        <Cart />
      </div>
    </nav>
  );
}

export default Header;
