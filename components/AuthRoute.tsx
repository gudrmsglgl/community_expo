import useAuth from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import { useEffect } from "react";

interface AuthRouterProps {
  children: React.ReactNode;
}

export default function AuthRoute({ children }: AuthRouterProps) {
  const { auth } = useAuth();
  const userId = auth.id;

  useEffect(() => {
    !userId && router.replace("/auth");
  }, [userId]);

  return children;
}
