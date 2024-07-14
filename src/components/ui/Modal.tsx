import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
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
      <Button
        // onClick={openModal}
        className="rounded-md bg-black/70 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/60 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Open dialog
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/30 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
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
