import { useUser } from "@clerk/clerk-react";

export default function DashboardIndex() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) return null;

  return <h3>Welcome, {user?.username}</h3>;
}
