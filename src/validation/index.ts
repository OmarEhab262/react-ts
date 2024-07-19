export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };
  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Title must be between 10 and 80 characters";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description = "Description must be between 10 and 900 characters";
  }
  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Image URL is not valid";
  }

  if (
    !product.price.trim() ||
    isNaN(Number(product.price)) ||
    Number(product.price) < 0
  ) {
    errors.price = "Price must be a positive number";
  }

  if (product.colors.length === 0) {
    errors.colors = "Please select at least one color";
  }

  return errors;
};
