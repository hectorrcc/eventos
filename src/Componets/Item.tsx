import Paper from "@mui/material/Paper";
import { styled} from "@mui/material/styles";
import React from "react";

interface PropItem {
  texAling: any
  children: React.ReactNode;
}

export default function MyItem({ children, texAling }: PropItem) {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: texAling,
    color: theme.palette.text.secondary,
  }));

  return <Item>{children}</Item>;
}
