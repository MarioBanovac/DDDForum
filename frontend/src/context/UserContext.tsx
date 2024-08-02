import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  Context,
} from "react";

export interface IUser {
  id: number | null;
  username: string | null;
}

export interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser>>;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export function useContextThrowUndefined<T>(
  context: Context<T | undefined>
): T {
  const value = useContext(context);
  if (value === undefined) {
    const name = context?.displayName ?? "undefined";
    throw new Error(`${name} context consumer was used outside of a context provider.
To fix this, make sure the provider is always higher up the component tree than the consumer.`);
  }
  return value;
}
