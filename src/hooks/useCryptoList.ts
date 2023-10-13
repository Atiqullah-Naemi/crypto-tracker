import axios from "axios";
import { create } from "zustand";
import { CoinMarketProps } from "../types";

interface CryptoProps {
  loading: boolean;
  data: CoinMarketProps[] | [];
  fetchCrtyptoList: () => void;
  error: string;
  todayMarketCap: string;
}
export const useCryptoList = create<CryptoProps>((set) => ({
  loading: false,
  data: [],
  error: "",
  todayMarketCap: "",
  fetchCrtyptoList: async () => {
    try {
      set(() => ({ loading: true }));
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en"
      );

      const todayCap = response.data.reduce(
        (acc, current: CoinMarketProps) => acc + current.market_cap,
        0
      );

      return set(() => ({
        data: response.data.map((item: CoinMarketProps) => {
          return {
            ...item,
            mktcap_fdv: item.market_cap / item.fully_diluted_valuation,
          };
        }),

        todayMarketCap: todayCap,
      }));
    } catch (error) {
      set(() => ({ error: error?.message }));
      console.log({ error });
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));
