import useAuth from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import { useEffect } from "react";

interface AuthRouterProps {
  children: React.ReactNode;
}

export default function AuthRoute({ children }: AuthRouterProps) {
  const { auth, authLoading } = useAuth();
  const userId = auth.id;

  useEffect(() => {
    if (!authLoading && !userId) router.replace("/auth");
  }, [userId, authLoading]);

  if (authLoading) return null;
  if (!userId) return null;
  return children;
}
