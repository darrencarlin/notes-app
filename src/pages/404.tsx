import Text from "@/components/Text";
import Title from "@/components/Title";
import Link from "next/link";

export default function Custom404(): JSX.Element {
  return (
    <div className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      <div className="max-w-xl">
        <Title size="lg" title="404" />
        <Text>
          Your account may have been removed, this typically happens if you do not
          add any notes and 24 hours has passed.
        </Text>

        <Text>
          If this was the case, you can create a new account by going back to the{" "}
          <Link href="/" className="underline text-blue-400">
            home page
          </Link>
          .
        </Text>
      </div>
    </div>
  );
}
