import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

interface Action {
  action: string;
  handler: () => void;
}

export function useURLActions({
  actions,
  urlAction,
}: {
  actions: Action[];
  urlAction?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const action = actions.find(
      (currentAction) => currentAction.action === urlAction,
    );
    if (action != null) {
      action.handler();
      router.navigate({ search: { actionName: undefined }, replace: true });
    }
  }, [urlAction, actions, router]);
}
