import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types/auth";
import {
  login as apiLogin,
  register as apiRegister,
  setAuthToken,
} from "../api/auth";
import { LoginCredentials, RegisterCredentials } from "../types/auth";
import { jwtDecode } from "jwt-decode";
import { getUserByUsername } from "@/api/user";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  error: string | null;
}

interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const restoreAuthState = () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken) {
          setToken(storedToken);

          setAuthToken(storedToken);

          try {
            const decoded = jwtDecode<JwtPayload>(storedToken);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
              console.log("Token expired, logging out");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setToken(null);
              setUser(null);
              setAuthToken(null);
              return;
            }
          } catch (error) {
            console.error("Error decoding token:", error);
          }

          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            console.log(
              "User authenticated from storage:",
              parsedUser.username,
            );
          }
        }
      } catch (error) {
        console.error("Error restoring auth state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreAuthState();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await apiLogin(credentials);

      localStorage.setItem("token", token);

      setAuthToken(token);

      const decoded = jwtDecode<JwtPayload>(token);
      const username = decoded.sub;

      const currentUser = await getUserByUsername(username);
      localStorage.setItem("user", JSON.stringify(currentUser));

      setToken(token);
      setUser(currentUser);
      console.log("User logged in:", username);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const userResponse = await apiRegister(credentials);

      const token = await apiLogin({
        username: credentials.username,
        password: credentials.password,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userResponse));

      setAuthToken(token);

      setToken(token);
      setUser(userResponse);
      console.log("User registered and logged in:", userResponse.username);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("User logged out:", user?.username);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);

    setAuthToken(null);

    window.location.href = "/";
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
