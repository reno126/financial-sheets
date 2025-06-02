import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export interface ErrorModalProps {
  error: Error;
  onRetry: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ error, onRetry }) => {
  return (
    <Dialog open>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <Alert severity="error">{error?.message}</Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRetry}>Retry last action</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
