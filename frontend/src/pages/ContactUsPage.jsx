import { useState } from 'react';

const ContactUs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We connect customers with a wide range of service providers across various categories, including home services, events, and more."
    },
    {
      question: "How can I become a service provider?",
      answer: "To become a service provider, please fill out the registration form on our website and provide the necessary documentation."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our customer support via the contact form above or through our support email: support@example.com."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods, including credit/debit cards and online payment systems. More details are provided during checkout."
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-700">Get in Touch</h1>
        <p className="mt-2 text-lg text-purple-400">We are here to help you connect with the right service provider.</p>
      </header>

      {/* Contact Information */}
      <section className="mb-10 bg-purple-200 rounded pl-3">
        <h2 className="text-2xl font-semibold text-purple-800 mb-4">Contact Information</h2>
        <div className="flex flex-col md:flex-row md:space-x-10">
          <div className="flex-1 mb-6">
            <h3 className="text-lg font-medium text-purple-600">Address</h3>
            <p className="text-gray-700">123 Main Street, City, Country</p>
          </div>
          <div className="flex-1 mb-6">
            <h3 className="text-lg font-medium text-purple-600">Phone</h3>
            <p className="text-gray-700">(123) 456-7890</p>
          </div>
          <div className="flex-1 mb-6">
            <h3 className="text-lg font-medium text-purple-600">Email</h3>
            <p className="text-gray-700">suvidha@gamail.com</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-purple-600 hover:text-purple-800">Facebook</a>
          <a href="#" className="text-purple-600 hover:text-purple-800">Twitter</a>
          <a href="#" className="text-purple-600 hover:text-purple-800">LinkedIn</a>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mb-10 pl-3">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Contact Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-white" htmlFor="name">Name</label>
            <input type="text" id="name" required className="w-full px-3 py-2 border text-black border-gray-300 bg-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Your Name" />
          </div>
          <div>
            <label className="block mb-1 text-white" htmlFor="email">Email</label>
            <input type="email" id="email" required className="w-full px-3 py-2 border text-black border-gray-300 bg-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Your Email" />
          </div>
          <div>
            <label className="block mb-1 text-white" htmlFor="message">Message</label>
            <textarea id="message" required className="w-full px-3 py-2 border text-black border-gray-300 bg-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" rows="5" placeholder="Your Message"></textarea>
          </div>
          <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">Submit</button>
        </form>
      </section>

      {/* FAQs Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 rounded">
              <button
                onClick={() => handleToggle(index)}
                className="w-full text-left px-4 py-3 bg-purple-100 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <h3 className="font-medium text-purple-600">{faq.question}</h3>
              </button>
              {openIndex === index && (
                <div className="px-4 py-2 text-black bg-purple-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Optional: Map Section */}
      
      <section>
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Our Location</h2>
        <div className="h-60 bg-gray-300 rounded">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509989!2d144.95373631531836!3d-37.81627997975199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f8f71ff%3A0x1e2c9c0a9c77cd2!2sMelbourne%20CBD%2C%20Melbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1633454786940!5m2!1sen!2sus"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="rounded"
          ></iframe>
        </div>
      </section>
      
    </div>
  );
};

export default ContactUs;
