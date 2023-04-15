import Controls from "@/components/Controls";
import Letters from "@/components/Letters";
import Note from "@/components/Note";
import Notes from "@/components/Notes";
import Screen from "@/components/layout/Screen";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setData } from "@/store/state/noteApp";
import { type Note as NoteType } from "@/types";
import { BASE_URL, DEFAULT_HEADERS } from "@/util/constants";
import { checkIfObjectIsEmpty } from "@/util/functions/checkObjectIsEmpty";
import { generateRandomString } from "@/util/functions/generateRandomString";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import axios from "axios";

interface Props {
  data: NoteType[];
  userId: string;
  passcode: string;
}

export default function Home({ data, userId, passcode }: Props) {
  const { notes } = useAppSelector((state) => state.noteApp);
  const dispatch = useAppDispatch();

  // Start interval to sync notes to firebase
  useEffect(() => {
    const syncNotesWithFirebase = async () => {
      const { status } = await axios.post(
        BASE_URL + "/api/sync",
        {
          notes,
          userId,
          passcode,
        },
        DEFAULT_HEADERS
      );

      if (status === 200) {
        console.log("Notes synced...");
      }
    };

    const interval = setInterval(() => {
      syncNotesWithFirebase();
    }, 30000);

    return () => clearInterval(interval);
  });

  // Set data from firebase and auth to store

  useEffect(() => {
    dispatch(setData({ notes: data, userId, passcode }));
  }, [dispatch, data, userId, passcode]);

  return (
    <Screen>
      <Notes />
      <div className="grid grid-rows-[60px_auto] bg-gray-800">
        <Controls />
        <Note />
      </div>
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
