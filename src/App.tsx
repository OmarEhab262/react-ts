import { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputList, productInformation } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const renderProductsList = productInformation.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const renderFormInputList = formInputList.map((input) => (
    <div className="flex flex-col">
      <label htmlFor={input.id}>{input.label}</label>
      <Input type="text" id={input.id} name={input.name} />
    </div>
  ));

  return (
    <main className="container ">
      <Button className="w-fit bg-green-500" onClick={openModal}>
        Add Product
      </Button>
      <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center ">
        {renderProductsList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
        {renderFormInputList}
        <div className="flex gap-2 ">
          <Button className="w-full bg-green-500">Submit</Button>
          <Button className="w-full bg-red-500">Cancel</Button>
        </div>
      </Modal>
    </main>
  );
}

export default App;
