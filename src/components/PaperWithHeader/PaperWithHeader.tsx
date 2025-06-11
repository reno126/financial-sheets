import { Paper, PaperProps, Typography } from '@mui/material';

export interface PaperWithHeaderProps extends PaperProps {
  header: string;
}

export const PaperWithHeader: React.FC<PaperWithHeaderProps> = ({ header, children }) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography sx={{ fontWeight: 700, marginBottom: 1 }}>{header}</Typography>
      {children}
    </Paper>
  );
};
