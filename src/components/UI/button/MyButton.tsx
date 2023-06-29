import React, { ReactNode } from "react";
type IMyButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};
const MyButton: React.FC<IMyButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default MyButton;
