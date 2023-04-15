import Link from "next/link";

export default function Custom404() {
  return (
    <div className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      <div className="max-w-xl">
        <h1 className="text-2xl mb-4">404 - Page Not Found</h1>
        <p className="mb-4">
          Your account may have been removed, this typically happens if you do not
          add any notes.
        </p>

        <p>
          If this was the case, you can create a new account by going back to the{" "}
          <Link href="/" className="underline text-blue-400">
            home page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
