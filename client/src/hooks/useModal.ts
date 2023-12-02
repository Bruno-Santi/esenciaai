import { useState } from "react";

interface ModalState {
  isOpen: boolean;
  modalType:
    | string
    | null;
}

interface ModalActions {
  openModal: (
    modalType: string
  ) => void;
  closeModal: () => void;
}

interface ModalHook
  extends ModalState,
    ModalActions {}

export const useModal =
  (): ModalHook => {
    const [
      modalState,
      setModalState,
    ] =
      useState<ModalState>(
        {
          isOpen:
            false,
          modalType:
            null,
        }
      );

    const openModal =
      (
        modalType: string
      ) => {
        setModalState(
          {
            isOpen:
              true,
            modalType:
              modalType,
          }
        );
      };

    const closeModal =
      () => {
        setModalState(
          {
            isOpen:
              false,
            modalType:
              null,
          }
        );
      };

    return {
      ...modalState,
      openModal,
      closeModal,
    };
  };

export default useModal;
