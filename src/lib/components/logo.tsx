"use client";

import { Image } from "@nextui-org/react";
import React, { useEffect } from "react";

function Logo({
  logoMetaData,
  logoUrl,
}: {
  logoMetaData: any;
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
      className="flex items-center  border-color-fourth px-3 py-1 rounded-full ml-1"
      style={{ backgroundColor: logoMetaData.backgroundColor}}
    >
      <Image
        src={logo}
        alt={logoMetaData.alt}
        className="object-fill rounded-none object-center border-color-fourth"
        style={{ width: logoMetaData.width, height: logoMetaData.height }}
      />
    </div>
  );
}

export default Logo;
