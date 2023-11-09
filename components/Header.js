import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Link from "next/link";
import Wrapper from "./Wrapper";
import MenuMobile from "./MenuMobile";
import { BsCart } from "react-icons/bs";
import { useSelector } from "react-redux";
import { IoMdHeartEmpty } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { fetchDataFromApi } from "../Utils/api";
import { VscChromeClose } from "react-icons/vsc";

const Header = () => {
   const [mobileMenu, setMobileMenu] = useState(false);
   const [showCatMenu, setShowCatMenu] = useState(false);
   const [show, setShow] = useState("translate-y-0");
   const [lastScrollY, setLastScrollY] = useState(0);
   const [categories, setCategories] = useState(null);

   const { cartItems } = useSelector((state) => state.cart);

   const controlNavbar = () => {
      if (window.screenY > 200) {
         if (window.screenY > lastScrollY && !mobileMenu) {
            setShow("-translate-y-[80px]");
         } else {
            setShow("shadow-sm");
         }
      } else {
         setShow("translate-y-0");
      }
      setLastScrollY(window.screenY);
   };
   useEffect(() => {
      window.addEventListener("scroll", controlNavbar);
      return () => {
         window.removeEventListener("scroll", controlNavbar);
      };
   }, [lastScrollY]);

   useEffect(() => {
      fetchCategories();
   }, []);
   const fetchCategories = async () => {
      const { data } = await fetchDataFromApi("/api/categories?populate=*");
      setCategories(data);
   };

   return (
      <header
         className={`w-full h-[50px] md:h-[80px] bg-white flex justify-between items-center 
    transition-transform duration-300 z-20 top-0 sticky ${show}
   `}
      >
         <Wrapper className='flex justify-between items-center h-[60px]f'>
            <Link href='/'>
               <img src='/logo.svg' alt='logo' className='w-[40px] md:[60px]' />
            </Link>
            <Menu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} categories={categories} />
            {mobileMenu && (
               <MenuMobile
                  showCatMenu={showCatMenu}
                  setShowCatMenu={setShowCatMenu}
                  setMobileMenu={setMobileMenu}
                  categories={categories}
               />
            )}
            <div className='flex gap-2 items-center text-black'>
               <div
                  className='flex justify-center items-center w-8 h-8 md:w-12 md:h-12 
               rounded-full bg-black/[0.05] cursor-pointer relative'
               >
                  <IoMdHeartEmpty className='text-[15px] md:text-[20px]' />
               </div>
               <Link href='/Cart'>
                  <div
                     className='flex justify-center items-center w-8 h-8 md:w-12 md:h-12 
               rounded-full bg-black/[0.05] cursor-pointer relative'
                  >
                     <BsCart className='text-[15px] md:text-[20px]' />
                     {cartItems.length > 0 && (
                        <div
                           className=' absolute left-6 top-0 h-[14px] text-center md:left-7 text-white text-[16px] md:text-[12px]
               md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 flex justify-center items-center px-2 md:px-3'
                        >
                           {cartItems.length}
                        </div>
                     )}
                  </div>
               </Link>
               <div
                  className='flex md:hidden justify-center items-center w-8 h-8 md:w-12 md:h-12 
               rounded-full bg-black/[0.05] cursor-pointer relative'
               >
                  {mobileMenu ? (
                     <VscChromeClose className='text-[16px] ' onClick={() => setMobileMenu(false)} />
                  ) : (
                     <BiMenuAltRight className='text-[16px] ' onClick={() => setMobileMenu(true)} />
                  )}
               </div>
            </div>
         </Wrapper>
      </header>
   );
};

export default Header;
