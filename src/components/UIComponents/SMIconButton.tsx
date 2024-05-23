import * as React from "react";
import IconButton from "@mui/material/IconButton";

type SMButtonProps = {
  arialabel?: any;
  SMIcon: any;
  color?: any;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};
export default function SMIconButton(props: SMButtonProps) {
  const { arialabel, SMIcon, color, disabled, className, onClick } = props;
  return (
    <>
      <IconButton
        aria-label={arialabel}
        color={color}
        className={className}
        disabled={disabled}
        onClick={onClick}
      >
        {SMIcon}
      </IconButton>
    </>
  );
}
