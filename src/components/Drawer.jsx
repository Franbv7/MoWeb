import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/stateContext";

export default function TemporaryDrawer({ items, sx }) {
  const { language } = useStateContext;
  const [open, setOpen] = React.useState(false);
  const { darkMode } = useStateContext();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  let color;

  if (darkMode) {
    color = "aliceblue";
  } else {
    color = "#000";
  }
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {/* <ListItem disablePadding>
          <ListItemButton>
            <Link
              to={direction}
              style={{
                width: "-webkit-fill-available",
                height: "-webkit-fill-available",
              }}
            >
              <ListItemText>{item}</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem> */}
        {items.map(({ item, direction }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <Link
                to={direction}
                style={{
                  width: "-webkit-fill-available",
                  height: "-webkit-fill-available",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemText>{item}</ListItemText>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        {language === "en-US" ? "More options" : "Más opciones"}
        {/* <img src="/burger_line.png" alt="" /> */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 30 30"
          strokeWidth="1.5"
          stroke={`${color}`}
          class="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg> */}
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} sx={sx}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
