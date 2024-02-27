// Search.jsx
import { Input } from "@nextui-org/react";
import SearchIcon from "../../../assets/icons/SearchIcon";

export default function Search({ searchQuery, setSearchQuery }) {
  return (
    <Input
      variant="bordered"
      placeholder="type to search"
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      startContent={
        <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
    ></Input>
  );
}
