import { useContext } from "react";
import { type ContextType } from "../components/context/AuthProvider";
import { AuthContext } from "../components/context/AuthProvider";

export const useAuth = (): ContextType => {
  const context = useContext<ContextType | null>(AuthContext);

  if (!context) throw new Error("useAuth must be used within AuthProvider");

  return context;
};
