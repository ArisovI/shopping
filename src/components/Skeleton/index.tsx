import { Stack, Skeleton } from "@mui/material";
import React from "react";

const Skeletons = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" width={250} height={405} />
    </Stack>
  );
};

export default Skeleton;
