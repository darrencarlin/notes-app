import type { FC } from "react";
import Input from "./Input";

interface Props {
  label: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<Props> = ({ label, handleSearch }) => {
  return (
    <>
      <Input
        label={label}
        className="h-10 w-full bg-gray-700 p-4 mb-4 rounded"
        placeholder="Search"
        onChange={handleSearch}
      />
    </>
  );
};

export default SearchInput;
