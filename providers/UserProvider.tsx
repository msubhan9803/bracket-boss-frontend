"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import { GetUserByIdQuery } from "@/graphql/generated/graphql";
import { setClubId, setRoleId, setUserId } from "@/redux/slices/user.slice";
import { setCustomCookie } from "@/services/cookie-handler.service";
import { getUserById } from "@/server-requests/user.server-request";

const UserProvider: React.FC<{
  userDetails: GetUserByIdQuery["getUserById"];
  children: React.ReactNode;
}> = ({ userDetails, children }) => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    if (!userDetails) return;

    if (userDetails.user.clubs) {
      let selectedClub = parseInt(getCookie("selected-club") as string);

      if (!selectedClub) {
        if (userDetails?.user?.clubs) {
          selectedClub = userDetails.user.clubs[0].id as number;

          setCustomCookie("selected-club", selectedClub.toString()).catch(
            (error) => {
              console.error("Error setting selected club cookie:", error);
            }
          );
        }
      }

      dispatch(setClubId(selectedClub));

      /**
       * Fetch User Role based on club id
       */
      const userData = await getUserById(userDetails.user.id, selectedClub);

      if (userData.userRoleClub?.role) {
        dispatch(setRoleId(userData.userRoleClub?.role.id as number));
      }
    }

    dispatch(setUserId(userDetails.user.id));
  };

  useEffect(() => {
    fetchData();
  }, [userDetails, dispatch]);

  return <>{children}</>;
};

export default UserProvider;
