import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Item } from "./MyContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

type PropBar = {
  name: string;
  deleteElemts: string[];
  handleEventCreate: () => void;
  handleEventDelete: () => void;
};

export default function MyBar({
  name,
  deleteElemts,
  handleEventCreate,
  handleEventDelete,
}: PropBar) {
  return (
    <Grid>
      <Item>
        <Grid container>
          <Grid item lg={10} md={10} xs={12}>
            <Typography variant="h5" component="h5">
              {name}
            </Typography>
          </Grid>

          <Grid item lg={2} md={2} xs={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                aria-label="delete"
                size="medium"
                color="primary"
                onClick={handleEventCreate}
              >
                <AddBoxIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="medium"
                color="error"
                onClick={handleEventDelete}
                disabled={deleteElemts.length > 0 ? false : true}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Item>
    </Grid>
  );
}
