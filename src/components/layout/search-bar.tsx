import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Input from "../ui/input";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (debouncedValue) {
      setSearchParams({ search: debouncedValue });
    }
  }, [debouncedValue, setSearchParams]);

  return (
    <div>
      <Input
        RightIcon={<Search className="h-4 w-4" color="#94A3B8" />}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    </div>
  );
};
