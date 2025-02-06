import React, { FC } from "react";
import { StyledButton } from "./Button.styled";

type ButtonType = "button" | "submit";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  type?: ButtonType;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  type,
  disabled,
}) => {
  return (
    <StyledButton onClick={onClick} type={type} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
