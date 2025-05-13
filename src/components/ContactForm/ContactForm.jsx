// src/components/ContactForm/ContactForm.jsx
import React, { useState } from 'react';

function ContactForm({ id }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    console.log('Form submitted:', formData);
    alert('Thank you for your message!'); // Placeholder feedback
  };

  // Updated input styles for "golden line" effect
  const inputClasses = `
    w-full 
    py-2 px-1 
    text-base 
    bg-transparent 
    border-b-2 
    border-gray-300 
    transition-colors 
    duration-300 
    ease-in-out 
    focus:outline-none 
    focus:border-b-[#B8860B] 
    focus:bg-white 
    placeholder-gray-500 
  `; // Added placeholder color, changed initial border to gray-300 for visibility

  const labelClasses = 'mb-1 font-bold text-sm text-gray-700 block'; // Reduced mb slightly

  return (
    <div className="py-12 md:py-2 font-sans bg-white">
      <section
        id={id}
        className="py-16 px-[5%] text-center bg-white max-w-[900px] my-16 mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#B8860B]">
          Get In Touch
        </h2>
        <p className="text-gray-700 mb-10 max-w-[600px] mx-auto">
          Use the form below to enquire about availability or ask us a question.
          We aim to reply within 48 hours.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 text-left" // Increased gap slightly for line inputs
        >
          <div className="flex flex-col md:flex-row gap-8">
            {' '}
            {/* Increased gap slightly */}
            <div className="flex-1 flex flex-col">
              <label htmlFor="firstName" className={labelClasses}>
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={inputClasses}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="lastName" className={labelClasses}>
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={inputClasses}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {' '}
            {/* Increased gap slightly */}
            <div className="flex-1 flex flex-col">
              <label htmlFor="email" className={labelClasses}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClasses}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="phone" className={labelClasses}>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {' '}
            {/* Increased gap slightly */}
            <div className="flex-1 flex flex-col">
              <label htmlFor="date" className={labelClasses}>
                Preferred Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="guests" className={labelClasses}>
                Number of Guests
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                placeholder="0"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className={labelClasses}>
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleChange}
              rows="4" // Adjusted rows for line style
              required
              className={`${inputClasses} resize-y`}
            ></textarea>
          </div>

          <button
            type="submit"
            className="self-center mt-6 py-3 px-8 text-lg font-bold bg-[#B8860B] text-white cursor-pointer transition-colors duration-300 ease-in-out rounded hover:bg-[#D4AF37] w-full sm:w-auto"
          >
            Send Enquiry
          </button>
        </form>
      </section>
    </div>
  );
}

export default ContactForm;
