"use client";

import LoadingScreen from "@/components/LoadingScreen";
import AppLayout from "@/components/layout/AppLayout";
import Controls from "@/components/sections/Controls";
import Letters from "@/components/sections/Letters";
import MainScreen from "@/components/sections/MainScreen";
import Notes from "@/components/sections/Notes";
import useSyncData from "@/hooks/useSyncData";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setData, setLoading } from "@/store/state/noteSlice";
import { BASE_URL, DEFAULT_HEADERS } from "@/util/constants";
import { generateRandomString } from "@/util/functions";
import axios from "axios";
import { useEffect } from "react";

export default function Page({
  searchParams: { userId, passcode },
}: {
  searchParams: { userId: string; passcode: string };
}): JSX.Element {
  const { notes, loading } = useAppSelector((state) => state.noteSlice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userId || !passcode) return;
    const fetchData = async (): Promise<void> => {
      dispatch(setLoading(true));

      const response = await axios.post(
        BASE_URL + "/api/notes",
        {
          userId,
          passcode,
        },
        DEFAULT_HEADERS
      );

      const { notes, settings } = response.data;

      dispatch(setData({ notes, settings, userId, passcode }));

      dispatch(setLoading(false));
    };

    void fetchData();
  }, [dispatch, passcode, userId]);

  useEffect(() => {
    const createUser = async (): Promise<void> => {
      const userId = generateRandomString(20);
      const passcode = generateRandomString(20);
      await axios.post(
        BASE_URL + "/api/create-user",
        {
          userId,
          passcode,
        },
        DEFAULT_HEADERS
      );

      dispatch(
        setData({
          notes,
          settings: {
            showBookmarkUrl: true,
          },
          userId,
          passcode,
        })
      );
    };

    if (!userId || !passcode) {
      void createUser();
    }
  }, [dispatch, notes, passcode, userId]);

  useSyncData({ notes });

  if (loading) return <LoadingScreen />;

  return (
    <AppLayout>
      <Notes />
      <section className="grid grid-rows-[50px_auto] bg-gray-800">
        <Controls />
        <MainScreen />
      </section>
      <Letters />
    </AppLayout>
  );
}
