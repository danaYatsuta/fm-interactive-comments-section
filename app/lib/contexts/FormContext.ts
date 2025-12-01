import { ActionDispatch, createContext } from "react";

import { FormAction, FormState } from "@/app/lib/reducers/formReducer";

export const FormContext = createContext(
  {} as [FormState, ActionDispatch<[action: FormAction]>],
);
