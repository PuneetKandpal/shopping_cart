"use client";

import { Input } from "@nextui-org/react";
import React from "react";

function GlobalSearch() {
  const [search, setSearch] = React.useState("");

  function handleClear() {
    setSearch("");
  }

  return (
      <Input
        className="w-[40rem]"
        size="md"
        isClearable
        onClear={handleClear}
        placeholder="Search for products"
        value={search}
        onValueChange={(value) => setSearch(value)}
      />

  );
}

export default GlobalSearch;
