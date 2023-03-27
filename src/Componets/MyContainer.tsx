import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MyBreadcrumbs from "./MyBreadcrumbs";
import { Stack } from "@mui/system";


type Prop = {
  menu: React.ReactNode;
  content: React.ReactNode;
};

export const  Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));



export default function MyContainer({ menu,  content }: Prop) {
  return (
    <Box position={"relative"} top={"70px"} sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Item>{menu}</Item>
        </Grid>
        <Grid item xs={10}>
          <Stack spacing={1}>
            <Item>
              <MyBreadcrumbs />
            </Item>
            
            {content}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
