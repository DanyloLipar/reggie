import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../core/store";
import { setModal } from "../../core/store/reducers/modal/modalSlice";
import { windowModalType } from "../../core/types";
import ExportModal from "./Modals/ExportModal";
import NotificationModal from "./Modals/NotificationModal";

const ModalWindow = () => {
  const { modal, modalType, title, notice } = useAppSelector(
    (state) => state.modal
  );

  const dispatch = useDispatch();

  return (
    <div
      className={classNames({
        modal: true,
        "modal-active": modal,
      })}
    >
      <div
        className="modal__bg"
        onClick={() => {
          dispatch(setModal());
          document.body.style.overflowY = "scroll";
        }}
      ></div>
      {modalType === windowModalType.notificationModal && (
        <NotificationModal title={title} notice={notice} />
      )}
      {modalType === windowModalType.exportModal && <ExportModal />}
    </div>
  );
};

export default ModalWindow;
