import React, { ReactNode } from "react";
type IMyButtonProps = {
  children: ReactNode;
  onChange?: () => void;
};
const MyButton: React.FC<IMyButtonProps> = ({ children, onChange }) => {
  return <button onChange={onChange}>{children}</button>;
};

export default MyButton;
