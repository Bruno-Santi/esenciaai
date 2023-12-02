import { IoMdClose } from "react-icons/io";
import { Modal } from "../layaout";
import { CiCirclePlus } from "react-icons/ci";
import React, {
  useState,
} from "react";
import { MembersTable } from "./MembersTable";
import { useDashboard } from "../hooks/useDashboard";
import { AddMemberModal } from "./AddMemberModal";

export const ModalMembers: React.FC<{
  closeModal: () => void;
}> = ({
  closeModal,
}) => {
  const {
    membersActiveTeam,
    activeTeam,
  } =
    useDashboard();
  const [
    addMember,
    setAddMember,
  ] =
    useState(false);
  const toggleAddMember =
    () =>
      setAddMember(
        !addMember
      );
  return (
    <Modal>
      <div
        className="text-5xl text-primary/60 cursor-pointer absolute right-4 top-4 duration-700 hover:text-secondary "
        onClick={
          closeModal
        }
      >
        <IoMdClose />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-poppins ">
          {
            activeTeam.name
          }{" "}
          Members
        </div>
        <div
          onClick={
            toggleAddMember
          }
          className="btn-primary flex w-fit text-xl  mt-4 p-2 rounded-md cursor-pointer duration-700 font-poppins hover:bg-tertiary hover:text-primary"
        >
          Add{" "}
          <i className="text-3xl ml-2 my-auto">
            <CiCirclePlus />
          </i>
        </div>
        {addMember && (
          <AddMemberModal
            closeAddMember={
              toggleAddMember
            }
          />
        )}
        {membersActiveTeam.length ? (
          <MembersTable />
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
};
