import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";

import programRoutes from "./routes/program.routes";
import institutionRoutes from "./routes/institution.routes";
import userRoutes from "./routes/user.routes";
import favoriteRoutes from "./routes/favorite.routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "OK",
        message: "UpNext API is running",
        timestamp: new Date().toISOString()
    });
});

app.get("/api", (req: Request, res: Response) => {
    res.json({
        message: "Welcome to UpNext API",
        version: "1.0.0",
        documentation: "/api-docs",
        endpoints: {
            programs: "/api/programs",
            institutions: "/api/institutions",
            users: "/api/users",
            favorites: "/api/favorites"
        }
    });
});

app.use("/api/programs", programRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Not Found",
        message: "The requested resource was not found",
        path: req.path
    });
});

app.use((err: Error, req: Request, res: Response) => {
    console.error("Error:", err);
    res.status(500).json({
        error: "Internal Server Error",
        message: err.message || "An unexpected error occurred"
    });
});

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`  Health check: http://localhost:${PORT}/health`);
    console.log(` Endpoints:`);
    console.log(`   - GET /api/programs`);
    console.log(`   - GET /api/institutions`);
    console.log(`   - GET /api/users`);
    console.log(`   - GET /api/favorites/user/:userId`);
});

export default app;
