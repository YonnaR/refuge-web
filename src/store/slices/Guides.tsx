import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGuideArticle } from '@/core/Guides/Guide';

export interface GuideState {
    currentQuery: string;
    isGuidesFetching: boolean;
    isGuideFetching: boolean;
    guides: Array<IGuideArticle>;
    guide: IGuideArticle | null;
}

export const initialState: GuideState = {
  currentQuery: '',
  isGuidesFetching: false,
  isGuideFetching: false,
  guides: [],
  guide: null,
};

export const GuideSlice = createSlice({
  name: 'guide',
  initialState,
  reducers: {
    mutateQuery(state, { payload }:PayloadAction<string>) {
      return {
        ...state,
        currentQuery: payload,
      };
    },
    /*
    removeToast(state, { payload }: PayloadAction<Toast>) {
      return {
        ...state,
        toasts: state.toasts.filter((el) => el.message !== payload.message),
      };
    },
    */
  },
});

export const { mutateQuery } = GuideSlice.actions;

export default GuideSlice.reducer;
