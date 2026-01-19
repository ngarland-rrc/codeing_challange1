import express, { Express } from "express";

// Initialize Express application
const app: Express = express();

interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

// interface PlayerResponse {
//     id: number;
//     name: string;
//     wins: number;
//     losses: number;
//     totalScore: number;
// }

app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    }
    res.json(healthData);
});

export default app;