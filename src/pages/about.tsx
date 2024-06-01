import { useAuth } from "@/auth";

export function About() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      {user && <p>{user.email}</p>}
    </div>
  );
}
