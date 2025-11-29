import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster
            position="bottom-left"
            reverseOrder={false}
            containerStyle={{ zIndex: 9999999 }}
          />
        </QueryClientProvider>
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
);
