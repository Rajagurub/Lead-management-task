import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import AppBar from "@mui/material/AppBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { IoChevronBack } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RiMenuLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const location = useLocation();
const {  username, email, role } = useSelector(
  (state: RootState) => state.user
);
const formatPathName = (path: string) => {
  return path.replace("/", "").charAt(0).toUpperCase() + path.replace("/", "").slice(1);
};
  const title = formatPathName(location.pathname);
  console.log(username,"username")
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor:theme.palette.paper.default,
        top: 0,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: "64px !important",
          px: { xs: 1.5, md: 2 },
        }}
      >
        {/* Left */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Hamburger — mobile only */}
          {isMobile && (
            <IconButton
              size="small"
              onClick={onMenuClick}
              sx={{ color: theme.palette.common.black }}
            >
              <RiMenuLine size={20} />
            </IconButton>
          )}

          {/* Back + title — desktop only */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
                {location.pathname !== "/" && location.pathname !== "/dashboard" &&(
                 <IconButton size="small" sx={{ color: theme.palette.common.black, p: 0.5 }}>
                <IoChevronBack size={18} />
              </IconButton>
                )
                }
             
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color:theme.palette.common.black,
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                {title}
              </Typography>
            </Box>
          )}

          {/* Title always visible on mobile */}
          {isMobile && (
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, fontSize: "15px", color: "#111827" }}
            >
           {title}
            </Typography>
          )}
        </Box>

        {/* Right */}
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}>
          <IconButton sx={{ color: theme.palette.common.black,
                backgroundColor:theme.palette.common.white,
                padding:"10px",
                borderRadius:'50%'
                , "&:hover": { backgroundColor:theme.palette.grey[100]} }}>
            <Badge
              variant="dot"
              sx={{
                "& .MuiBadge-dot": {
                  backgroundColor: "#ef4444",
                  border: "2px solid #fff",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                },
              }}
            >
              <IoMdNotificationsOutline size={22} />
            </Badge>
          </IconButton>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <IconButton sx={{ color: theme.palette.common.black,
                backgroundColor:theme.palette.common.white,
                padding:"10px",
                borderRadius:'50%'
                , "&:hover": { backgroundColor:theme.palette.grey[100]} }}>
              <IoSettingsOutline size={20} />
            </IconButton>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 0.5, borderColor: theme.palette.grey[100], display: { xs: "none", sm: "block" } }}
          />

          {/* User Info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              cursor: "pointer",
              px: { xs: 0.5, md: 2 },
              py: 1,

               backgroundColor:theme.palette.common.white,
                borderRadius:'50px',
              "&:hover": { backgroundColor: "#f3f4f6" },
              transition: "background 0.15s",
            }}
          >
            <Avatar
              alt="Holland"
              sx={{
                width: 34,
                height: 34,
                border: "2px solid #e5e7eb",
                fontSize: "13px",
                fontWeight: 600,
                bgcolor: "#374151",
              }}
            >
              {username?.charAt(0).toUpperCase()}
            </Avatar>
            {/* Name/role — hide on mobile */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#111827", lineHeight: 1.2 }}>
                {username}
              </Typography>
              <Typography sx={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500 }}>
                {role}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;