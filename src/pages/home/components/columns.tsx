import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import { CoinMarketProps } from "../../../types";
import {
  numberToCurrency,
  isNumberPositive,
  cn,
  fixNumber,
} from "../../../utils";

export const columns: ColumnDef<CoinMarketProps>[] = [
  {
    accessorKey: "market_cap_rank",
    header: "#",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Star />
        <span>{row.getValue("market_cap_rank")}</span>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Coin",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <img
            src={row.original.image}
            alt={row.getValue("name")}
            className="h-5 w-5"
          />
          <span className="font-semibold">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "current_price",
    header: "Price",
    cell: ({ row }) => (
      <div>{numberToCurrency(row.getValue("current_price"))}</div>
    ),
  },
  {
    accessorKey: "price_change_percentage_1h_in_currency",
    header: "1h",
    cell: ({ row }) => (
      <div
        className={cn(
          isNumberPositive(
            row.getValue("price_change_percentage_1h_in_currency")
          )
            ? "text-green-500"
            : "text-red-500"
        )}
      >
        {fixNumber(
          row.getValue("price_change_percentage_1h_in_currency"),
          true
        )}
      </div>
    ),
  },
  {
    accessorKey: "price_change_percentage_24h_in_currency",
    header: "24h",
    cell: ({ row }) => (
      <div
        className={cn(
          isNumberPositive(
            row.getValue("price_change_percentage_24h_in_currency")
          )
            ? "text-green-500"
            : "text-red-500"
        )}
      >
        {fixNumber(
          row.getValue("price_change_percentage_24h_in_currency"),
          true
        )}
      </div>
    ),
  },
  {
    accessorKey: "price_change_percentage_7d_in_currency",
    header: "7d",
    cell: ({ row }) => (
      <div
        className={cn(
          isNumberPositive(
            row.getValue("price_change_percentage_7d_in_currency")
          )
            ? "text-green-500"
            : "text-red-500"
        )}
      >
        {fixNumber(
          row.getValue("price_change_percentage_7d_in_currency"),
          true
        )}
      </div>
    ),
  },
  {
    accessorKey: "total_volume",
    header: "24h Volume",
    cell: ({ row }) => (
      <div>{numberToCurrency(row.getValue("total_volume"))}</div>
    ),
  },
  {
    accessorKey: "market_cap",
    header: "Mkt Cap",
    cell: ({ row }) => (
      <div>{numberToCurrency(row.getValue("market_cap"))}</div>
    ),
  },
  {
    accessorKey: "fully_diluted_valuation",
    header: "FDV",
    cell: ({ row }) => (
      <div>{numberToCurrency(row.getValue("fully_diluted_valuation"))}</div>
    ),
  },
  {
    accessorKey: "mktcap_fdv",
    header: "Mkt Cap/FDV",
    cell: ({ row }) => <div>{fixNumber(row.getValue("mktcap_fdv"))}</div>,
  },
];
