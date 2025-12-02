export type FormAction =
  | {
      commentContent: string;
      commentId: number;
      type: "open_edit";
    }
  | {
      commentId: number;
      type: "open_reply";
    }
  | { textAreaValue: string; type: "change_text_area_value" }
  | {
      type: "close";
    };

export type FormState = FormStateBase &
  ({ commentContent: string; type: "edit" } | { type: "reply" | null });

interface FormStateBase {
  commentId: null | number;
  textAreaValue: string;
}

export default function formReducer(
  state: FormState,
  action: FormAction,
): FormState {
  switch (action.type) {
    case "change_text_area_value": {
      return {
        ...state,
        textAreaValue: action.textAreaValue,
      };
    }

    case "close": {
      return { commentId: null, textAreaValue: "", type: null };
    }

    case "open_edit": {
      return {
        commentContent: action.commentContent,
        commentId: action.commentId,
        textAreaValue: action.commentContent,
        type: "edit",
      };
    }

    case "open_reply": {
      return { commentId: action.commentId, textAreaValue: "", type: "reply" };
    }
  }
}
