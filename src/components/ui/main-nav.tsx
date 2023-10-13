import { useEffect, useState } from "react";
import { Input } from "./input";
import { useDebounce } from "../../hooks/useDebounce";
import { useCryptoSearch } from "../../hooks/useCryptoSearch";
import { SearchResponseProps } from "../../types";
import { Link } from "react-router-dom";

export const MainNav = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, searchCrtyptoList, clearData } = useCryptoSearch();
  const deboucedSearch = useDebounce(searchTerm);

  useEffect(() => {
    if (deboucedSearch) {
      searchCrtyptoList(deboucedSearch);
    }

    return () => clearData();
  }, [deboucedSearch, searchCrtyptoList, clearData]);

  return (
    <nav className="bgWhite border-gray-200 dark:bg-gray-900">
      <div className="w-full flex flexWrap items-center justify-between mx-auto py-4 border-b border-neutral-200 max-w-7xl">
        <Link to="/">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:textWhite">
            Crypto Tracker
          </span>
        </Link>
        <div className="flex md:order-2">
          <div className="relative hidden md:block w-64">
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="max-w-sm"
              name="searchTerm"
            />

            {data.length > 0 && (
              <div
                className="
                flex
                flex-col
                p-5
                bg-white
                shadow-md
                rounded-md
                mt-2
                absolute
                z-50
                h-96
                overflow-x-hidden
                overscroll-y-auto
                right-0
                w-full
            "
              >
                {data.map((item: SearchResponseProps) => (
                  <Link
                    className="flex py-2 items-center gap-2"
                    key={item.id}
                    to={`/coins/${item.name}`}
                    onClick={clearData}
                  >
                    <img src={item.thumb} alt={item.name} className="h-5 w-5" />
                    <span className="font-[500]">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 roundedLg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 roundedLg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:textWhite dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 roundedLg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bgWhite dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"></ul>
        </div>
      </div>
    </nav>
  );
};
