import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";

import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { MdOutlineDashboard } from "react-icons/md";
import { PiUserBold } from "react-icons/pi";
import { GoProject } from "react-icons/go";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
interface SideBarType {
  open: boolean;
  variant: "permanent" | "temporary";
  onClose?: () => void;
  drawerWidth?: number;
}

const SideBar = ({ open, variant, onClose, drawerWidth = 240 }: SideBarType) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const paths = [
    { path: "/dashboard", label: "Dashboard", Icon: <MdOutlineDashboard size={18} /> },
    { path: "/user", label: "User management", Icon: <PiUserBold size={18} /> },
    { path: "/leads", label: "Leads management", Icon: <GoProject size={18} /> },
  ];
  const handleLogout=async()=>{
       dispatch(logout());
       localStorage.removeItem('token');
       navigate("/auth/login");

  }

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 1,
        px: "15px",
      }}
    >

      <ListItemButton
      sx={{padding:0,justifyContent:'center',display:'flex',mb: "20px",background:'transparent',"&:hover":{
        background:'transparent',
      }}}
        onClick={() => navigate("/dashboard")}
      >
        <img src="/logo.png" alt="logo" height={'auto'}  width={'100%'} />
      </ListItemButton>


      <List disablePadding sx={{ flexGrow: 1 }}>
        {paths.map((item, index) => {
          const isActive = item.path === location.pathname;
          return (
            <ListItem key={index} disablePadding sx={{ mb: "6px" }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  onClose?.(); // close mobile drawer on nav
                }}
                sx={{
                  borderRadius: "10px",
                  backgroundColor: isActive ? theme.palette.primary.main : "transparent",
                  color: isActive ? "#fff" : "inherit",
                  "&:hover": {
                    backgroundColor: isActive
                      ? theme.palette.primary.main
                      : theme.palette.grey[100],
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive ? "#fff" : theme.palette.text.primary,
                  }}
                >
                  {item.Icon}
                </ListItemIcon>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#fff" : theme.palette.text.primary,
                  }}
                >
                  {item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          );
        })}
<ListItem disablePadding>
          <ListItemButton
          onClick={handleLogout}
            sx={{
              borderRadius: "10px",
              "&:hover": { backgroundColor: theme.palette.grey[100] },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <TbLogout size={18} />
            </ListItemIcon>
            <Typography component="span" sx={{ fontSize: "14px" }}>
              Logout
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>

    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
          boxShadow: "0 1px 8px rgb(0 0 0 / 6%), 0 1px 7px rgb(0 0 0 / 1%)",
          backgroundColor: theme.palette.common.white,
          overflowX: "hidden",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default SideBar;