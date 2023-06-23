import React from "react";
type IMyInputProps = {
  type: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  value?: string | number;
  className?: string;
};
const MyInput: React.FC<IMyInputProps> = ({
  type,
  placeholder,
  onChange,
  value,
  className,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={className}
    />
  );
};

export default MyInput;
