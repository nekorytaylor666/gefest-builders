import { db } from "@/lib/db";
import { $Enums } from "@prisma/client";

// metadataMatchers is a dictionary that maps activity names to functions.
// These functions are used to generate a list of conditions that are used
// to match the metadata of an activity in the database.
// The idea behind this is that different activities have different metadata,
// and we might not want to match all aspects of the metadata, but only certain parts.
// For example, for the activity 'LESSON_COMPLETED', we only want to match the 'courseId' and 'lessonId'.
const metadataMatcherBuilder: Record<
  $Enums.ActivityName,
  (metadata: Record<string, any>) => object[]
> = {
  LESSON_COMPLETED: (metadata) => {
    return [
      {
        metadata: {
          path: ["courseId"],
          equals: metadata?.courseId,
        },
      },
      {
        metadata: {
          path: ["lessonId"],
          equals: metadata?.lessonId,
        },
      },
    ];
  },
  HOMEWORK_SUBMITTED: (metadata) => [
    {
      metadata: {
        path: ["homeworkId"],
        equals: metadata?.homeworkId,
      },
    },
  ],
};

// findExistingActivity is a function that finds the first activity in the database
// that matches the given user ID, activity type name, and metadata.
// It uses the metadataMatchers to generate the conditions for matching the metadata.
export const findExistingActivity = async (
  userId: string,
  activityTypeName: $Enums.ActivityName,
  metadata: Record<string, any> | undefined
) => {
  return await db.activity.findFirst({
    where: {
      AND: [
        { userId, activityTypeName },
        ...(metadata ? metadataMatcherBuilder[activityTypeName](metadata) : []),
      ],
    },
  });
};
