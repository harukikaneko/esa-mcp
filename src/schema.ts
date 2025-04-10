import { z } from "zod";

export const orderSchema = z
  .union([z.literal("asc"), z.literal("desc")])
  .default("desc");

export const sortSchema = z
  .union([
    z.literal("created"),
    z.literal("updated"),
    z.literal("number"),
    z.literal("stars"),
    z.literal("comments"),
    z.literal("best_match"),
  ])
  .default("best_match");
