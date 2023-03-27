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
import { useFormik } from "formik";

const ExportModal = () => {
  const { searchNum, articlesIds } = useAppSelector((state) => state.modal);
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
        console.log(response.data);
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
      <div className="modal-details__theme">
        <div className="modal-details__theme-info theme-info">
          <h1 className="theme-info-title">Export</h1>
          <p className="theme-info-notice">
            Export summaries, requirements, or both, into CSV format.
          </p>
          <form
            className="theme-info-list export-list"
            onSubmit={formikForm.handleSubmit}
          >
            <div className="export-list__item">
              <input
                type="radio"
                className="export-list__item-radio"
                name="export"
                onChange={() => formikForm.setFieldValue("isSummary", true)}
              />
              <span className="export-list__item-txt">Master summary</span>
            </div>
            <div className="export-list__item">
              <input
                type="radio"
                className="export-list__item-radio"
                name="export"
                onChange={() => formikForm.setFieldValue("isSummary", true)}
              />
              <span className="export-list__item-txt">All summaries</span>
            </div>
            <div className="export-list__item">
              <input
                type="radio"
                className="export-list__item-radio"
                name="export"
                onChange={() => formikForm.setFieldValue("isSummary", true)}
              />
              <span className="export-list__item-txt">All requirements</span>
            </div>
            <div className="export-list__item">
              <input
                type="radio"
                className="export-list__item-radio"
                name="export"
                onChange={() => formikForm.setFieldValue("isSummary", true)}
              />
              <span className="export-list__item-txt">Master summary</span>
            </div>
            <button type="submit" className="modal-details__theme-click">
              OK
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
