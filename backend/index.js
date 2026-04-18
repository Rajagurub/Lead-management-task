import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import ticketRouters from "./routes/ticketRoutes.js";
import leadsRouters from "./routes/LeadsRoutes.js"
import {connectDB} from "./config/db.js";
import salesRouter from "./routes/salesRouter.js";
import dashboardRouter from "./routes/dashboardRoutes.js"
import userRoutes from "./routes/userRounter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import resignationRoutes from "./routes/resignationRoutes.js"
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", adminRoutes);
app.use("/api/tickets",ticketRouters);
app.use("/api/leads",leadsRouters);
app.use("/api/sales",salesRouter);
app.use("/api/dashboard",dashboardRouter);
app.use("/api/users", userRoutes);
app.use("/api/resignations", resignationRoutes);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});