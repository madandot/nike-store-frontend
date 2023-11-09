import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { addToCart } from "../../store/cartSlice";
import { fetchDataFromApi } from "../../Utils/api";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getDiscountPricePercentage } from "../../utils/helper";
import ReactMarkdown from "react-markdown";
import Wrapper from "../../components/Wrapper";
import "react-toastify/dist/ReactToastify.css";
import RelatedProduct from "../../components/RelatedProduct";
import ProductDetailsCarousal from "../../components/ProductDetailsCarousal";

const ProductDetails = ({ product, products }) => {
   const [selectedSize, setSelectedSize] = useState();
   const [showError, setShoeError] = useState(false);
   const dispatch = useDispatch();
   const notify = () => {
      toast.success("🦄 Success. check your cart!", {
         position: "bottom-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "dark",
      });
   };
   const p = product?.data?.[0]?.attributes;
   return (
      <div className='w-full md:py-20'>
         <ToastContainer />
         <Wrapper>
            <div className='flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]'>
               <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0'>
                  <ProductDetailsCarousal images={p.image.data} />
               </div>
               <div className='flex-[1] py-3'>
                  <div className='text-[32px] font-semibold mb-2 leading-tight'>{p.name}</div>
                  <div className='text-lg font-semibold mb-5'>{p.subtitle}</div>
                  <div className='flex items-center text-black/[0.5]'>
                     <p className='mr-2 text-lg font-semibold'>&#8377;{p.price}</p>
                     {p.original_price && (
                        <>
                           <p className='mr-2 text-lg font-semibold line-through'>&#8377;{p.original_price}</p>
                           <p
                              className='ml-auto text-base font-medium
                      text-green-500'
                           >
                              {getDiscountPricePercentage(p.original_price, p.price)}%off
                           </p>
                        </>
                     )}
                  </div>
                  <div className='text-md font-medium text-black/[0.5]'>incl. of Taxes</div>
                  <div className='text-md font-medium text-black/[0.5] mb-20 '>{`(Also includes all applicable duties)`}</div>
                  <div className='mb-10'>
                     <div className='flex justify-between mb-2'>
                        <div className='text-md font-semibold'>Select Size</div>
                        <div className='text-md font-medium text-black/[0.5] cursor-pointer'>Select Guide</div>
                     </div>
                     <div id='sizesGrid' className='grid grid-cols-3 gap-2'>
                        {p.size.data.map((item, i) => (
                           <div
                              onClick={() => {
                                 setSelectedSize(item.size);
                                 setShoeError(false);
                              }}
                              key={i}
                              className={`border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer ${
                                 item.enabled ? "hover:border-black" : "cursor-not-allowed bg-black/[0.1] opacity-50"
                              } ${selectedSize === item.size ? "border-black" : ""} `}
                           >
                              {item.size}
                           </div>
                        ))}
                     </div>
                     {showError && <div className='text-red-600 mt-1'>Size selection is required</div>}
                  </div>
                  <button
                     className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform
                   active:scale-95 mb-3  flex items-center justify-center cursor-pointer hover:scale-105'
                     onClick={() => {
                        if (!selectedSize) {
                           setShoeError(true);
                           document.getElementById("sizesGrid").scrollIntoView({ block: "center", behavior: "smooth" });
                        } else {
                           dispatch(addToCart({ ...product?.data?.[0], selectedSize, oneQuantityPrice: p.price }));
                           notify();
                        }
                     }}
                  >
                     Add to Cart
                  </button>
                  <button
                     className='w-full py-4 rounded-full border border-black text-lg font-medium transition-transform
                   active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10 cursor-pointer hover:scale-105'
                  >
                     WhishList
                     <IoMdHeartEmpty size={20} />
                  </button>
                  <div>
                     <div className='text-lg font-bold mb-5'>Product Details</div>
                     <div className='markdown text-md mb-5'>
                        <ReactMarkdown>{p.description}</ReactMarkdown>
                     </div>
                  </div>
               </div>
            </div>
            <RelatedProduct products={products} />
         </Wrapper>
      </div>
   );
};

export default ProductDetails;

export async function getStaticPaths() {
   const products = await fetchDataFromApi("/api/products?populate=*");

   const paths = products.data.map((p) => ({
      params: {
         slug: p.attributes.slug,
      },
   }));
   return {
      paths,
      fallback: false,
   };
}
export async function getStaticProps({ params: { slug } }) {
   const product = await fetchDataFromApi(`/api/products?populate=*&filters[slug][$eq]=${slug}`);
   const products = await fetchDataFromApi(`/api/products?populate=*&[filters][slug][$ne]=${slug}`);

   return {
      props: {
         product,
         products,
      },
   };
}
