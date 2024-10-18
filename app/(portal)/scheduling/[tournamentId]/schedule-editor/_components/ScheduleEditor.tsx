'use client'
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ScheduleEditor() {
  const scheduleOfTorunamentInput = useSelector(
    (state: RootState) => state.schedule.scheduleOfTorunamentInput
  );
  console.log(
    "🌺🌺🌺🌺 scheduleOfTorunamentInput: ",
    scheduleOfTorunamentInput
  );

  return <div>ScheduleEditor</div>;
}
