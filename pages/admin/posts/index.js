import ProductForm from "../components/Productform";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { createProduct } from "../../../api/products";


const CreateProduct = () => {
    const [product, setProduct] = useState({});
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate } = useMutation(createProduct, {
        onSuccess: () => {
        queryClient.invalidateQueries("products");
        router.push("/admin/products");
        },
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
        ...prev,
        [name]: value,
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(product);
    };
    
    return (
        <div>
        <h1>Create Product</h1>
        <ProductForm
            product={product}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
        </div>
    );
    };


export default CreateProduct;

