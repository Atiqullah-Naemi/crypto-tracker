import axios from "axios";
import { create } from "zustand";
import { SearchResponseProps } from "../types";

interface CryptoProps {
  loading: boolean;
  data: SearchResponseProps[] | [];
  searchCrtyptoList: (searchTerm: string) => void;
  error: string;
  noResult: string;
  clearData: () => void;
}
export const useCryptoSearch = create<CryptoProps>((set) => ({
  loading: false,
  data: [],
  error: "",
  noResult: "",
  clearData: () => set(() => ({ data: [] })),
  searchCrtyptoList: async (searchTerm: string) => {
    try {
      set(() => ({ loading: true }));
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${searchTerm}`
      );

      console.log({ response });
      return set(() => ({ data: response.data.coins }));
    } catch (error) {
      set(() => ({ error: error?.message }));
      console.log({ error });
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));
