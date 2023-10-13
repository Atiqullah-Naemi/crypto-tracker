import axios from "axios";
import { create } from "zustand";
import { CoinProps } from "../types";

interface CryptoProps {
  loading: boolean;
  data: CoinProps[] | [];
  detail: any;
  fetchCrtypto: ({ coinId, days }: { coinId: string; days: number }) => void;
  error: string;
}
export const useCoin = create<CryptoProps>((set) => ({
  loading: false,
  data: [],
  detail: null,
  error: "",
  fetchCrtypto: async ({ coinId, days }: { coinId: string; days: number }) => {
    try {
      set(() => ({ loading: true }));
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
      );

      const details = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
      );
      return set(() => ({
        data: response.data,
        detail: details.data,
      }));
    } catch (error) {
      set(() => ({ error: error?.message }));
      console.log({ error });
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));
