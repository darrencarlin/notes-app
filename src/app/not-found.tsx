import Text from "@/components/Text";
import Title from "@/components/Title";
import Link from "next/link";

export default function NotFound(): JSX.Element {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900">
      <div className="max-w-xl">
        <Title size="lg" title="404" />
        <Text>
          Your account may have been removed, this typically happens if you do not
          add any notes and 24 hours has passed.
        </Text>

        <Text>
          If this was the case, you can create a new account by going back to the{" "}
          <Link href="/" className="text-blue-400 underline">
            home page
          </Link>
          .
        </Text>
      </div>
    </div>
  );
}
