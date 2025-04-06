import express from "express";
import todoRouter from "./todos.js";
import healthRouter from "./health.js";

export const todoRoutes = todoRouter;
export const healthRoute = healthRouter;
