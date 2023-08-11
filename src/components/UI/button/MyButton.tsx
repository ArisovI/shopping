import React, { ReactNode } from "react";
type IMyButtonProps = {
  children: ReactNode;
  onClick?: (event?:any) => any;
};
const MyButton: React.FC<IMyButtonProps> = ({ children, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default MyButton;
