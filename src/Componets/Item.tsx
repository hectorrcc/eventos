import Paper from "@mui/material/Paper";
import { styled} from "@mui/material/styles";
import React from "react";

interface PropItem {
  texAling?: any
  children: React.ReactNode;
  backgroundColor?: string;
  heigth?: string
}

export default function MyItem({ children, texAling, backgroundColor, heigth  }: PropItem) {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: backgroundColor ? backgroundColor : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: texAling,
    color: theme.palette.text.secondary,
    height: heigth
  }));

  return <Item>{children}</Item>;
}
