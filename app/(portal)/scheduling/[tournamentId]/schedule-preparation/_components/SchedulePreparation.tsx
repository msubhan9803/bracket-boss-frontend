"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import ImportScheduleDataButton from "@/components/mutation-buttons/ImportScheduleDataButton";
import UserSelectionTable from "@/components/tables/UserSelectionTable";
import { Button } from "@/components/ui/button";
import { User } from "@/graphql/generated/graphql";
import { setScheduleOfTorunamentInput } from "@/redux/slices/schedule.slice";
import { PageNames, PageUrls } from "@/lib/app-types";

type Props = {
  tournamentId: string;
  users: User[];
};

export default function SchedulePreparation({ tournamentId, users }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const handleUsersSelection = (userIds: number[]) => {
    setSelectedUsers(userIds);
  };

  const handleViewSchedule = () => {
    dispatch(
      setScheduleOfTorunamentInput({
        tournamentId: parseInt(tournamentId),
        userIds: selectedUsers,
      })
    );
    router.push(
      `${PageUrls.SCHEDULING_MANAGEMENT}/${tournamentId}/${PageNames.SCHEDULE_EDITOR}`,
      { scroll: false }
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mt-3 mb-4">Select Users</h2>

        <div className="space-x-2">
          <ImportScheduleDataButton />
          <Button
            disabled={selectedUsers.length === 0}
            onClick={handleViewSchedule}
          >
            View Schedule
          </Button>
        </div>
      </div>

      <UserSelectionTable
        users={users}
        handleUsersSelection={handleUsersSelection}
      />
    </>
  );
}
