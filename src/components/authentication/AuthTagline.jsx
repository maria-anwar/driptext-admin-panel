import React from "react";
import { Typography } from "@material-tailwind/react";

const AuthTagline = ({authline}) => {
  return (
    <Typography
      variant="paragraph"
      color="blue-gray"
      className="text-lg font-normal text-center"
    >
      {authline}
    </Typography>
  );
};

export default AuthTagline;
