import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Item } from "./MyContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

type PropBar = {
  name: string;
  deleteElemts: string[];
  handleEventCreate: () => void;
  handleEventDelete: () => void;
};

const style = {
  display: "inline-block",
  marginRight: "10px",
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
          <Grid item md={8} lg={10} xs={12}>
            <Typography variant="h5" component="h5">
              {name}
            </Typography>
          </Grid>

          <Grid style={{ display: "inline-block" }} item md={4} lg={2} xs={12}>
            <Button
              onClick={handleEventCreate}
              style={{ marginRight: "5px" }}
              variant="outlined"
              size="small"
              startIcon={<AddBoxIcon />}
            >
              Nuevo
            </Button>
            <Button
              onClick={handleEventDelete}
              style={{ marginRight: "5px" }}
              variant="outlined"
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              disabled={deleteElemts.length > 0 ? false: true}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Item>
    </Grid>
  );
}
