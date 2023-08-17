import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const EditDialog = ({ open, setClose, children }) => {
    const handleClose = () => {
        setClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default EditDialog;
