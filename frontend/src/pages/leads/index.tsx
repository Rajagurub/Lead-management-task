import { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import DataGrid from "../../Components/DataGrid";
import type { DataGridOptions } from "../../Components/DataGrid";
import { toast } from "react-toastify";
import { PiUserCheck } from "react-icons/pi";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";

import { leadApiServices } from "../../_api_/leads";
import LeadFormDialog from "./LeadFormDialog";
import LeadDelete from "./LeadDelete";

const LeadsList = () => {
  const token =
    useSelector((s: RootState) => s.user.token) ||
    localStorage.getItem("token");

  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<{ open: boolean; data: any }>({
    open: false,
    data: {},
  });
  const [isDelete, setIsDelete] = useState<{ open: boolean; data: any }>({
    open: false,
    data: {},
  });


  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await leadApiServices.getAllLeads(token as string);
      if (res.status < 400) {
        setRows(res.data.leads || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchLeads();
  }, [token]);


  const handleEdit = (row: any) => {
    setIsEdit({ open: true, data: row });
  };


  const handleDeleteOpen = (row: any) => {
    setIsDelete({ open: true, data: row });
  };

 
  const handleDelete = useCallback(async () => {
    try {
      await leadApiServices.deleteLead(
        token as string,
        isDelete.data._id
      );
      toast.success("Deleted successfully");
      setIsDelete({ open: false, data: {} });
      fetchLeads();
    } catch (e) {
      toast.error("Delete failed");
    }
  }, [isDelete.data, token]);


  const options: DataGridOptions<any> = {
     pageSize: 5,
    columns: [
      {
        field: "_id",
        headerName: "S No",
        width: 60,
        renderCell: (_, i) => <span>{i + 1}</span>,
      },
      { field: "title", headerName: "Title" },
      { field: "description", headerName: "Description" },
      {
        field: "status",
        headerName: "Status",
        renderCell: (row) => (
          <Box sx={{ px: 1, borderRadius: "8px", bgcolor: "#f3f4f6" }}>
            {row.status}
          </Box>
        ),
      },
      {
        field: "action",
        headerName: "Action",
        renderCell: (row) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box
              onClick={() => handleEdit(row)}
              sx={{ cursor: "pointer", color: "#3b82f6",display:'flex',alignItems:'center',fontSize:'12px' }}
            >
              <MdOutlineEdit style={{marginRight:'5px'}} size={16} />
              EDit
            </Box>
            <Box
              onClick={() => handleDeleteOpen(row)}
              sx={{ cursor: "pointer", color: "#ef4444",display:'flex',alignItems:'center' ,fontSize:'12px'}}
            >
              <MdDeleteOutline style={{marginRight:'5px'}} size={16} />
              Delete
            </Box>
          </Box>
        ),
      },
    ],
  };

  return (
    <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: "8px" }}>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
          Lead List
        </Typography>

        <Button
          onClick={() => setIsCreateOpen(true)}
          variant="contained"
          sx={{ fontSize: "12px", borderRadius: "8px" }}
        >
          <IoDocumentsOutline  style={{ marginRight: 8 }} />
          Add Lead
        </Button>
      </Box>

    
      <DataGrid data={rows} options={options}  />

 
      <LeadFormDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={leadApiServices.createLead}
        onRefresh={fetchLeads}
        initialValues={ {title: "",
    description: "",
    status: ""}}
      />

      <LeadFormDialog
        open={isEdit.open}
        initialValues={isEdit.data}
        onClose={() => setIsEdit({ open: false, data: {} })}
        onSubmit={leadApiServices.updateLead}
        onRefresh={fetchLeads}
      />

  
      <LeadDelete
        open={isDelete.open}
        onClose={() => setIsDelete({ open: false, data: {} })}
        onDeleteFunction={handleDelete}
      />
    </Box>
  );
};

export default LeadsList;