import { Paper, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Page() {
  return (
    <Stack spacing={2}>
      <Typography variant="h2" component="h1" className="mb-4">
        This is Home Page.
      </Typography>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" component="h2">
          Important usage limitation.
        </Typography>
        <Typography variant="body1" component="p">
          Polygon provides a free API with a limited number of requests per minute. Therefore, an
          overrun message will appear when using it.{' '}
        </Typography>

        <Typography variant="body1" component="p">
          `Retry last action` button - will re-execute the query ending in an error Therefore you
          need to wait before using this button.
        </Typography>

        <Typography variant="body1" component="p">
          If you have scrolled through the list and retrieved a few more pages, then a limit error
          will cause a SERIES of queries to be re-executed, which may cause another limit error.
        </Typography>
      </Paper>
      <Typography variant="h6" component="p">
        Please use nav menu.
      </Typography>
    </Stack>
  );
}
