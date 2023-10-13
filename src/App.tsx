import { CoinPage } from "./pages/coin";
import { DataTablePage } from "./pages/home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DataTablePage />,
  },
  {
    element: <CoinPage />,
    path: "coins/:coinId",
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
