import ScreenLayout from "@/components/layout/ScreenLayout";
import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import dynamic from "next/dynamic";
import { BASE_URL, DEFAULT_HEADERS } from "@/util/constants";
import axios from "axios";
import { callToast } from "@/util/toast";
import { deleteNote } from "@/store/state/noteSlice";
import { type Note, Screen } from "@/types";

const HomeScreen = dynamic(async () => await import("../screens/HomeScreen"));
const NewScreen = dynamic(async () => await import("../screens/NewScreen"));
const EditScreen = dynamic(async () => await import("../screens/EditScreen"));
const ViewScreen = dynamic(async () => await import("../screens/ViewScreen"));
const SettingScreen = dynamic(async () => await import("../screens/SettingsScreen"));

const MainScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { screen, currentNote, userId, passcode } = useAppSelector(
    (state) => state.noteSlice
  );
  const { deleteNoteModal } = useAppSelector((state) => state.modalSlice);

  const handleDeleteNote = async (currentNote: Note): Promise<void> => {
    const response = await axios.post(
      BASE_URL + "/api/delete",
      {
        userId,
        passcode,
        id: currentNote.id,
      },
      DEFAULT_HEADERS
    );

    const status = response.status;
    const { message } = response.data;

    if (status === 404) {
      return callToast(message, "warning");
    }

    if (status === 200) {
      dispatch(deleteNote(currentNote));
      callToast(message, "success");
    } else {
      callToast(message, "warning");
    }
  };

  const isHomeScreen = screen === Screen.HOME;
  const isNewScreen = screen === Screen.NEW;
  const isViewScreen = screen === Screen.VIEW;
  const isEditScreen = screen === Screen.EDIT;
  const isSettingsScreen = screen === Screen.SETTINGS;

  return (
    <ScreenLayout>
      {isHomeScreen && <HomeScreen />}
      {isNewScreen && <NewScreen />}
      {isViewScreen && <ViewScreen />}
      {isEditScreen && <EditScreen />}
      {isSettingsScreen && <SettingScreen />}
      <Modal
        modalId="deleteNoteModal"
        toggle={deleteNoteModal}
        body="Are you sure you want to delete this note? This action cannot be undone."
        action={async () => await handleDeleteNote(currentNote)}
        actionText="Delete"
      />
    </ScreenLayout>
  );
};

export default MainScreen;
