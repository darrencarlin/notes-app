import Controls from "@/components/Controls";
import Letters from "@/components/Letters";
import Note from "@/components/Note";
import Notes from "@/components/Notes";
import Screen from "@/components/layout/Screen";

export default function Home() {
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
