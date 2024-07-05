import { Link } from "@tanstack/react-router";
import { CircleUser, Menu, Package2 } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { HeaderSearch } from "@/components/page-header/search";
import { supabase } from "@/lib/supabaseClient";
import { Command } from "@/components/command/command";

interface MainLayoutProps {
  pageContent: React.ReactNode;
  links: { to: string; label: string }[];
}

export function MainLayout({ pageContent, links }: MainLayoutProps) {
  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      return;
    }
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to={"/"}
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">company logo</span>
          </Link>

          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{
                className: "text-foreground text-nowrap",
              }}
              inactiveProps={{
                className:
                  "text-muted-foreground text-nowrap transition-colors hover:text-foreground",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <SheetTrigger asChild>
                <Link
                  to={"/"}
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">company logo</span>
                </Link>
              </SheetTrigger>

              {links.map((link) => (
                <SheetTrigger key={link.to} asChild>
                  <Link
                    key={link.to}
                    to={link.to}
                    activeProps={{
                      className: "hover:text-foreground",
                    }}
                    inactiveProps={{
                      className: "text-muted-foreground hover:text-foreground",
                    }}
                  >
                    {link.label}
                  </Link>
                </SheetTrigger>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div id="top-bar-portal-start" />
          <Command />
          {/* <HeaderSearch /> */}
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>About</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main>{pageContent}</main>
    </div>
  );
}
