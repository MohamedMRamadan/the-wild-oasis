import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  function sortHandler(e) {
    const { value } = e.target;
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }
  return <Select value={sortBy} options={options} onChange={sortHandler} />;
}

export default SortBy;
