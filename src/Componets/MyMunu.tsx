import * as React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import Link from "@mui/material/Link";

export default function MyMenu() {
  return (
    <MenuList>
      <Link href="/" underline="none" color={"#757575"}>
        <MenuItem>
          <ListItemIcon>
            <DashboardSharpIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Inicio</Typography>
        </MenuItem>
      </Link>
      <Link href="/clientes" underline="none" color={"#757575"}>
        <MenuItem>
          <ListItemIcon>
            <PersonSharpIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Clientes</Typography>
        </MenuItem>
      </Link>
      <Link href="/calendario" underline="none" color={"#757575"}>
        <MenuItem>
          <ListItemIcon>
            <CalendarMonthSharpIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Eventos
          </Typography>
        </MenuItem>
      </Link>
    </MenuList>
  );
}
