"use client";

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import type { Store } from "redux";
import { persistor, store } from "@/redux/store";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store as Store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
}

export default Providers;
