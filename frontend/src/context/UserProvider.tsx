import { useState } from "react";
import { UserContext, IUser } from "./UserContext";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>({ username: null, id: null });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
