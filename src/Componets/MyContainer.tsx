import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MyBreadcrumbs from "./MyBreadcrumbs";
import { Stack } from "@mui/system";
import "../css/MyStilos.css";

type Prop = {
  menu?: React.ReactNode;
  content: React.ReactNode;
};

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",

  height: "100%",
}));

export default function MyContainer({ menu, content }: Prop) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Stack spacing={1}>{content}</Stack>
      </Grid>
    </Grid>
  );
}
