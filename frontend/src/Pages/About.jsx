import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

const About = () => {
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
        <h2 className="text-5xl font-extrabold mb-4">About Tomato</h2>
        <p className="text-lg font-medium max-w-2xl mx-auto">
          Where taste meets tradition! We bring you mouthwatering dishes inspired by authentic Indian flavors — made with passion, quality, and love.
        </p>
      </section>

      {/* Restaurant Story */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-orange-700 mb-6">Our Story</h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            Established in 1998, Tomato has been a culinary landmark for food enthusiasts who crave
            authentic Indian cuisine with a modern twist. Our chefs carefully craft every dish using
            the freshest ingredients, ensuring that every bite bursts with flavor and comfort.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            From cozy dine-in experiences to quick online deliveries, Tomato continues to serve
            thousands of happy customers every day — making it one of the most loved restaurants in the city.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-orange-100 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-white shadow-md rounded-xl p-8 border border-orange-200">
            <h4 className="text-2xl font-semibold text-orange-700 mb-4">Our Mission</h4>
            <p className="text-gray-700 leading-relaxed">
              To deliver unforgettable dining experiences by blending traditional flavors with modern culinary techniques — all served with warmth and care.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-8 border border-orange-200">
            <h4 className="text-2xl font-semibold text-orange-700 mb-4">Our Vision</h4>
            <p className="text-gray-700 leading-relaxed">
              To become India’s most trusted restaurant brand by promoting quality food, exceptional service, and sustainable cooking practices.
            </p>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-16 bg-white text-center px-6">
        <h3 className="text-3xl font-semibold text-orange-700 mb-8">Meet the Developer</h3>
        <div className="bg-orange-100 border border-orange-200 rounded-2xl shadow-md p-8 max-w-md mx-auto">
          <h4 className="text-2xl font-bold text-gray-800 mb-2">Tathagata Ghosh</h4>
          <p className="text-gray-600 mb-4">B.Tech CSE, 3rd Year • Lovely Professional University</p>

          <div className="flex justify-center space-x-6 text-orange-600 text-2xl mt-4">
            <a href="https://linkedin.com/in/tathagata-ghosh-30157025b/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-700">
              <FaLinkedin />
            </a>
            <a href="https://github.com/Tathagata16" target="_blank" rel="noopener noreferrer" className="hover:text-orange-700">
              <FaGithub />
            </a>
            <a href="https://twitter.com/Tathagata160920" target="_blank" rel="noopener noreferrer" className="hover:text-orange-700">
              <FaTwitter />
            </a>
            <a href="mailto:tathagataghosh1609@gmail.com" className="hover:text-orange-700">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-500 text-white text-center py-6 mt-10">
        <p className="text-sm">&copy; {new Date().getFullYear()} Tomato Restaurant. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
