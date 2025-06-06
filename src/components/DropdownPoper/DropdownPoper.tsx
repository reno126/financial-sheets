import { Button, ButtonProps, Popover } from '@mui/material';
import { PropsWithChildren, useState } from 'react';

export interface DropdownPoperProps extends PropsWithChildren {
  caption: string;
  buttonProps?: ButtonProps;
}

export const DropdownPoper = ({ caption, children, buttonProps }: DropdownPoperProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button onClick={handleClick} variant="outlined" {...buttonProps}>
        {caption}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {children}
      </Popover>
    </>
  );
};

export default DropdownPoper;
