import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Input from "./input";

type SearchBarProps = {
  placeholder?: string;
};

export const SearchBar = ({ placeholder = "Buscar" }: SearchBarProps) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (debouncedValue) {
      setSearchParams({ search: debouncedValue });
    } else {
      // Remove o parâmetro de busca quando o campo está vazio
      setSearchParams({});
    }
  }, [debouncedValue, setSearchParams]);

  return (
    <div>
      <Input
        className="w-full"
        RightIcon={<Search className="h-4 w-4" color="#94A3B8" />}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
