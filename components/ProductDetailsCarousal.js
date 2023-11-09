import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const ProductDetailsCarousal = ({ images }) => {
   return (
      <div>
         <Carousel infiniteLoop={true} showIndicators={false} showStatus={false} thumbWidth={60} className='productCarousel'>
            {images?.map((img) => (
               <img key={img.id} src={img.attributes.url} alt={img.attributes.name} />
            ))}
         </Carousel>
      </div>
   );
};

export default ProductDetailsCarousal;
