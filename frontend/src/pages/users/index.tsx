import { useEffect, useState,useCallback } from "react";
///import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { userApiServices } from "../../_api_/user";
import { useTheme } from '@mui/material';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { PiUserCheck } from "react-icons/pi";
import FilterBar from "./FilterItems";
import DataGrid from "../../Components/DataGrid";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import type { DataGridOptions } from "../../Components/DataGrid";
import UserFormDialog from "./UserFormDialog";
import UserDelete from "./UserDelete";
import { toast } from "react-toastify";
import  KanbanBoard from "./KanbanView";
const UsersList = () => {
  const token = useSelector((state: RootState) => state.user.token) ||localStorage.getItem('token') ;
  const theme= useTheme();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreateOpen,setIsCreateOpen]=useState(false)
  const [refesh,setRefsh]=useState(false)
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [view,setView]=useState("list");
  const [isedit,setIsEdit]=useState({
    open:false,
    data:{},
    refreash:false
  })
  const [isDelelte,setisDelelte]=useState({
    open:false,
    data:{},
    refreash:false
  })

 


  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await userApiServices.getAllusers(`${token}`);
      if(res.status<400){ 
    setRows(res.data.users);
      setRowCount(res.data.length||0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (row: User) => console.log("View", row);
  const handleEdit = (row: User) => {
    setIsEdit((preObj)=>({...preObj,data:row,open:true,refreash:false}))
  };
  const handleDelete = (row: User) =>{
    setisDelelte((preObj)=>({...preObj,data:row,open:true,refreash:false}))
  };
  const StatusCell = ({ row }: { row: User }) => {


  return (
    <Box sx={{backgroundColor:theme.palette.grey[200],px:1,borderRadius:'10px'}}>
        {row.status}
    </Box>
  );
};

  const ActionCell = ({
  row,
  onView,
  onEdit,
  onDelete,
}: {
  row: User;
  onView: (r: User) => void;
  onEdit: (r: User) => void;
  onDelete: (r: User) => void;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
    <Box
      onClick={() => onView(row)}
      sx={{ display: "flex", alignItems: "center", gap: 0.4, cursor: "pointer", color: "#3b82f6", fontSize: "13px", "&:hover": { opacity: 0.75 } }}
    >
      <IoEyeOutline size={14} />
      <Typography sx={{ fontSize: "13px", color: "#3b82f6" }}>View</Typography>
    </Box>
    <Box
      onClick={() => onEdit(row)}
      sx={{ display: "flex", alignItems: "center", gap: 0.4, cursor: "pointer", color: "#3b82f6", fontSize: "13px", ml: 1, "&:hover": { opacity: 0.75 } }}
    >
      <MdOutlineEdit size={14} />
      <Typography sx={{ fontSize: "13px", color: "#3b82f6" }}>Edit</Typography>
    </Box>
    <Box
      onClick={() => onDelete(row)}
      sx={{ display: "flex", alignItems: "center", gap: 0.4, cursor: "pointer", color: "#ef4444", fontSize: "13px", ml: 1, "&:hover": { opacity: 0.75 } }}
    >
      <MdDeleteOutline size={14} />
      <Typography sx={{ fontSize: "13px", color: "#ef4444" }}>Delete</Typography>
    </Box>
  </Box>
);
 const options: DataGridOptions<User> = {
    pageSize: 5,
    columns: [
      { field: "_id", headerName: "S No", width: 60,

         renderCell: (row,index) => (
          <Typography sx={{ fontSize: "13px", }}>{index+1}</Typography>
        ),
       },
      { field: "empId", headerName: "Employee ID" },
      { field: "userName", headerName: "Employee Name" },
      { field: "mobileNo", headerName: "Mobile No" },
      { field: "email", headerName: "Email ID" },
      {
        field: "role",
        headerName: "Role",
        renderCell: (row) => (
          <Typography sx={{ fontSize: "13px", color: "#3b82f6" }}>{row.role}</Typography>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        renderCell: (row) => <StatusCell row={row} />,
      },
      {
        field: "action",
        headerName: "Action",
        renderCell: (row) => (
          <ActionCell row={row} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        ),
      },
    ],
  };
  interface User {
  sno: string;
  employeeId: string;
  employeeName: string;
  mobileNo: string;
  emailId: string;
  role: string;
  status: "Active" | "Inactive";
}
const onChangeView=(viewName:string)=>{
    console.log(viewName,"viewChange")
    setView(viewName)

}


const handleStatusChange = async (id, newStatus) => {
  const prev = [...rows];

  // update UI first
  setRows((r) =>
    r.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
  );

  try {
    await userApiServices.editAuser(token, { status: newStatus },id);
      toast.success("Update successfully");
  } catch (e) {
    setRows(prev); // rollback
    toast.error("Update failed");
  }
};

  useEffect(() => {
    if (token||isedit.refreash||isDelelte.refreash) {
      fetchUsers();
    }
  }, [ token,refesh,isedit.refreash,isDelelte.refreash]);
const Ondelete=useCallback(async()=>{
   try{
    if(isDelelte.data._id){
        const result = await userApiServices.DeleteAuser(token,isDelelte.data._id);
        setisDelelte({open:false,data:{},refreash:true});
        toast.success("Deleted success fully")
    }
       
   }
   catch(e){
  toast.error(e?.error?.message||"Deleted success fully")
   }
},[isDelelte.data,token])
  return (
    <Box sx={{ height: 'auto', width: "100%",backgroundColor:theme.palette.common.white,p:1.4,borderRadius:'8px' }}>
        <Box sx={{display:'flex',justifyContent:'space-between',mb:2,alignItems:'center'}}>
            <Typography
            sx={{fontSize:'16px!important',fontWeight:'500'}}
            variant="h6">{"User List"}</Typography>
            <Button 
            onClick={()=>{setIsCreateOpen(true);setRefsh(false)}}
            sx={{fontSize:'12px!important',fontWeight:'400',borderRadius:'8px',boxShadow:'none'}}
            variant="contained">
                <PiUserCheck style={{marginRight:'10px',width:"20px",height:"20px"}}/>

                {"Add Employee"}</Button>
        </Box>
            <Box sx={{display:'flex',justifyContent:'space-between',mb:2,alignItems:'center'}}>
         <FilterBar  view={view} onChangeView={onChangeView}/>
            </Box>
{view!=='list'?
<KanbanBoard
 data={rows.map((u) => ({
    id: u._id,           
    name: u.userName, 
    role: u.role,
    email: u.email,
    date: u.createdAt
      ? new Date(u.createdAt).toLocaleDateString("en-GB").replace(/\//g, ".")
      : "",
    status: u.status as "active" | "inactive",
  }))}
  onView={(user) => console.log("View", user)}
  onEdit={(user) => handleEdit({ ...user, _id: user.id, userName: user.name })}
  onDelete={(user) => handleDelete({ ...user, _id: user.id })}
  onStatusChange={handleStatusChange}
/>
:
  <DataGrid data={rows} options={options} />}
    
      <UserFormDialog open={isCreateOpen} onFrefh={()=>setRefsh(true)} onSubmit={userApiServices.createAuser} onClose={()=>setIsCreateOpen(false)}/>
         <UserFormDialog open={isedit.open}
         initialValues={isedit.data}
         onFrefh={()=>setIsEdit({refreash:true,data:{},open:false})} onSubmit={userApiServices.editAuser} onClose={  ()=>setIsEdit((preObj)=>({...preObj,data:{},open:false}))
}/>
<UserDelete open={isDelelte.open} onClose={()=>setisDelelte((preObj)=>({
    ...preObj,
    open:false,
    data:{},
}))} onDeleteFunction={Ondelete}/>
    </Box>
  )
}

export default UsersList;