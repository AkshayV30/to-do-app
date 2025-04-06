import cors from "cors";
import express from "express";

// import helmet from "helmet";
// import compression from "compression";
// import morgan from "morgan";

// const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];

console.log("Allowed Origins:", allowedOrigins);

export const configMiddleware = (app) => {
  // CORS
  // app.use(
  //   cors({
  //     origin: allowedOrigins,
  //     methods: "GET,POST,PUT,DELETE",
  //     allowedHeaders: "Content-Type",
  //   })
  // );

  // app.options("*", cors());

  app.use(cors("*"));

  // Parse JSON bodies
  app.use(express.json());

  //   app.use(helmet());
  //   app.use(compression());
  //   app.use(morgan("dev"));
};
