import React from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../../../core/store/reducers/modal/modalSlice";

type Props = {
  title: string;
  notice: string;
};

const NotificationModal: React.FC<Props> = ({ title, notice }) => {
  const dispatch = useDispatch();

  return (
    <div className="modal__container modal-details">
      <div className="modal-details__theme">
        <div className="modal-details__theme-info theme-info">
          <h1 className="theme-info-title">{title}</h1>
          <p className="theme-info-notice">{notice}</p>
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

export default NotificationModal;
