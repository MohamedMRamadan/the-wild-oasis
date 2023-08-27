import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useGetCabins from "./useGetCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useGetCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  //filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins = [];

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  //Sort
  const sortValue = searchParams.get("sortBy") || "StartDate-asc";

  const [field, direction] = sortValue.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
