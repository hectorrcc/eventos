import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { PropModal } from "../app/MyInterfaces";
import Typography from "@mui/material/Typography";

export default function MyModalAlert({
  handleSubmit,
  handleOpenModal,
  open,
  loadingSubmit,
}: PropModal) {
  return (
    <>
      <Dialog open={open} onClose={handleOpenModal} maxWidth={"xs"}>
        <DialogTitle>Alerta</DialogTitle>
        <DialogContent>
          <Typography color="text.primary">
            Decea eliminar el cliente ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={handleOpenModal} variant={"outlined"}>
            Cancel
          </Button>
          <LoadingButton
            loading={loadingSubmit}
            loadingPosition="start"
            startIcon={<DeleteIcon />}
            variant="outlined"
            onClick={handleSubmit}
            color="error"
          >
            Eliminar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
