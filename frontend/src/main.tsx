import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
// import AppCont // Add this line - this line is incomplete, complete it or remove it

import "@/styles/index.css";

import { QueryClient, QueryClientProvider } from "react-query";

import { AppContextProvider } from "./contexts/AppContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
