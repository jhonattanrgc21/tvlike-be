import { Router } from "express";

// Routes
import authRoutes from "./auth.routes";

const routes = Router();

routes.use("/auth", authRoutes);

export default routes;
