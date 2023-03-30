import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { App } from "../../../../core/models";
import AppService from "../../../../core/services/app.service";
import { useAppSelector } from "../../../../core/store";
import {
  setModal,
  setModalType,
  setNotice,
  setTitle,
} from "../../../../core/store/reducers/modal/modalSlice";
import { windowModalType } from "../../../../core/types";
import FileSaver, { saveAs } from "file-saver";
import { useFormik } from "formik";

const ExportModal = () => {
  const { searchNum, articlesIds, title } = useAppSelector(
    (state) => state.modal
  );
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formikForm = useFormik<{
    userId: number;
    isSummary: boolean | string;
    articleIDs: number[];
  }>({
    initialValues: {
      userId: Number(currentUser?.userId),
      isSummary: "",
      articleIDs: articlesIds,
    },
    onSubmit: async (values: any) => {
      handleSubmitForm(values);
    },
  });

  const handleSubmitForm = async (values: App.ExportArticles) => {
    if (searchNum && formikForm.values.isSummary !== "") {
      try {
        const response = await AppService.exportCsv(searchNum, values);
        const newFile = new Blob([response.data], {
          type: "text/plain;charset=utf-8",
        });
        FileSaver.saveAs(newFile, `${title}.txt`);
      } catch (errors: any) {
        dispatch(setTitle("Success"));
        dispatch(setNotice("Cannot export!"));
        dispatch(setModalType(windowModalType.exportModal));
        dispatch(setModal());
      }
      dispatch(setModal());
    }
  };

  return (
    <div className="modal__container modal-details">
      <form className="modal-details__theme" onSubmit={formikForm.handleSubmit}>
        <div className="modal-details__theme-info theme-info">
          <h1 className="theme-info-title">Export</h1>
          <p className="theme-info-notice">
            Export summaries, requirements, or both, into CSV format.
          </p>
          <div className="theme-info-form export-form">
            <div className="export-form__item">
              <input
                type="radio"
                className="export-form__item-radio"
                name="export"
                onChange={() => formikForm.setFieldValue("isSummary", true)}
              />
              <span className="export-form__item-txt">Master summary</span>
            </div>
            <div className="export-form__item">
              <input
                type="radio"
                className="export-form__item-radio"
                name="export"
                onChange={() => formikForm.setFieldValue("isSummary", true)}
              />
              <span className="export-form__item-txt">All summaries</span>
            </div>
            <div className="export-form__item">
              <input
                type="radio"
                className="export-form__item-radio"
                name="export"
                onChange={() => formikForm.setFieldValue("isSummary", true)}
              />
              <span className="export-form__item-txt">All requirements</span>
            </div>
            <div className="export-form__item">
              <input
                type="radio"
                className="export-form__item-radio"
                name="export"
                onChange={() => formikForm.setFieldValue("isSummary", true)}
              />
              <span className="export-form__item-txt">Master summary</span>
            </div>
          </div>
        </div>
        <button type="submit" className="modal-details__theme-click">
          OK
        </button>
      </form>
    </div>
  );
};

export default ExportModal;
