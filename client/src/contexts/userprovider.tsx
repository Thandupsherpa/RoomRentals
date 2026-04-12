import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Gender = "MALE" | "FEMALE" | "OTHERS";
type Designation =
  | "STUDENT"
  | "EMPLOYED"
  | "UNEMPLOYED"
  | "MARRIED"
  | "UNMARRIED";
type UserRole = "TENENT" | "OWNER";

export interface User {
  fullName: string;
  profile: string | null;
  email: string;
  role: UserRole;
  gender: Gender;
  designation: Designation;
  address: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return;

    const parsedUser: User = JSON.parse(rawUser);
    setUser(parsedUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return ctx;
};
