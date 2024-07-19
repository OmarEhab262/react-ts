import { useState } from "react";
import { IProduct } from "../interfaces";
import { textSlicer as textSlicer } from "../utils/function";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColor from "./CircleColor";

interface Iprops {
  product: IProduct;
}

const ProductCard = ({ product }: Iprops) => {
  const { colors } = product;

  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

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
        <span>$500,600</span>
        <Image
          imgUrl="https://stimg.cardekho.com/images/carexteriorimages/630x420/Ferrari/SF90-Stradale/7858/1591619661237/front-left-side-47.jpg?impolicy=resize&imwidth=480"
          alt="car"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-blue-500">EDIT</Button>
        <Button className="bg-red-500">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
