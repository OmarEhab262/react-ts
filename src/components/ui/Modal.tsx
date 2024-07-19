import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
// import { useState } from "react";

interface Iprops {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, closeModal, title, children }: Iprops) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
        __demoMode
      >
        <div className="fixed inset-0 z-10 backdrop-blur-sm w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-200 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {title && (
                <DialogTitle className="text-xl font-semibold">
                  {title}
                </DialogTitle>
              )}

              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
