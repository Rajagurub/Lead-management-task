import { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


export interface ColumnDef<T> {
  field: keyof T | string;
  headerName: string;
  width?: string | number;
  renderCell?: (row: T, rowIndex: number) => React.ReactNode;
}

export interface DataGridOptions<T> {
  columns: ColumnDef<T>[];
  pageSize?: number;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

interface DataGridProps<T extends object> {
  data: T[];
  options: DataGridOptions<T>;
}


const CustomPagination = ({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) => {
  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (page >= totalPages - 3)
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  const btnStyle = (active: boolean, disabled = false): React.CSSProperties => ({
    width: 34,
    height: 34,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    background: active ? "#1a6b4a" : "transparent",
    color: disabled ? "#d1d5db" : active ? "#fff" : "#374151",
    fontFamily: "inherit",
    transition: "all 0.15s",
    flexShrink: 0,
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", py: 2 }}>

      <button style={btnStyle(false, page === 1)} onClick={() => page > 1 && onChange(page - 1)}>
        <MdKeyboardArrowLeft size={18} />
      </button>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} style={{ ...btnStyle(false), cursor: "default", color: "#9ca3af" }}>
            ...
          </span>
        ) : (
          <button key={p} style={btnStyle(p === page)} onClick={() => onChange(p as number)}>
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        style={btnStyle(false, page === totalPages)}
        onClick={() => page < totalPages && onChange(page + 1)}
      >
        <MdKeyboardArrowRight size={18} />
      </button>
    </Box>
  );
};


const DataGrid = <T extends object>({ data, options }: DataGridProps<T>) => {
  const { columns, pageSize = 5 } = options;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const paginated = data.slice((page - 1) * pageSize, page * pageSize);

  const getCellValue = (row: T, field: keyof T | string): React.ReactNode => {
    const keys = (field as string).split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return keys.reduce((acc: any, key) => acc?.[key], row) ?? "-";
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#f0f4f0", borderRadius: "8px", overflow: "hidden" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          {/* Head */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e8f0e8" }}>
              {columns.map((col) => (
                <TableCell
                  key={String(col.field)}
                  sx={{
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "#111827",
                    borderBottom: "1px solid #d1d5db",
                    py: 1.5,
                    width: col.width,
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                  <Typography sx={{ fontSize: "14px", color: "#9ca3af" }}>No data found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    backgroundColor: "#fff",
                    "&:hover": { backgroundColor: "#f9fafb" },
                    "& td": { borderBottom: "1px solid #f3f4f6" },
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={String(col.field)} sx={{ fontSize: "13px", color: "#374151", py: 1.5 }}>
                      {col.renderCell
                        ? col.renderCell(row, (page - 1) * pageSize + rowIndex)
                        : getCellValue(row, col.field)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>


      {totalPages > 1 && (
        <CustomPagination page={page} totalPages={totalPages} onChange={setPage} />
      )}
    </Box>
  );
};

export default DataGrid;