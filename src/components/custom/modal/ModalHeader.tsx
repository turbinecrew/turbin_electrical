import React from "react";

type ModalHeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

const ModalHeader: React.FC<ModalHeaderProps> = ({ className, children }) => {
  return (
    <div className={`flex justify-between items-center border-b p-4 ${className}`}>
      {children}
    </div>
  );
};

export default ModalHeader;