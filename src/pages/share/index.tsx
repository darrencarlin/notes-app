import HorizontalRule from "@/components/HorizontalRule";
import Markdown from "@/components/Markdown";
import NoteTitle from "@/components/layout/NoteTitle";
import type { Note } from "@/types";
import { BASE_URL, DEFAULT_HEADERS } from "@/util/constants";
import axios from "axios";
import type { GetServerSideProps } from "next";
import React, { useEffect, useState, type FC } from "react";

interface ShareLayoutProps {
  children: React.ReactNode;
}

const ShareLayout: FC<ShareLayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className="bg-gray-800 m-w-screen min-h-screen py-16">
      <div className="max-w-5xl m-auto">{children}</div>
    </div>
  );
};

interface Props {
  userId: string;
  noteId: string;
}

const Share: FC<Props> = ({ userId, noteId }): JSX.Element => {
  const [note, setNote] = useState<Note>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNote = async (): Promise<void> => {
      setLoading(true);
      const response = await axios.post(
        BASE_URL + "/api/note",
        {
          userId,
          noteId,
        },
        DEFAULT_HEADERS
      );

      const { data } = response;

      setNote(data[0]);
      setLoading(false);
    };

    void fetchNote();
  }, [noteId, userId]);

  if (loading)
    return (
      <ShareLayout>
        <p>Loading...</p>
      </ShareLayout>
    );

  if (!note) {
    return (
      <ShareLayout>
        <p>Note not found</p>
      </ShareLayout>
    );
  }

  return (
    <ShareLayout>
      <NoteTitle title={note.title} />
      <HorizontalRule />
      {note?.body && <Markdown markdown={note.body} />}
    </ShareLayout>
  );
};

export default Share;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // if existing user (query params in URL)
  const userId = context.query.userId as string;
  const noteId = context.query.noteId as string;

  if (!userId || !noteId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: [],
      userId,
      noteId,
    },
  };
};
