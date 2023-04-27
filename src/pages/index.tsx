import Controls from "@/components/layout/Controls";
import Letters from "@/components/layout/Letters";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Note from "@/components/layout/Note";
import Notes from "@/components/layout/Notes";
import Screen from "@/components/layout/Screen";
import useSyncNotesWithFirebase from "@/hooks/useSyncNotesWithFirebase";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setData, setLoading } from "@/store/state/noteApp";
import { type Note as NoteType } from "@/types";
import { BASE_URL, DEFAULT_HEADERS } from "@/util/constants";
import { generateRandomString } from "@/util/functions";
import axios from "axios";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  data: NoteType[];
  userId: string;
  passcode: string;
}

export default function Home({ data, userId, passcode }: Props): JSX.Element {
  const router = useRouter();
  const { notes, loading } = useAppSelector((state) => state.noteApp);
  const dispatch = useAppDispatch();

  // Start interval to sync notes to firebase
  useSyncNotesWithFirebase({ notes, userId, passcode });

  useEffect(() => {
    dispatch(setData({ notes: data, userId, passcode }));
  }, [dispatch, data, userId, passcode]);

  useEffect(() => {
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

      const { data } = response;

      dispatch(setData({ notes: data, userId, passcode }));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    };

    void fetchData();
  }, [dispatch, passcode, router, userId]);

  if (loading) return <LoadingScreen />;

  return (
    <Screen>
      <Notes />
      <section className="grid grid-rows-[50px_auto] bg-gray-800">
        <Controls />
        <Note />
      </section>
      <Letters />
    </Screen>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId, passcode } = context.query;

  // if new user (no query params in URL)
  if (!userId || !passcode) {
    const userId = generateRandomString(20);
    const passcode = generateRandomString(10);

    await axios.post(
      BASE_URL + "/api/create-user",
      {
        userId,
        passcode,
      },
      DEFAULT_HEADERS
    );

    return {
      props: {
        data: [],
        userId,
        passcode,
      },
    };
  }

  // if existing user (query params in URL)

  return {
    props: {
      data: [],
      userId,
      passcode,
    },
  };
};
