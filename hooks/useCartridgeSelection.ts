"use client";

import { useCallback, useState } from "react";

import { ProjectMetaData } from "@/lib/types/project";
import { useOpenItem } from "@/hooks/useOpenItem";

/*
  Which project window is open on the Projects / Games pages: opened by a card
  click or by the command line's `open <name>` (via useOpenItem). `items` should
  be a module-level constant so the callbacks stay stable.
*/
export function useCartridgeSelection(items: ProjectMetaData[]) {
  const [selected, setSelected] = useState<ProjectMetaData | null>(null);

  useOpenItem(
    useCallback(
      (id: string) => setSelected(items.find((item) => String(item.id) === id) ?? null),
      [items],
    ),
  );

  const close = useCallback(() => setSelected(null), []);

  return { selected, open: setSelected, close };
}
