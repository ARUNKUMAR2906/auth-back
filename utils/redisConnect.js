import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

// Initialize Redis client with optional URL
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

// Event listeners for logging Redis status
redisClient.on("error", (err) => console.error("Redis Client Error:", err));
redisClient.on("connect", () => console.log("Redis Connected"));
redisClient.on("end", () => console.log("Redis Connection Ended"));

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    await redisClient.quit();
    console.log("Redis connection closed on app termination.");
  } catch (err) {
    console.error("Error closing Redis connection:", err);
  } finally {
    process.exit(0);
  }
});

// Connect to Redis
await redisClient.connect();

// Export Redis client as a singleton
export default redisClient;
