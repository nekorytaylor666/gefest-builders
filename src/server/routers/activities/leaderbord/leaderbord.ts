import { redis } from "@/lib/redis";

export async function updateScore(userId: string, score: number) {
  // ZADD добавляет элементы в отсортированное множество или обновляет их оценку, если они уже существуют
  try {
    await redis.zincrby("leaderboard", score, userId);
  } catch (error) {
    console.log(error);
  }
}
