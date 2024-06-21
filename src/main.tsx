import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import DataProvider from "./provider/LocalDataProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DataProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </DataProvider>
);
