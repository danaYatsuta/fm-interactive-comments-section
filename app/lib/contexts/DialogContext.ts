import { ActionDispatch, createContext } from "react";

import { DialogAction, DialogState } from "@/app/lib/reducers/dialogReducer";

export const DialogContext = createContext(
  {} as [DialogState, ActionDispatch<[action: DialogAction]>],
);
