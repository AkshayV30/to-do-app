import cors from "cors";
import express from "express";

// import helmet from "helmet";
// import compression from "compression";
// import morgan from "morgan";

const allowedOrigins = [
  "https://akshayv30.github.io/",
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);

// const allowedOrigins = ["https://akshayv30.github.io"];

console.log("Allowed Origins:", allowedOrigins);

export const configMiddleware = (app) => {
  app.use(
    cors({
      origin: (origin, callback) => {
        // allow requests with no origin (e.g. mobile apps, curl)
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        callback(new Error("Not allowed by CORS"));
      },
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type",
      credentials: true,
    })
  );

  // app.options("*", cors());

  // Parse JSON bodies
  app.use(express.json());

  //   app.use(helmet());
  //   app.use(compression());
  //   app.use(morgan("dev"));
};
