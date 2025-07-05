import { useEffect, useState } from "react";

interface AuthUser {
  name: string;
  email: string;
  picture: string;
}

interface AuthStatus {
  authenticated: boolean;
  user?: AuthUser;
  isOwner?: boolean;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthStatus>({ authenticated: false });

  useEffect(() => {
    
    fetch(`${import.meta.env.VITE_API_BASE}/api/auth/status`, {
      credentials: "include", // Important!
    })
      .then((res) => res.json())
      .then(setAuth)
      .catch(() => setAuth({ authenticated: false }));
  }, []);

  return auth;
};
