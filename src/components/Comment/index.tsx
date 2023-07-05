import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import CommentItem from "../CommentItem";
import MyButton from "../UI/button/MyButton";

const Comment = () => {
  const { comments } = useAppSelector((state) => state.comments);
  const randomNumb = Math.floor(Math.random() * 5);
  const commentsLimit = comments.slice(0, randomNumb);
  return (
    <div className="comment">
      <h2>Отзывы</h2>
      <MyButton>Оставить отсыз</MyButton>
      <ul>
        {commentsLimit.map((element) => (
          <CommentItem key={element.id} comments={element} />
        ))}
      </ul>
    </div>
  );
};

export default Comment;
