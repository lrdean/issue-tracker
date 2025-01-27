import React, { PropsWithChildren, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return <div className="text-red-600">{children}</div>;
};

export default ErrorMessage;
