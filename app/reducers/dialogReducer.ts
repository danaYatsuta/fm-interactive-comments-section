export interface DialogState {
  confirmButtonText: string;
  heading: string;
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

type DialogAction =
  | {
      formType: "edit" | "reply";
      onConfirm: () => void;
      type: "open_discard_confirmation";
    }
  | {
      onConfirm: () => void;
      type: "open_comment_delete_confirmation";
    }
  | {
      type: "close";
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
    case "open_comment_delete_confirmation": {
      return {
        confirmButtonText: "Yes, delete",
        heading: "Delete comment",
        isOpen: true,
        message:
          "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
        onConfirm: action.onConfirm,
      };
    }
    case "open_discard_confirmation": {
      return {
        confirmButtonText: "Yes, discard",
        heading:
          action.formType === "edit" ? "Discard changes" : "Discard reply",
        isOpen: true,
        message:
          action.formType === "edit"
            ? "Are you sure you want to stop editing this comment? This will discard comment changes and can't be undone."
            : "Are you sure you want to stop writing a reply? This will discard the reply draft and can't be undone.",
        onConfirm: action.onConfirm,
      };
    }
  }
}
