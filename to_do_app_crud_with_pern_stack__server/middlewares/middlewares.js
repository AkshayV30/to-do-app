import cors from "cors";
import express from "express";

// import helmet from "helmet";
// import compression from "compression";
// import morgan from "morgan";

// const allowedOrigins = [
//   "https://akshayv30.github.io/to-do-app/",
//   process.env.FRONTEND_URL,
//   "http://localhost:5173",
// ];

const allowedOrigins = ["https://akshayv30.github.io"];

console.log("Allowed Origins:", allowedOrigins);

export const configMiddleware = (app) => {
  app.use(
    cors({
      origin: allowedOrigins,
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
