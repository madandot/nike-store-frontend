import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getDiscountPricePercentage } from "../utils/helper";

getDiscountPricePercentage;
const ProductCard = ({ data: { attributes: p, id } }) => {
   return (
      <Link href={`/product/${p.slug}`} className=' hover:scale-105 transition overflow-hidden duration-200 cursor-pointer'>
         <Image width={500} height={500} src={p.thumbnail.data.attributes.url} alt={p.name} />
         <div className='p-4 text-black/[0.9]'>
            <h2 className='text-lg font-medium'>{p.name}</h2>
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
         </div>
      </Link>
   );
};

export default ProductCard;
