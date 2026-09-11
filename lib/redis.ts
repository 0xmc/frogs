import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export const DISMISSED_SET_KEY = "milf:dismissed";
