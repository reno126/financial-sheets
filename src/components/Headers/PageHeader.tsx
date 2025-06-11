import { Typography } from '@mui/material';

export interface PageHeaderProps {
  header: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ header }) => {
  return (
    <Typography variant="h4" component="h1">
      {header}
    </Typography>
  );
};
