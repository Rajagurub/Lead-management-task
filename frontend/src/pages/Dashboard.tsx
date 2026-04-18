import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useState, useEffect } from "react";
import { dashBoardApiServices } from "../_api_/dashBard";
import { toast } from "react-toastify";
import { FaShop } from "react-icons/fa6";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  PieChart,
  Pie,
  Cell as PieCell,
  Tooltip as PieTooltip,
} from "recharts";


import { LuTextSearch } from "react-icons/lu";
import { GoProjectRoadmap } from "react-icons/go";
import { TbChartBar } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { LuFilter } from "react-icons/lu";
import { BsCalendar3 } from "react-icons/bs";


interface LeadsData {
  total: number;
  assigned: number;
  progress: number;
  review: number;
  final: number;
}
interface SaleItem {
  _id: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  createdAt: string;
}
interface TicketData {
  total: number;
  solved: number;
  unsolved: number;
  progress: number;
}
interface DashboardData {
  leeds?: LeadsData;
  salse?: SaleItem[];
  ticket?: TicketData;
}


const overviewCards = [
  { label: "Lorem ipsum", value: 20, gradient: "linear-gradient(135deg,#ff8a80,#ef5350)", textureColor: "rgba(255,255,255,0.12)" },
  { label: "Lorem ipsum", value: 20, gradient: "linear-gradient(135deg,#ffd54f,#ffb300)", textureColor: "rgba(255,255,255,0.12)" },
  { label: "Lorem ipsum", value: 20, gradient: "linear-gradient(135deg,#ce93d8,#ab47bc)", textureColor: "rgba(255,255,255,0.12)" },
  { label: "Lorem ipsum", value: 20, gradient: "linear-gradient(135deg,#80cbc4,#26a69a)", textureColor: "rgba(255,255,255,0.12)" },
  { label: "Lorem ipsum", value: 20, gradient: "linear-gradient(135deg,#a5d6a7,#66bb6a)", textureColor: "rgba(255,255,255,0.12)" },
  { label: "Lorem ipsum", value: 20, gradient: "linear-gradient(135deg,#80deea,#26c6da)", textureColor: "rgba(255,255,255,0.12)" },
];



const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {icon}
      <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{title}</Typography>
    </Box>
  
  </Box>
);

