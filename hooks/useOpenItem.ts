"use client";

import { useEffect } from "react";
import { OPEN_ITEM_EVENT } from "@/lib/commandEvents";

/*
  Lets the command line open a project window: `open <name>` either fires an
  event (already on the right page) or navigates here with `?open=<id>`.
*/
export function useOpenItem(onOpen: (id: string) => void) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("open");
    if (fromUrl) {
      onOpen(fromUrl);
      params.delete("open");
      const query = params.toString();
      window.history.replaceState(null, "", window.location.pathname + (query ? `?${query}` : ""));
    }

    const onEvent = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (id) onOpen(id);
    };
    window.addEventListener(OPEN_ITEM_EVENT, onEvent);
    return () => window.removeEventListener(OPEN_ITEM_EVENT, onEvent);
  }, [onOpen]);
}
