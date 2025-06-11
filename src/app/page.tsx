import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Page() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1" component="h1" className="mb-4">
        This is Home Page.
      </Typography>
      <Typography variant="h6" component="p">
        Please select nav menu.
      </Typography>
    </Stack>
  );
}
