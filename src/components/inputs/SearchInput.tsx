import type { FC } from "react";
import Input from "./Input";

interface Props {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<Props> = ({ handleSearch }) => {
  return (
    <Input
      className="h-10 w-full bg-gray-700 p-4 mb-4"
      placeholder="Search"
      onChange={handleSearch}
    />
  );
};

export default SearchInput;
