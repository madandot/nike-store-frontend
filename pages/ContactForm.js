// pages/contact.js
import React from "react";
import ContactForm from "../components/ContactForm";

const ContactPage = () => {
   return (
      <div className='container mx-auto p-8'>
         <h1 className='text-3xl font-bold mb-6'>Contact Us</h1>
         <ContactForm />
      </div>
   );
};

export default ContactPage;
