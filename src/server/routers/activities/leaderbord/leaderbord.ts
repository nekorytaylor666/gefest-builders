import { redis } from "@/lib/redis";

export async function updateScore(userId: string, score: number) {
  // ZADD добавляет элементы в отсортированное множество или обновляет их оценку, если они уже существуют
  try {
    await redis.zincrby("leaderboard", score, userId);
  } catch (error) {
    console.log(error);
  }
}

export async function getTop10Scores() {
  try {
    // ZREVRANGE возвращает указанный диапазон элементов в отсортированном множестве, упорядоченном от большего к меньшему
    const res = await redis.zrange("leaderboard", 0, 4, {
      withScores: true,
      rev: true,
    });
    return res
      .map((value, index, array) => {
        // Каждый второй элемент в массиве - это оценка, предшествующая ему элемент - идентификатор пользователя
        if (index % 2 === 0) {
          return {
            userId: value as string,
            score: parseInt(array[index + 1] as string, 10),
          };
        }
        return null;
      })
      .filter((item) => item); // Фильтруем, чтобы оставить только объекты с данными пользователя
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Existing code...

export async function getUserPositionAndSurroundings(userId: string) {
  try {
    // Получаем ранг пользователя
    const rank = await redis.zrevrank("leaderboard", userId);

    if (rank === null) {
      return null; // Пользователь не найден
    }

    // Определяем диапазон для получения пользователей вокруг
    let start = rank - 5;
    let end = rank + 5;

    // Если пользователь в топе, то берем пользователей снизу
    if (rank < 5) {
      start = 0;
      end = 9;
    }

    // Если пользователь внизу списка, то берем пользователей сверху
    const leaderboardSize = await redis.zcard("leaderboard");
    if (rank > leaderboardSize - 3) {
      start = leaderboardSize - 5;
      end = leaderboardSize - 1;
    }

    // Получаем пользователей вокруг
    const res = await redis.zrange("leaderboard", start, end, {
      withScores: true,
      rev: true,
    });

    // Массив имен для случайного выбора
    const names = [
      "Илон Маск", // Elon Musk
      "Марк Цукерберг", // Mark Zuckerberg
      "Билл Гейтс", // Bill Gates
      "Стив Джобс", // Steve Jobs
      "Ларри Пейдж", // Larry Page
      "Сергей Брин", // Sergey Brin
      "Джефф Безос", // Jeff Bezos
      "Тим Кук", // Tim Cook
      "Сатиа Наделла", // Satya Nadella
      "Сандар Пичаи", // Sundar Pichai
      "Джек Ма", // Jack Ma
      "Пон Юн", // Pony Ma
      "Роберт Кан", // Robert Kahn
      "Винтон Серф", // Vint Cerf
      "Линус Торвальдс", // Linus Torvalds
      "Ричард Столлман", // Richard Stallman
      "Адам Д'Анжело", // Adam D'Angelo
      "Брайан Актон", // Brian Acton
      "Джан Кум", // Jan Koum
      "Дрю Хьюстон", // Drew Houston
    ];
    return res
      .map((value, index, array) => {
        if (index % 2 === 0) {
          // Выбираем случайное имя из массива
          const name = value === userId ? userId : names[index];
          return {
            rank: start + Math.floor(index / 2) + 1,
            name,
            score: parseInt(array[index + 1] as string, 10),
            isCurrentUser: value === userId,
          };
        }
        return null;
      })
      .filter((item) => item);
  } catch (error) {
    console.log(error);
    return [];
  }
}
