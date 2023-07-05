import { Typography, Rating } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { CommentsItem } from "../../types/types";
interface ICommentItemProps {
  comments: CommentsItem;
}
const CommentItem: React.FC<ICommentItemProps> = ({ comments }) => {
  return (
    <li className="comment-item">
      <h3>Username: {comments.title}</h3>
      <span>{comments.body}</span>
      <Box>
        <Typography component="legend">Read only</Typography>
        <Rating name="read-only" value={comments.reactions} readOnly />
      </Box>
    </li>
  );
};

export default CommentItem;
