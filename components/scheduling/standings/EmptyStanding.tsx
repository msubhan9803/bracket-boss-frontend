import React from "react";

export default function EmptyStanding({ text }: { text: String; }) {
  return (
    <div className="flex-1 w-full flex items-center justify-center my-auto">
      <div className="flex flex-col items-center gap-y-4">
        <h2 className="text-primary text-2xl">{text}</h2>
      </div>
    </div>
  );
}
