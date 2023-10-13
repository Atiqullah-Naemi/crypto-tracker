import { columns } from "./components/columns";
import { DataTable } from "../../components/ui/data-table";
import { useCryptoList } from "../../hooks/useCryptoList";
import { useEffect } from "react";
import { Heading } from "../../components/ui/heading";
import DataTableLoader from "../../components/ui/table-loader";
import { convertToInternationalCurrencySystem } from "../../utils";
import { MainNav } from "../../components/ui/main-nav";

export const DataTablePage = () => {
  const { loading, data, fetchCrtyptoList, todayMarketCap } = useCryptoList();

  useEffect(() => {
    fetchCrtyptoList();
  }, [fetchCrtyptoList]);

  return (
    <>
      <MainNav />
      <div className="w-full max-w-7xl mx-auto">
        <Heading
          title="Cryptocurrency Prices by Market Cap"
          subTitle={`The global cryptocurrency market cap today is $${convertToInternationalCurrencySystem(
            todayMarketCap
          )}`}
        />
        {loading && <DataTableLoader />}
        <DataTable columns={columns} data={data} data-testid="data-table" />
      </div>
    </>
  );
};
