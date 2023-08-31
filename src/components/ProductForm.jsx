import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsAPI";

function ProductForm() {
  const queryClient = useQueryClient();

  const addProduct = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    addProduct.mutate({
      ...product,
      inStock: true,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" />
        <label htmlFor="price">Price</label>
        <input type="text" id="price" name="price" />
        <button>Add Product</button>
      </form>
    </div>
  );
}

export default ProductForm;
