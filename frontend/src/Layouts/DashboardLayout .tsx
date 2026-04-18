import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

const DRAWER_WIDTH = 250;

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100dvh",
        backgroundColor: theme.palette.paper.default,
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <SideBar
        open={isMobile ? mobileOpen : true}
        variant={isMobile ? "temporary" : "permanent"}
        onClose={handleDrawerToggle}
        drawerWidth={DRAWER_WIDTH}
      />

      {/* Main content — offset by drawer width on desktop */}
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: "100dvh",
          width: {
            xs: "100%",
            md: `calc(100% - ${DRAWER_WIDTH}px)`,
          },
          overflow: "hidden",
        }}
      >
        <Header onMenuClick={handleDrawerToggle} />
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;