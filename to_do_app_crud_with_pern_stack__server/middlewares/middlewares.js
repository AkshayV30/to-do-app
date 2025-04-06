import cors from "cors";
import express from "express";

export const configMiddleware = (app) => {
  // CORS
  app.use(
    cors({
      origin: "*",
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type",
    })
  );

  // Parse JSON bodies
  app.use(express.json());
};
