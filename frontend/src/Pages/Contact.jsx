import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-orange-50 text-gray-800">

      {/* Navbar */}
      <nav className="bg-orange-500 text-white py-4 shadow-md flex justify-between items-center px-8">
        <h1 className="text-3xl font-bold tracking-wide flex items-center gap-2">
          🍅 <span className="font-extrabold">Tomato</span>
        </h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-200 font-medium">Home</Link>
          <Link to="/cart" className="hover:text-yellow-200 font-medium">Cart</Link>
          <Link to="/about" className="hover:text-yellow-200 font-medium">About</Link>
          <Link to="/contact" className="hover:text-yellow-200 font-medium">Contact</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-linear-to-r from-orange-600 to-orange-400 text-white text-center py-16 px-6">
        <h2 className="text-5xl font-extrabold mb-4">Get in Touch</h2>
        <p className="text-lg font-medium max-w-2xl mx-auto">
          Have a question, feedback, or want to reserve a table? We'd love to hear from you!
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-3xl font-semibold text-orange-700 mb-4">Contact Information</h3>
            <p className="text-gray-700 text-lg">
              Reach out to us anytime — our team is here to assist you with your dining experience, event booking, or online orders.
            </p>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-orange-600 text-2xl" />
                <p>Tomato Restaurant, Park Street, Kolkata, India</p>
              </div>
              <div className="flex items-center gap-4">
                <FaPhone className="text-orange-600 text-2xl" />
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-orange-600 text-2xl" />
                <p>contact@tomatofoods.com</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-orange-700 mb-2">Opening Hours</h4>
              <p>Monday – Sunday: 10:00 AM – 11:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-orange-100 border border-orange-200 rounded-2xl shadow-md p-8">
            <h3 className="text-2xl font-semibold text-orange-700 mb-6 text-center">Send Us a Message</h3>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Message</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message here..."
                className="w-full px-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition-all duration-200"
            >
              Send Message
            </button>
          </form>

        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="bg-orange-100 py-12 text-center">
        <h3 className="text-3xl font-semibold text-orange-700 mb-4">Find Us</h3>
        <p className="text-gray-700 mb-6">Locate our restaurant easily with the map below.</p>
        {/* Replace iframe src with your actual Google Map embed link */}
        <div className="max-w-5xl mx-auto border-4 border-orange-300 rounded-xl overflow-hidden shadow-md">
          <iframe
            title="Tomato Restaurant Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.158764739309!2d88.3629!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277a2f7e7aab9%3A0x7a5b13a4e6b22f8!2sPark%20Street%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1670000000000"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-500 text-white text-center py-6 mt-10">
        <p className="text-sm">&copy; {new Date().getFullYear()} Tomato Restaurant. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
