import React from "react";

import Logo from "./logo";
import Cart from "./cart/cart-icon";
import logoImage from "../../../public/assests/logo.png";


async function Header() {

  return (
    
      <nav
        className="sticky top-0 w-full bg-primary justify-between
       z-50 h-[60px] shadow-inner flex flex-row items-center px-5"
      >
        <div className="flex flex-row items-center gap-5">
          <Logo logoUrl={logoImage.src} />
        </div>

        <div className="flex flex-row pr-4 pt-1">
            <Cart/>
        </div>
      </nav>
   
  );
}

export default Header;
