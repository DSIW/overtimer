import React from "react";

export type TimeLogEventTargetName = "startTime" | "endTime";

export type TimeLogEventTarget = {
  name: TimeLogEventTargetName;
  value: string;
};

interface TimeLogInputElement extends HTMLInputElement {
  target: TimeLogEventTarget;
}

type ChangeEvent = React.ChangeEvent<TimeLogInputElement>;

export default ChangeEvent;
