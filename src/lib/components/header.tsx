import React from "react";
import { Image } from "@nextui-org/react";
import { getImageURL } from "../helpers/cloud.helper";
import Logo from "./logo";
import GlobalSearch from "./global-search";
import Cart from "./cart-icon";

async function Header() {
  const logo = {
    width: "250px",
    height: "40px",
    backgroundColor: "hsl(0, 100%, 100%)",
    src: "",
    alt: "",
  };

  const logoKey = process.env.SITE_LOGO ?? "";
  const logoUrl = await getImageURL(logoKey);

  return (
    
      <nav
        className="sticky top-0 w-full bg-color-fourth justify-between
       z-50 h-16 shadow-inner flex flex-row items-center px-5"
      >
        <div className="flex flex-row items-center pr-4 pt-1">
          <Logo logoMetaData={logo} logoUrl={logoUrl} />
          <GlobalSearch />
        </div>

        <div className="flex flex-row pr-4 pt-1">
            <Cart/>
        </div>
      </nav>
   
  );
}

export default Header;
