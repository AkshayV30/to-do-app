import cors from "cors";
import express from "express";

// import helmet from "helmet";
// import compression from "compression";
// import morgan from "morgan";

const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];

console.log("Allowed Origins:", allowedOrigins);

export const configMiddleware = (app) => {
  // CORS
  // app.use(
  //   cors({
  //     origin: function (origin, callback) {
  //       if (!origin || allowedOrigins.includes(origin)) {
  //         callback(null, true);
  //       } else {
  //         callback(new Error("Not allowed by CORS"));
  //       }
  //     },
  //     methods: "GET,POST,PUT,DELETE",
  //     credentials: true,
  //   })
  // );
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

  // Parse JSON bodies
  app.use(express.json());

  //   app.use(helmet());
  //   app.use(compression());
  //   app.use(morgan("dev"));
};
