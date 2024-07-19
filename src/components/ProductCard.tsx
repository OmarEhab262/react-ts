import { useState } from "react";
import { IProduct } from "../interfaces";
import { textSlicer as textSlicer } from "../utils/function";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColor from "./CircleColor";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface Iprops {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  setProductToEditIdx: (value: number) => void;
  idx: number;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  setProductToEditIdx,
  idx,
}: Iprops) => {
  const { colors } = product;

  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenRemove = () => {
    setIsOpen(true);
  };

  const handleCloseRemove = () => {
    setIsOpen(false);
  };
  const onRemove = () => {
    openConfirmRemoveModal();
  };
  const [allDescription, setAllDescription] = useState(true);
  return (
    <div className="max-w-sm md:max-w-lg border rounded-md p-2 flex flex-col m-2">
      <Image
        imgUrl={product.imageURL}
        alt="car"
        className="rounded-md mb-3 w-full h-52 lg:object-cover"
      />

      <h3>{product.title} </h3>
      <p
        onClick={() => setAllDescription(!allDescription)}
        className="cursor-pointer w-full"
      >
        {allDescription
          ? textSlicer(product.description)
          : textSlicer(product.description, 150)}
      </p>
      <div className="flex items-center gap-2 my-2 flex-wrap">
        {renderProductColors}
      </div>

      <div className="flex items-center justify-between">
        <span>${product.price}</span>
        <div className="flex gap-3 items-center">
          <span>{product.category.name}</span>
          <Image
            imgUrl={product.category.imageURL}
            alt="car"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-blue-500" onClick={onEdit}>
          EDIT
        </Button>
        <Button className="bg-red-500" onClick={handleOpenRemove}>
          DELETE
        </Button>
      </div>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleCloseRemove}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-600 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Are you sure you want to remove this Product from your Store?
              </DialogTitle>
              {/* <p className="mt-2 text-sm/6 text-white/50">
                Your payment has been successfully submitted. We’ve sent you an
                email with all of the details of your order.
              </p> */}
              <div className="mt-4 flex space-x-2">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={onRemove}
                >
                  Remove
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-300 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleCloseRemove}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductCard;
