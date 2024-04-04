import {  createFileRoute, redirect } from "@tanstack/react-router";
import { CategoryDashboard } from "@/components/category-dashboard";

export const Route = createFileRoute('/')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <CategoryDashboard />
    </div>
  );
}
