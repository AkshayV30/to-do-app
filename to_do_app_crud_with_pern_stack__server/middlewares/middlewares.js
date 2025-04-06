import cors from "cors";
import express from "express";

export const configMiddleware = (app) => {
  // CORS
  app.use(
    cors({
      origin: "https://akshayv30.github.io/to-do-app/",
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type",
    })
  );

  app.options("*", cors());

  // Parse JSON bodies
  app.use(express.json());
};
