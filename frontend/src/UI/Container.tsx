import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export function Container({ children }: IProps) {
  return <div className="container">{children}</div>;
}
