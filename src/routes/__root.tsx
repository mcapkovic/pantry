import * as React from "react";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { useAuth, type AuthContext } from "@/auth";
import { ModeToggle } from "@/components/mode-toggle";

interface MyRouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const auth = useAuth();

  return (
    <>
      {auth.isAuthenticated && (
        <>
          <div className="p-2 flex gap-2 text-lg">
            <Link
              to={"/"}
              activeProps={{
                className: "font-bold",
              }}
            >
              Home
            </Link>
            {/* <Link
              to={"/dashboard"}
              activeProps={{
                className: "font-bold",
              }}
            >
              Dashboard
            </Link> */}

            <Link
              to={"/ingredients"}
              activeProps={{
                className: "font-bold",
              }}
            >
              Ingredients
            </Link>

            <Link
              to={"/about"}
              activeProps={{
                className: "font-bold",
              }}
            >
              About
            </Link>
            <ModeToggle />
          </div>
          <hr />
        </>
      )}

      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  );
}
