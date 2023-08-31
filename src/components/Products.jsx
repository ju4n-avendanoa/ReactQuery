import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts, updateProduct } from "../api/productsAPI";

function Products() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Product deleted");
      queryClient.invalidateQueries("products");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  if (isLoading) <div>Loading...</div>;
  if (isError) <div>Error: {error.message} </div>;

  return (
    <div>
      <h2>Products</h2>
      {data?.map((product) => (
        <React.Fragment key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button onClick={() => deleteProductMutation.mutate(product.id)}>
            Delete
          </button>
          <input
            type="checkbox"
            id={product.id}
            checked={product.inStock}
            onChange={(e) => {
              updateProductMutation.mutate({
                ...product,
                inStock: e.target.checked,
              });
            }}
          />
          <label htmlFor={product.id}>In Stock</label>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Products;
