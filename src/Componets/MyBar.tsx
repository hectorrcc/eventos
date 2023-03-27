import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Item } from "./MyContainer";

type PropBar = {
    name:string
    handleEvent: ()=>void
};

export default function MyBar({name, handleEvent}:PropBar) {
  return (
    <Grid>
      <Item>
        <Grid container>
          <Grid xs={6}>
            <Typography variant="h5" component="h5">
              {name}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Button
              style={{ float: "right" }}
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleEvent}
            >
              Nuevo
            </Button>
          </Grid>
        </Grid>
      </Item>
    </Grid>
  );
}
