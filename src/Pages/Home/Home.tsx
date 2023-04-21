import MyBasicCard from "./CarHome";
import Grid from "@mui/material/Grid";


export default function Home() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <MyBasicCard name="Clientes" />
        </Grid>
        <Grid item lg={3}>
          <MyBasicCard name="Eventos"/>
        </Grid>
        <Grid item lg={3}>
          <MyBasicCard name="Facturacion" />
        </Grid>
        <Grid item lg={3}>
          <MyBasicCard name="Gastos" />
        </Grid>
      </Grid>
    </>
  );
}
