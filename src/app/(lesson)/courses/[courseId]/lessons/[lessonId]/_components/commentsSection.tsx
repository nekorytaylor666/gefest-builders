import Editor from "@/components/editor";
import TypographyH3 from "@/components/ui/typography/h3";
import { Comment } from "@prisma/client";
import React from "react";

const CommentsSection = ({ comments }: { comments: Comment[] }) => {
  return (
    <div>
      <TypographyH3>Комментарии</TypographyH3>
      <div>
        {comments.map((el) => (
          <div key={el.id}>
            {el.userId}
            {el.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
