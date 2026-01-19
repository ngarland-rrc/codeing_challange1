import request, { Response } from "supertest";
import app from "../src/app";
import { getPlayers, getPlayer, getPlayerRating } from "../src/services/playerService";

describe("GET /api/v1/health", () => {
    it("should return server health status", async () => {
        const response: Response = await request(app).get("/api/v1/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("version");
    });
});

describe("GET /api/v1/players", () => {
    it("should return all player data", async () => {
        const response: Response = await request(app).get("/api/v1/players");
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(getPlayers())
    })
})

describe("GET /api/v1/players/:id", () => {
    it("should return the specified player data using the inputted id in api call", async () => {
        const response: Response = await request(app).get("/api/v1/players/1");
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(getPlayer(1))
    })

    it("should return null if specified player data cannot be found", async () => {
        const response: Response = await request(app).get("/api/v1/player/4");
        expect(response.status).toBe(404);
    })
})

describe("GET /api/v1/players/:id/rating", () => {
    it("should return player rating data for specified player", async () => {
        const response: Response = await request(app).get("/api/v1/players/1/rating");
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(getPlayerRating(1))
    })

    it("edge case should return player rating data with 0 games", async () => {
        const response: Response = await request(app).get("/api/v1/players/3/rating");
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(getPlayerRating(3))
    })

    it("edge case should return player rating data with 0 losses", async () => {
        const response: Response = await request(app).get("/api/v1/players/27/rating");
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(getPlayerRating(27))
    })

    it("edge case should return player rating data with rounding to 2 decimal places", async () => {
        const response: Response = await request(app).get("/api/v1/players/1/rating");
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(getPlayerRating(1))
        expect(response.body.calculatedRating).toBe("1500.00")
    })
})