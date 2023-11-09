// components/ContactForm.js
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactForm = () => {
   const initialValues = {
      name: "",
      email: "",
      message: "",
   };

   const validationSchema = Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      message: Yup.string().required("Message is required"),
   });

   const onSubmit = (values, { resetForm, setSubmitting }) => {
      // Simulate API request or other async operations
      setTimeout(() => {
         // Handle the form submission logic (e.g., send data to server)

         // Display success message
         alert("Form submitted successfully!");

         // Reset form and setSubmitting to false
         resetForm();
         setSubmitting(false);
      }, 1000);
   };

   return (
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
         {({ isSubmitting }) => (
            <Form className='max-w-md mx-auto'>
               <div className='mb-4'>
                  <label htmlFor='name'>Name:</label>
                  <Field
                     type='text'
                     id='name'
                     name='name'
                     className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500'
                  />
                  <ErrorMessage name='name' component='div' className='text-red-500 text-sm' />
               </div>

               <div className='mb-4'>
                  <label htmlFor='email'>Email:</label>
                  <Field
                     type='email'
                     id='email'
                     name='email'
                     className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500'
                  />
                  <ErrorMessage name='email' component='div' className='text-red-500 text-sm' />
               </div>

               <div className='mb-4'>
                  <label htmlFor='message'>Message:</label>
                  <Field
                     as='textarea'
                     id='message'
                     name='message'
                     rows='4'
                     className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500'
                  />
                  <ErrorMessage name='message' component='div' className='text-red-500 text-sm' />
               </div>

               <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none'
                  disabled={isSubmitting}
               >
                  {isSubmitting ? "Submitting..." : "Submit"}
               </button>
            </Form>
         )}
      </Formik>
   );
};

export default ContactForm;
