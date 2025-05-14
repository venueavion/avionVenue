import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Add this temporarily to your ContactForm component
  useEffect(() => {
    console.log({
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      userId: import.meta.env.VITE_EMAILJS_USER_ID,
      recipient: import.meta.env.VITE_RECIPIENT_EMAIL,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // Basic validation
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        throw new Error('First and last name are required');
      }

      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        throw new Error('Please enter a valid email');
      }

      // Send email via EmailJS
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          event_date: formData.date || 'Not specified',
          guest_count: formData.guests || 'Not specified',
          message: formData.message,
          to_email: import.meta.env.VITE_RECIPIENT_EMAIL,
          submission_time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      console.log('EmailJS response:', response);

      // Success handling
      setFormData({
        /* reset form */
      });
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Full error:', {
        message: error.message,
        text: error.text,
        response: error.response,
      });
      setSubmitError(error.text || error.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styled components
  const inputClasses = `
    w-full py-2 px-1 text-base bg-transparent
    border-b-2 border-gray-300 transition-colors
    duration-300 ease-in-out focus:outline-none
    focus:border-b-[#B8860B] focus:bg-white
    placeholder-gray-500 disabled:opacity-50
  `;

  const labelClasses = 'mb-1 font-bold text-sm text-gray-700 block';

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

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            Thank you! Your message has been sent successfully.
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-left">
          {/* Name Fields */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col">
              <label htmlFor="firstName" className={labelClasses}>
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={inputClasses}
                disabled={isSubmitting}
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
                value={formData.lastName}
                onChange={handleChange}
                required
                className={inputClasses}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col">
              <label htmlFor="email" className={labelClasses}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClasses}
                disabled={isSubmitting}
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
                value={formData.phone}
                onChange={handleChange}
                className={inputClasses}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Event Fields */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col">
              <label htmlFor="date" className={labelClasses}>
                Event Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClasses}
                disabled={isSubmitting}
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
                value={formData.guests}
                onChange={handleChange}
                min="1"
                className={inputClasses}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="flex flex-col">
            <label htmlFor="message" className={labelClasses}>
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className={`${inputClasses} resize-y min-h-[100px]`}
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              self-center mt-6 py-3 px-8 text-lg font-bold
              bg-[#B8860B] text-white rounded hover:bg-[#D4AF37]
              transition-colors duration-300 w-full sm:w-auto
              ${
                isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'cursor-pointer'
              }
              flex items-center justify-center gap-2
            `}
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </>
            ) : (
              'Send Enquiry'
            )}
          </button>
        </form>
      </section>
    </div>
  );
}

export default ContactForm;
