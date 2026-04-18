import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";

export interface KanbanUser {
  id: string;
  name: string;
  role: string;
  email: string;
  date: string;
  status: "active" | "inactive";
}

interface KanbanBoardProps {
  data: KanbanUser[];
  onView?: (user: KanbanUser) => void;
  onEdit?: (user: KanbanUser) => void;
  onDelete?: (user: KanbanUser) => void;
  onStatusChange?: (id: string, newStatus: "active" | "inactive") => void;
}

const UserCard = ({
  user,
  onDragStart,
  onView,
  onEdit,
  onDelete,
}: {
  user: KanbanUser;
  onDragStart: (id: string) => void;
  onView?: (u: KanbanUser) => void;
  onEdit?: (u: KanbanUser) => void;
  onDelete?: (u: KanbanUser) => void;
}) => (
  <Box
    draggable
    onDragStart={() => onDragStart(user.id)}
    sx={{
      backgroundColor: "#fff",
      border: "0.5px solid #e5e7eb",
         borderRadius: "12px",
      borderBottom: "2.5px solid #2563eb",
      padding: "14px 16px",
      marginBottom: "10px",
      cursor: "grab",
   userSelect: "none",
      "&:active": { cursor: "grabbing", opacity: 0.6 },
      "&:hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
      transition: "box-shadow 0.15s, opacity 0.15s",
    }}
  >
   
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
        {user.name}
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "#9ca3af" }}>{user.date}</Typography>
    </Box>

    <Typography sx={{ fontSize: "13px", color: "#6b7280", mb: 0.3 }}>{user.role}</Typography>
    <Typography sx={{ fontSize: "13px", color: "#6b7280", mb: 0.5 }}>{user.email}</Typography>
    <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#111827", mb: 1.2 }}>
      {user.id}
    </Typography>

    {/* Actions */}
    <Box
      sx={{
        display: "flex",
        gap: 2,
        borderTop: "0.5px solid #f3f4f6",
        pt: 1,
      }}
    >
      <Box
        onClick={() => onView?.(user)}
        sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", color: "#2563eb", "&:hover": { opacity: 0.7 } }}
      >
        <IoEyeOutline size={14} />
        <Typography sx={{ fontSize: "13px", color: "#2563eb" }}>View</Typography>
      </Box>
      <Box
        onClick={() => onEdit?.(user)}
        sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", color: "#2563eb", "&:hover": { opacity: 0.7 } }}
      >
        <MdOutlineEdit size={14} />
        <Typography sx={{ fontSize: "13px", color: "#2563eb" }}>Edit</Typography>
      </Box>
      <Box
        onClick={() => onDelete?.(user)}
        sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", color: "#dc2626", "&:hover": { opacity: 0.7 } }}
      >
        <MdDeleteOutline size={14} />
        <Typography sx={{ fontSize: "13px", color: "#dc2626" }}>Delete</Typography>
      </Box>
    </Box>
  </Box>
);

const Column = ({
  label,
  users,
  total,
  isInactive,
  draggingId,
  onDragStart,
  onDrop,
  onView,
  onEdit,
  onDelete,
}: {
  label: string;
  users: KanbanUser[];
  total: number;
  isInactive?: boolean;
  draggingId: string | null;
  onDragStart: (id: string) => void;
  onDrop: (status: "active" | "inactive") => void;
  onView?: (u: KanbanUser) => void;
  onEdit?: (u: KanbanUser) => void;
  onDelete?: (u: KanbanUser) => void;
}) => {
  const [dragOver, setDragOver] = useState(false);
  const pct = total > 0 ? Math.round((users.length / total) * 100) : 0;
  const status = isInactive ? "inactive" : "active";

  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isInactive ? "#e0f4f4" : "#f3f4f6",
          borderRadius: "12px",
          px: 2,
          py: 1.5,
          mb: 1.5,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "15px", fontWeight: 500, color: "#111827" }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: "13px", color: "#6b7280" }}>{pct}%</Typography>
        </Box>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: isInactive ? "#0b6e5e" : "#374151",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          {users.length}
        </Box>
      </Box>


      <Box
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={() => { setDragOver(false); onDrop(status); }}
        sx={{
          minHeight: 200,
          borderRadius: "12px",
          padding: "4px",
          border: dragOver ? "1.5px dashed #2563eb" : "1.5px solid transparent",
          backgroundColor: dragOver ? "rgba(37,99,235,0.05)" : "transparent",
          transition: "all 0.2s",
        }}
      >
        {users.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            onDragStart={onDragStart}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {users.length === 0 && (
          <Typography
            sx={{
              textAlign: "center",
              color: "#d1d5db",
              fontSize: "13px",
              mt: 4,
            }}
          >
            Drop cards here
          </Typography>
        )}
      </Box>
    </Box>
  );
};


const KanbanBoard = ({ data, onView, onEdit, onDelete, onStatusChange }: KanbanBoardProps) => {
  const [users, setUsers] = useState<KanbanUser[]>(data);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const activeUsers = users.filter((u) => u.status === "active");
  const inactiveUsers = users.filter((u) => u.status === "inactive");

const handleDrop = async (newStatus: "active" | "inactive") => {
  if (!draggingId) return;

  const draggedUser = users.find((u) => u.id === draggingId);
  if (!draggedUser) return;

  try {

    await onStatusChange?.(draggingId, newStatus);

  
    setUsers((prev) =>
      prev.map((u) =>
        u.id === draggingId ? { ...u, status: newStatus } : u
      )
    );

    setDraggingId(null);
  } catch (err) {
    console.error(err);
  }
};

  const handleDelete = (user: KanbanUser) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    onDelete?.(user);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, p: 2, width: "100%" }}>
      <Column
        label="Active"
        users={activeUsers}
        total={users.length}
        draggingId={draggingId}
        onDragStart={setDraggingId}
        onDrop={handleDrop}
        onView={onView}
        onEdit={onEdit}
        onDelete={handleDelete}
      />
      <Column
        label="In active"
        users={inactiveUsers}
        total={users.length}
        isInactive
        draggingId={draggingId}
        onDragStart={setDraggingId}
        onDrop={handleDrop}
        onView={onView}
        onEdit={onEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default KanbanBoard;