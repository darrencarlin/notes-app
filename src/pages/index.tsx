import Controls from "@/components/layout/Controls";
import Letters from "@/components/layout/Letters";
import Note from "@/components/layout/Note";
import Notes from "@/components/layout/Notes";
import Screen from "@/components/layout/Screen";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setData } from "@/store/state/noteApp";
import { type Note as NoteType } from "@/types";
import { BASE_URL, DEFAULT_HEADERS } from "@/util/constants";
import { checkIfObjectIsEmpty, generateRandomString } from "@/util/functions";
import type { GetServerSideProps } from "next";
import { useEffect } from "react";
import axios from "axios";
import useSyncNotesWithFirebase from "@/util/hooks/useSyncNotesWithFirebase";

interface Props {
  data: NoteType[];
  userId: string;
  passcode: string;
}

export const runtime = "edge";

export default function Home({ data, userId, passcode }: Props): JSX.Element {
  const { notes } = useAppSelector((state) => state.noteApp);
  const dispatch = useAppDispatch();

  // Start interval to sync notes to firebase
  useSyncNotesWithFirebase({ notes, userId, passcode });

  useEffect(() => {
    dispatch(setData({ notes: data, userId, passcode }));
  }, [dispatch, data, userId, passcode]);

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
  // if new user (no query params in URL)
  if (checkIfObjectIsEmpty(context.query)) {
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
  const userId = context.query.userId as string;
  const passcode = context.query.passcode as string;

  const response = await axios.post(
    BASE_URL + "/api/notes",
    {
      userId,
      passcode,
    },
    DEFAULT_HEADERS
  );

  const { code } = response.data;

  if (code === 404) {
    return {
      notFound: true,
    };
  }

  const { data } = response;

  return {
    props: {
      data,
      userId,
      passcode,
    },
  };
};
