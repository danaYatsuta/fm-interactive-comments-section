import { createContext, useReducer } from "react";

export const DialogContext = createContext(
  {} as [DialogState, React.ActionDispatch<[action: DialogAction]>],
);

type DialogAction =
  | {
      dialogType: DialogType;
      onConfirm: () => void;
      type: "open";
    }
  | {
      type: "close";
    };

interface DialogState {
  confirmButtonText: string;
  heading: string;
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

type DialogType = "delete_comment" | "discard_edit" | "discard_reply";

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, {
    confirmButtonText: "",
    heading: "",
    isOpen: false,
    message: "",
    onConfirm: () => {},
  });

  return (
    <DialogContext value={[dialogState, dialogDispatch]}>
      {children}
    </DialogContext>
  );
}

const confirmButtonTexts: Record<DialogType, string> = {
  delete_comment: "Yes, delete",
  discard_edit: "Yes, discard",
  discard_reply: "Yes, discard",
};

const headings: Record<DialogType, string> = {
  delete_comment: "Delete comment",
  discard_edit: "Discard changes",
  discard_reply: "Discard reply",
};

const messages: Record<DialogType, string> = {
  delete_comment:
    "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
  discard_edit:
    "Are you sure you want to stop editing this comment? This will discard comment changes and can't be undone.",
  discard_reply:
    "Are you sure you want to stop writing a reply? This will discard the reply draft and can't be undone.",
};

function dialogReducer(state: DialogState, action: DialogAction): DialogState {
  switch (action.type) {
    case "close": {
      return {
        ...state,
        isOpen: false,
      };
    }

    case "open": {
      return {
        confirmButtonText: confirmButtonTexts[action.dialogType],
        heading: headings[action.dialogType],
        isOpen: true,
        message: messages[action.dialogType],
        onConfirm: action.onConfirm,
      };
    }
  }
}
