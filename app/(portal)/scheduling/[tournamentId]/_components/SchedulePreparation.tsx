"use client";
import React, { useEffect, useState } from "react";
import ImportScheduleDataButton from "@/components/mutation-buttons/ImportScheduleDataButton";
import UserSelectionTable from "@/components/tables/UserSelectionTable";
import { Button } from "@/components/ui/button";
import { User } from "@/graphql/generated/graphql";

type Props = {
  users: User[];
};

export default function SchedulePreparation({ users }: Props) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const handleUsersSelection = (userIds: number[]) => {
    setSelectedUsers(userIds);
  };

  useEffect(() => {
    console.log('🌺🌺🌺🌺🌺 selectedUsers: ', selectedUsers)
  }, [selectedUsers]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mt-6 mb-4">Select Users</h2>

        <div className="space-x-2">
          <ImportScheduleDataButton />
          <Button disabled={selectedUsers.length === 0}>View Schedule</Button>
        </div>
      </div>

      <UserSelectionTable
        users={users}
        handleUsersSelection={handleUsersSelection}
      />
    </>
  );
}
