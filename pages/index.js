import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import Wrapper from "../components/Wrapper";
import Footer from "../components/Footer";
import { fetchDataFromApi } from "../Utils/api";

export default function Home({ products }) {
   return (
      <main className='h-[200px]'>
         <HeroBanner />
         <Wrapper>
            <div className='text-center max-w-[800px] mx-auto my-12 md:my-20'>
               <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>Padded Support for Your Journey</div>
               <div className='text-md md:text-xl'>
                  To support runners during extended stretches, a lightweight Nike ZoomX midsole is matched with increased stack heights to
                  provide cushioning.
               </div>
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0'>
               {products?.data?.map((product) => (
                  <ProductCard key={product?.id} data={product} />
               ))}
            </div>
         </Wrapper>
         <Footer />
      </main>
   );
}

export async function getStaticProps() {
   const products = await fetchDataFromApi("/api/products?populate=*");
   return {
      props: { products },
   };
}
