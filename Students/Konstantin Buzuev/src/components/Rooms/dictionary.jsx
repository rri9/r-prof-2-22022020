import React from "react";

import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import AssistantOutlinedIcon from "@material-ui/icons/AssistantOutlined";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";

export const chatTypes = [
  {
    component: <FeedbackOutlinedIcon />,
    label: "Важный",
    type: "important"
  },
  {
    component: <AssistantOutlinedIcon />,
    label: "VIP",
    type: "VIP"
  },
  {
    component: <SmsOutlinedIcon />,
    label: "Обычный",
    type: "normal"
  }
];
