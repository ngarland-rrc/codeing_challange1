import express, { Express } from "express";
import { getPlayers, getPlayer, getPlayerRating } from "./services/playerService"

// Initialize Express application
const app: Express = express();

interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    }
    res.json(healthData);
});

// Returns all players with a count
app.get("/api/v1/players", (req, res) => {
    res.json(getPlayers())
});

// Returns a single player by ID (404 if not found)
app.get("/api/v1/players/:id", (req, res) => {
    res.json(getPlayer(Number(req.params.id)))
});

// Returns the calculated performance rating
app.get("/api/v1/players/:id/rating", (req, res) => {
    res.json(getPlayerRating(Number(req.params.id)))
});

export default app;