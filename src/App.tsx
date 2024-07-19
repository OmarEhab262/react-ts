import { FormEvent, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputList, productInformation } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import uuid from "react-uuid";
import SelectMenu from "./components/ui/Select";
import { ProductName } from "./types";

function App() {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  const [products, setProducts] = useState<IProduct[]>(productInformation);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenConfirmRemove, setIsOpenConfirmRemove] = useState(false);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  //   console.log("productToEditIdx: ", productToEditIdx);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openEditModal = () => {
    setIsOpenEdit(true);
  };

  const closeEditModal = () => {
    setIsOpenEdit(false);
  };
  const closeConfirmRemoveModal = () => {
    setIsOpenConfirmRemove(false);
  };

  const openConfirmRemoveModal = () => {
    setIsOpenConfirmRemove(true);
  };
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: tempColors,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    console.log("hasErrorMsg: ", hasErrorMsg);
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    closeEditModal();
  };

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { title, description, imageURL, price } = productToEdit;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors,
    });

    const hasErrorMsg = Object.values(errors).some((value) => value !== "");
    console.log("hasErrorMsg: ", hasErrorMsg);
    if (hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };

    setProducts(updatedProducts);
    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEditModal();
  };

  const onCancel = () => {
    setProduct(defaultProductObj);
    closeModal();
  };

  const renderProductsList = products.map((product, inx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      setProductToEditIdx={setProductToEditIdx}
      idx={inx}
    />
  ));

  const renderFormInputList = formInputList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id}>{input.label}</label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={product[input.name] || ""}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (productToEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((c) => c !== color));
          return;
        }

        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((c) => c !== color));
          return;
        }
        setTempColors((prev) => [color, ...prev]);
      }}
    />
  ));
  const renderEditFormInputList = (
    id: string,
    label: string,
    name: ProductName
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id}>{label}</label>
        <Input
          type={"text"}
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  return (
    <main className="container">
      <div className="w-[200px] my-[20px] ml-2">
        <Button className=" bg-green-500" onClick={openModal} width="w-fit">
          Add Product
        </Button>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center">
        {renderProductsList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
        <form className="space-y-3" onSubmit={handleSubmit}>
          {renderFormInputList}
          <SelectMenu
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center gap-2 my-2 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex items-center gap-2 my-2 flex-wrap">
            {tempColors.map((color) => (
              <span
                key={color}
                className={`text-white w-fit p-1 rounded-md`}
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
            <ErrorMessage msg={errors.colors} />
          </div>

          <div className="flex gap-2">
            <Button className="w-full bg-green-500" type="submit">
              Submit
            </Button>
            <Button
              className="w-full bg-red-500"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isOpenEdit}
        closeModal={closeEditModal}
        title="Edit Product"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderEditFormInputList("title", "Product title", "title")}
          {renderEditFormInputList(
            "description",
            "Product description",
            "description"
          )}
          {renderEditFormInputList("imageURL", "Product image URL", "imageURL")}
          {renderEditFormInputList("price", "Product price", "price")}
          <SelectMenu
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex items-center gap-2 my-2 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex items-center gap-2 my-2 flex-wrap">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className={`text-white w-fit p-1 rounded-md`}
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
            <ErrorMessage msg={errors.colors} />
          </div>
          <div className="flex gap-2">
            <Button className="w-full bg-green-500" type="submit">
              Save Changes
            </Button>
            <Button
              className="w-full bg-red-500"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isOpenConfirmRemove}
        closeModal={closeConfirmRemoveModal}
        title="Are you sure you want to delete this product?"
      >
        <div className="flex items-center space-x-3">
          <Button
            className="w-full bg-red-500"
            type="button"
            // onClick={}
          >
            Yes, Remove
          </Button>
          <Button
            className="w-full bg-green-500"
            type="button"
            onClick={closeConfirmRemoveModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default App;
