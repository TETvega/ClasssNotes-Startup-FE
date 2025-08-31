import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ClassNotesRouter } from "./routes/ClassNotesRouter.jsx";
import { TailwindIndicator } from "./shared/components/others/TailwindIndicator.jsx";
import { ScrollToTop } from "./shared/components/ScrollToTop.jsx";
import { TabTitle } from "./shared/components/TabTitle.jsx";
import { appName } from "./shared/constants/appName.js";
import 'react-tooltip/dist/react-tooltip.css'
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
       <TabTitle title={appName} />
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <ClassNotesRouter />
          <TailwindIndicator />
        </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);