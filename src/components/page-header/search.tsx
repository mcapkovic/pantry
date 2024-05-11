import { useNavigate, useRouter } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

export function HeaderSearch() {
  const navigate = useNavigate();
  const router = useRouter();
  console.log(router);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch("");
    navigate({
      to: "/ingredients",
      search: {
        search,
      },
    });
  };

  if (router.latestLocation.pathname === "/ingredients") return null;

  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </form>
  );
}
