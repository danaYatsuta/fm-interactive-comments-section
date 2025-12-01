export type DialogAction =
  | {
      dialogType: DialogType;
      onConfirm: () => void;
      type: "open";
    }
  | {
      type: "close";
    };

export interface DialogState {
  confirmButtonText: string;
  heading: string;
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

export type DialogType = "delete_comment" | "discard_edit" | "discard_reply";

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

export default function dialogReducer(
  state: DialogState,
  action: DialogAction,
): DialogState {
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
