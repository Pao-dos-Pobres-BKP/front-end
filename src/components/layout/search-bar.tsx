import Input from "../ui/input";

import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div>
      <Input RightIcon={<Search className="h-4 w-4" color="#94A3B8" />} />
    </div>
  );
};
