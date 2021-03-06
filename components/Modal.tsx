/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, SetStateAction } from "react";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";
import Input from "./Input";

export type ModalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onCreate: () => void;
};

const Modal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  onCreate,
  children,
}) => {
  if (showModal) {
    return (
      <div
        className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
        id="modal-id"
      >
        <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
          <div className="w-full">{children}</div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button
              className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
              onClick={() => setShowModal((prev) => !prev)}
            >
              Cancel
            </button>
            <button
              className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
              onClick={onCreate}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Modal;
