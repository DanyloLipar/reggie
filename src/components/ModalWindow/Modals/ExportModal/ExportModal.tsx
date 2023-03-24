import React from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../../../core/store/reducers/modal/modalSlice";

const ExportModal = () => {
  const dispatch = useDispatch();

  return (
    <div className="modal__container modal-details">
      <div className="modal-details__theme">
        <div className="modal-details__theme-info theme-info">
          <h1 className="theme-info-title">Export</h1>
          <p className="theme-info-notice">
            Export summaries, requirements, or both, into CSV format.
          </p>
          <ul className="theme-info-list export-list">
            <li className="export-list__item">
              <input
                type="radio"
                className="export-list__item-radio"
                name="export"
              />
              <span className="export-list__item-txt">Master summary</span>
            </li>
            <li className="export-list__item">
              <input
                type="radio"
                className="export-list__item-radio"
                name="export"
              />
              <span className="export-list__item-txt">All summaries</span>
            </li>
            <li className="export-list__item">
              <input
                type="radio"
                className="export-list__item-radio"
                name="export"
              />
              <span className="export-list__item-txt">All requirements</span>
            </li>
            <li className="export-list__item">
              <input
                type="radio"
                className="export-list__item-radio"
                name="export"
              />
              <span className="export-list__item-txt">Master summary</span>
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            dispatch(setModal());
          }}
          className="modal-details__theme-click"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ExportModal;
