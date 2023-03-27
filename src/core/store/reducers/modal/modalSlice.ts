import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { App } from "../../../models";
import { Modal } from "./type";

const state: Modal = {
  modal: false,
  modalType: 0,
  title: "",
  notice: "",
  searchNum: null,
  articlesIds: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState: state,
  reducers: {
    setModal(state) {
      state.modal = !state.modal;
    },
    setModalType(state, action: PayloadAction<number>) {
      state.modalType = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setNotice(state, action: PayloadAction<string>) {
      state.notice = action.payload;
    },
    setSearchNum(state, action: PayloadAction<number>) {
      state.searchNum = action.payload;
    },
    setArticlesIds(state, action: PayloadAction<number[]>) {
      state.articlesIds = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const {
  setModal,
  setModalType,
  setTitle,
  setNotice,
  setSearchNum,
  setArticlesIds,
} = modalSlice.actions;
