import { TriggerClient } from "@trigger.dev/sdk";

export const client = new TriggerClient({
  id: "gefest-academy-w7_i",
  apiKey: process.env.TRIGGER_API_KEY,
  apiUrl: process.env.TRIGGER_API_URL,
});
