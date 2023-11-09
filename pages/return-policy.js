// pages/return-policy.js
import React, { useState } from "react";

const ReturnPolicy = () => {
   const [feedbackReason, setFeedbackReason] = useState("");
   const [additionalComments, setAdditionalComments] = useState("");
   const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
   const [error, setError] = useState("");

   const handleReasonChange = (event) => {
      setFeedbackReason(event.target.value);
   };

   const handleCommentsChange = (event) => {
      setAdditionalComments(event.target.value);
   };

   const handleSubmit = (event) => {
      event.preventDefault();

      // Check if feedback reason is selected
      if (!feedbackReason) {
         setError("Please select a feedback reason before submitting.");
         return;
      }

      // Add logic to handle the feedback submission (e.g., send to server, store in a database)
      console.log("Feedback submitted:", { feedbackReason, additionalComments });

      // Assume successful submission for demonstration purposes
      setIsFeedbackSubmitted(true);

      // Clear the error, textarea, and dropdown
      setError("");
      setFeedbackReason("");
      setAdditionalComments("");
   };

   const feedbackReasons = ["Product not as described", "Wrong item received", "Product damaged", "Changed mind", "Other"];

   return (
      <div className='container mx-auto p-8'>
         <h1 className='text-3xl font-bold mb-6'>Return Policy</h1>

         <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>

         <p className='mb-4'>Proin commodo arcu auctor, iaculis felis eu, tristique massa. ...</p>

         {/* Feedback Form */}
         <form onSubmit={handleSubmit} className='mt-8'>
            <label className='block mb-2 text-lg'>Why are you returning the product?</label>
            <select value={feedbackReason} onChange={handleReasonChange} className='w-full border border-gray-300 rounded-md p-2'>
               <option value='' disabled>
                  Select a reason
               </option>
               {feedbackReasons.map((reason) => (
                  <option key={reason} value={reason}>
                     {reason}
                  </option>
               ))}
            </select>

            <label className='block mt-4 mb-2 text-lg'>Additional Comments:</label>
            <textarea
               value={additionalComments}
               onChange={handleCommentsChange}
               rows='4'
               className='w-full border border-gray-300 rounded-md p-2'
               placeholder='Please provide additional comments...'
            ></textarea>

            <button type='submit' className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
               Submit Feedback
            </button>
            {error && <p className='text-red-600 font-bold mb-4'>{error}</p>}

            {isFeedbackSubmitted && <p className='text-green-600 font-bold mb-4'>Your feedback has been submitted successfully!</p>}
         </form>
      </div>
   );
};

export default ReturnPolicy;
