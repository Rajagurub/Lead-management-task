import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import type { SelectChangeEvent } from '@mui/material/Select';
const sharedSelectSx = {
  fontSize: "13px",
  borderRadius: "8px",
  height: "38px",
  color: "#374151",
  backgroundColor: "#fff",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d1d5db",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#9ca3af",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#9ca3af",
    borderWidth: "1px",
  },
  "& .MuiSelect-select": {
    paddingRight: "32px !important",
    paddingLeft: "12px",
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    color: "#374151",
  },
  "& .MuiSelect-icon": {
    color: "#6b7280",
    right: "8px",
  },
};


const FilterBar = ({onChangeView,view='list' }:any) => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
 // const [view, setView] = useState("list");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1.5,
        flexWrap: "wrap",
        gap: 1.5,
        width:'100%',
        backgroundColor: "#fff",
        borderBottom: "1px solid #f3f4f6",
      }}
    >

      <FormControl size="small" sx={{ width: { xs: "100%", sm: "260px" } }}>
        <OutlinedInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <HiOutlineSearch size={16} color="#9ca3af" />
            </InputAdornment>
          }
          sx={{
            fontSize: "13px",
            height: "38px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            color: "#374151",
            "& input": {
              fontSize: "13px",
              padding: "0 8px",
              color: "#374151",
              "&::placeholder": { color: "#9ca3af", opacity: 1 },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#d1d5db",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#9ca3af",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#9ca3af",
              borderWidth: "1px",
            },
          }}
        />
      </FormControl>

  
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
        {/* By Role */}
        <Select
          value={role}
          onChange={(e: SelectChangeEvent) => setRole(e.target.value)}
          displayEmpty
          size="small"
          sx={{ ...sharedSelectSx, minWidth: "120px" }}
          renderValue={(val) => (val ? val : "By role")}
        >
          <MenuItem value="" sx={{ fontSize: "13px" }}>All roles</MenuItem>
          <MenuItem value="Admin" sx={{ fontSize: "13px" }}>Admin</MenuItem>
          <MenuItem value="Manager" sx={{ fontSize: "13px" }}>Manager</MenuItem>
          <MenuItem value="Viewer" sx={{ fontSize: "13px" }}>Viewer</MenuItem>
        </Select>


        <Select
          value={status}
          onChange={(e: SelectChangeEvent) => setStatus(e.target.value)}
          displayEmpty
          size="small"
          sx={{ ...sharedSelectSx, minWidth: "130px" }}
          renderValue={(val) => (val ? val : "By Status")}
        >
          <MenuItem value="" sx={{ fontSize: "13px" }}>All statuses</MenuItem>
          <MenuItem value="Active" sx={{ fontSize: "13px" }}>Active</MenuItem>
          <MenuItem value="Inactive" sx={{ fontSize: "13px" }}>Inactive</MenuItem>
          <MenuItem value="Pending" sx={{ fontSize: "13px" }}>Pending</MenuItem>
        </Select>


      <Select
  value={view}
  onChange={(e: SelectChangeEvent) =>
    onChangeView(e.target.value as string)
  }
  displayEmpty
  size="small"
  sx={{ ...sharedSelectSx, minWidth: "120px" }}
  renderValue={(val) =>
    val === "list" ? "List View" : "Kanban View"
  }
>
  <MenuItem sx={{ fontSize: "13px" }} value="list">List View</MenuItem>
  <MenuItem sx={{ fontSize: "13px" }} value="grid">Kanban View</MenuItem>
</Select>
      </Box>
    </Box>
  );
};

export default FilterBar;