const OverviewCard = ({ label, value, gradient }: { label: string; value: number; gradient: string }) => {
    const theme=useTheme();
    return(
<Box
    sx={{
      background: gradient,
      borderRadius: "14px",
      p: 2,
      position: "relative",
      overflow: "hidden",
      minHeight: 110,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    }}
  >
  
    <Box
      sx={{
        position: "absolute",
        top: 8,
        left: 10,
        width: 28,
        height: 28,
        borderRadius: "50px",
        backgroundColor:theme.palette.common.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TbChartBar size={15} color={theme.palette.common.black} />
    </Box>

    <Box
      sx={{
        position: "absolute",
        right: -10,
        top: 10,
        fontSize: "80px",
        lineHeight: 1,
      
        color: "#fff",
        fontWeight: 900,
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <img src="/vector_24.png" alt={"text"} width={120} height={'100%'}/>
    </Box>
    <Typography sx={{ fontSize: "26px", fontWeight: 600, color:theme?.palette?.common?.black,marginTop:'70px', lineHeight: 1 }}>
      {value}
    </Typography>
    <Typography sx={{ fontSize: "12px", color:theme?.palette?.common?.black, mt: 1 }}>
      {label}
    </Typography>
  </Box>
);
}
  


const LEAD_COLORS = ["#fbbf24", "#6366f1", "#22c55e", "#ef4444"];

const LeadsDonut = ({ data }: { data?: LeadsData }) => {
  const total = data?.total || 0;
  const segments = [
    { name: "Assigned", value: data?.assigned || 0, color: "#F6C522CC" },
    { name: "In progress", value: data?.progress || 0, color: "#331C48CC" },
    { name: "Review", value: data?.review || 0, color: "#34814BCC" },
    { name: "Final", value: data?.final || 0, color: "#E3332DCC" },
  ];

  return (
    <Box>
      <Typography sx={{ fontSize: "26px", fontWeight: 700, color: "#111827" }}>{total}</Typography>
      <Typography sx={{ fontSize: "12px", color: "#9ca3af", mb: 2 }}>Total Projects</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Donut */}
        <Box sx={{ width: 180, height: 180, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments}
                cx="50%"
                cy="50%"
             innerRadius={40}
outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                  label={({ value }) => value} 
              >
                {segments.map((s, i) => (
                  <PieCell key={i} fill={s.color} />
                ))}
              </Pie>
              <PieTooltip formatter={(val, name) => [`${val}`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Legend */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
          {segments.map((s) => (
            <Box key={s.name} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: s.color }} />
                <Typography sx={{ fontSize: "12px", color: "#6b7280" }}>{s.name}</Typography>
              </Box>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
                {String(s.value).padStart(2, "0")}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};


const SalesChart = ({ data }: { data?: SaleItem[] }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


  const chartData = days.map((day) => ({ day, income: 0, expense: 0 }));
  (data || []).forEach((item) => {
    const d = new Date(item.date).getDay(); // 0=Sun
    const idx = d === 0 ? 6 : d - 1;
    if (item.type === "income") chartData[idx].income += item.amount;
    else chartData[idx].expense += item.amount;
  });

  const totalIncome = (data || []).filter((d) => d.type === "income").reduce((s, d) => s + d.amount, 0);
  const totalExpense = (data || []).filter((d) => d.type === "expense").reduce((s, d) => s + d.amount, 0);

  const fmt = (n: number) => n >= 100000 ? `${(n / 100000).toFixed(0)}L` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : `${n}`;

  return (
    <Box>
   
      <Box sx={{ display: "flex", gap: 2, mb: 1.5, alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ef4444" }} />
          <Typography sx={{ fontSize: "12px", color: "#6b7280" }}>Total Sales</Typography>
          <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#ef4444" }}>{totalIncome}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#22c55e" }} />
          <Typography sx={{ fontSize: "12px", color: "#6b7280" }}>Total Sales Converted</Typography>
          <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#22c55e" }}>{totalExpense}</Typography>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <Typography sx={{ fontSize: "11px", color: "#9ca3af", backgroundColor: "#f3f4f6", px: 1, py: 0.3, borderRadius: "6px" }}>
            This week
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          gap: 0.3,
          backgroundColor: "#fff",
          border: "0.5px solid #e5e7eb",
          borderRadius: "8px",
          px: 1.5,
          py: 1,
          mb: 1,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "2px", backgroundColor: "#ef4444" }} />
          <Typography sx={{ fontSize: "12px", color: "#374151" }}>{fmt(totalIncome)} Total Income</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "2px", backgroundColor: "#22c55e" }} />
          <Typography sx={{ fontSize: "12px", color: "#374151" }}>{fmt(totalExpense)} Total Expense</Typography>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={chartData} barSize={10} barGap={3}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
          <YAxis hide />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid #e5e7eb" }}
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
          />
          <Bar dataKey="income" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};


const TicketBubbles = ({ data }: { data?: TicketData }) => {
  const solved = data?.solved || 0;
  const unsolved = data?.unsolved || 0;
  const progress = data?.progress || 0;
  const total = data?.total || 0;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
        <Box>
          <Typography sx={{ fontSize: "26px", fontWeight: 700, color: "#111827" }}>{total}</Typography>
          <Typography sx={{ fontSize: "12px", color: "#9ca3af" }}>Total tickets</Typography>
        </Box>
        <Typography sx={{ fontSize: "11px", color: "#2563eb", backgroundColor: "#eff6ff", px: 1, py: 0.3, borderRadius: "6px" }}>
          This week
        </Typography>
      </Box>


      <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1.5, my: 2, height: 120 }}>
        {/* Solved — large green */}
        <Box sx={{ width: 90, height: 90, borderRadius: "50%", backgroundColor: "#E3332DCC", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#fff" }}>{solved}</Typography>
        </Box>
        {/* Unsolved — medium red */}
        <Box sx={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: "#F6C522CC", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>{unsolved}</Typography>
        </Box>
        {/* In progress — small yellow */}
        <Box sx={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#34814BCC", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "flex-end", mb: 1 }}>
          <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>{String(progress).padStart(2, "0")}</Typography>
        </Box>
      </Box>


      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {[
          { label: "Solved", value: solved, color: "#E3332DCC" },
          { label: "unsolved", value: unsolved, color: "#F6C522CC" },
          { label: "In Progress", value: progress, color: "#34814BCC" },
        ].map((item) => (
          <Box key={item.label} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: item.color }} />
              <Typography sx={{ fontSize: "12px", color: "#6b7280" }}>{item.label}</Typography>
            </Box>
            <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
              {String(item.value).padStart(2, "0")}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const token = useSelector((state: RootState) => state.user.token) || localStorage.getItem("token");

  const [dashboard, setDashBoard] = useState<DashboardData>({});
  const [loading, setLoading] = useState(false);

  const fetchApi = async () => {
    try {
      setLoading(true);
      const res = await dashBoardApiServices.getAllDashboard(token);
      if (res.status < 400) {
        setDashBoard(res.data.result);
      }
    } catch (e: any) {
      toast.error(e?.message || e?.error?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const cardStyle = {
    background: theme.palette.common.white,
    borderRadius: "12px",
    py: 2,
    px: 3,
    height: "100%",
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, md: 2 } }}>
      <Grid container spacing={2}>
     
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={cardStyle}>
            <SectionHeader icon={<LuTextSearch size={16} />} title="Overview" />
            <Grid container spacing={1.5}>
              {overviewCards.map((card, i) => (
                <Grid key={i} size={{ xs: 6, sm: 4 }}>
                  <OverviewCard {...card} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

     
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={cardStyle}>
            <SectionHeader icon={<GoProjectRoadmap size={16} />} title="Leads Overview" />
            <LeadsDonut data={dashboard.leeds} />
          </Box>
        </Grid>

     
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={cardStyle}>
            <SectionHeader icon={<TbChartBar size={16} />} title="Sales" />
            <SalesChart data={dashboard.salse} />
          </Box>
        </Grid>


        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={cardStyle}>
            <SectionHeader icon={<BiSupport size={16} />} title="Support tickets" />
            <TicketBubbles data={dashboard.ticket} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;