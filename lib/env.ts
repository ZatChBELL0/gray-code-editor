import { z } from "zod";

const envSchema = z.object({
  OLLAMA_API_URL: z.string().url().default("http://localhost:11434"),
  OLLAMA_MODEL: z.string().min(1).default("codellama:latest"),
  OLLAMA_TIMEOUT_MS: z
    .string()
    .optional()
    .transform((value) => {
      const fallback = 30000;
      if (!value) return fallback;
      const parsed = Number(value);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
    }),
});

const parsedEnv = envSchema.safeParse({
  OLLAMA_API_URL: process.env.OLLAMA_API_URL,
  OLLAMA_MODEL: process.env.OLLAMA_MODEL,
  OLLAMA_TIMEOUT_MS: process.env.OLLAMA_TIMEOUT_MS,
});

if (!parsedEnv.success) {
  console.error("Invalid environment variables", parsedEnv.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = {
  ...parsedEnv.data,
  OLLAMA_TIMEOUT_MS: parsedEnv.data.OLLAMA_TIMEOUT_MS ?? 30000,
};
