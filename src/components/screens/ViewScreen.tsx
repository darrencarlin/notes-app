import { useAppSelector } from "@/store/hooks/redux";
import Markdown from "@/components/Markdown";
import HorizontalRule from "../HorizontalRule";

const ViewScreen = (): JSX.Element => {
  const { currentNote } = useAppSelector((state) => state.noteSlice);
  return (
    <div className="mb-[50px]">
      <h1 className="text-2xl font-bold  mb-4 lg:mb-6">{currentNote.title}</h1>
      <HorizontalRule />
      <Markdown markdown={currentNote.body} />
    </div>
  );
};

export default ViewScreen;
