"use client";

import { Image } from "@nextui-org/react";
import React, { useEffect } from "react";

function Logo({
  logoUrl,
}: {
  logoUrl: string;
}) {

  const [logo, setLogo] = React.useState("");
  useEffect(() => {
    if (logoUrl) {
      setLogo(logoUrl);
    }
  }, [logoUrl]);

  return (
    <div
      className="flex items-center bg-black h-[50px] w-[250px]"
    >
      {/* <Image
        src={logo}
        alt="logo"
        className="object-fill rounded-none object-center border-color-fourth"
        height={60}
        width={250}
      /> */}
    </div>
  );
}

export default Logo;
