"use client"

import type { FC } from "react";
import Title from "@/components/Title";
import Button from "@/components/Button";
import Text from "@/components/Text";
import HorizontalRule from "@/components/HorizontalRule";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { updateSettings, setScreen } from "@/store/state/noteSlice";
import { Screen } from "@/types";
import axios from "axios";
import { BASE_URL, DEFAULT_HEADERS } from "@/util/constants";
import { type Settings } from "@/types";
import { callToast } from "@/util/toast";
import { useRouter } from "next/router";
import Modal from "../Modal";
import { toggleModal } from "@/store/state/modalSlice";

const SettingsScreen: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userId, passcode, settings } = useAppSelector((state) => state.noteSlice);
  const { deleteDataModal } = useAppSelector((state) => state.modalSlice);

  const updateSettingsInFirebase = async ({
    showBookmarkUrl,
  }: Settings): Promise<void> => {
    const response = await axios.post(
      BASE_URL + "/api/user-settings",
      {
        userId,
        passcode,
        settings: {
          showBookmarkUrl,
        },
      },
      DEFAULT_HEADERS
    );

    const status = response.status;
    const { message } = response.data;

    if (status === 404) {
      return callToast(message, "warning");
    }

    if (status === 200) {
      callToast(message, "success");
    } else {
      callToast(message, "warning");
    }
  };

  const handleToggleBookmarkUrl = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    dispatch(
      updateSettings({
        showBookmarkUrl: e.currentTarget.checked,
      })
    );

    void updateSettingsInFirebase({
      showBookmarkUrl: e.currentTarget.checked,
    });
  };

  const deleteAccount = async (): Promise<void> => {
    await axios.post(
      BASE_URL + "/api/delete-data",
      {
        userId,
        passcode,
      },
      DEFAULT_HEADERS
    );

    dispatch(setScreen(Screen.NEW));

    await router.push("/");
  };

  return (
    <>
      <Title title="Settings" size="md" />
      <HorizontalRule />

      <div className="mb-12">
        <Title title="Data Management" size="sm" />
        <Text>
          This is where you can delete all your data or export it to a JSON
        </Text>
        <div className="flex gap-4">
          <Button
            text="Delete Data"
            backgroundColor="bg-red-600"
            onClick={() => dispatch(toggleModal("deleteDataModal"))}
          />
          <Button
            text="Export Data"
            backgroundColor="bg-blue-600"
            onClick={async () =>
              await router.push(`api/export/?id=${userId}-${passcode}`)
            }
          />
        </div>
      </div>

      <div className="mb-12">
        <Title title="App Management" size="sm" />
        <Text>This is where you can customize the app to your liking.</Text>

        <label htmlFor="bookmarkUrl" className="flex items-center">
          <input
            type="checkbox"
            className="w-5 h-5 mr-2"
            id="bookmarkUrl"
            defaultChecked={settings.showBookmarkUrl}
            onClick={async (e) => await handleToggleBookmarkUrl(e)}
          />
          <span className="text-sm">Show bookmark URL</span>
        </label>
      </div>
      <Modal
        modalId="deleteDataModal"
        toggle={deleteDataModal}
        body="Are you sure you want to delete all your data? This action is irreversible."
        action={async () => await deleteAccount()}
        actionText="Delete"
      />
    </>
  );
};

export default SettingsScreen;
