import React, { useEffect, useState, useRef } from "react";
import { getHomeData } from "../lib/axios.js";
import CartInput from "../Components/CartInput.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [showAll, setShowAll] = useState(false); // <-- new state

  const menuRef = useRef(null);

  const scrollToMenu  = ()=>{
    menuRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getHomeData();
        setData(response.data.items);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-orange-600 text-2xl font-semibold">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl font-semibold">
        Error fetching data
      </div>
    );

  // Determine which dishes to show
  const displayedItems = showAll ? data : data.slice(0, 8);

  return (
    <div className="min-h-screen bg-orange-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-orange-500 text-white py-4 shadow-md flex justify-between items-center px-8">
        <h1 className="text-3xl font-bold tracking-wide flex items-center gap-2">
          🍅 <span className="font-extrabold">Tomato</span>
        </h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-200 font-medium">
            Home
          </Link>
          <Link to="/cart" className="hover:text-yellow-200 font-medium">
            Cart
          </Link>
          <Link to="/about" className="hover:text-yellow-200 font-medium">
            About
          </Link>
          <Link to="/contact" className="hover:text-yellow-200 font-medium">
            Contact
          </Link>
          <Link to="/admin/login" className="hover:text-red-800 font-medium">
            Admin?
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-orange-600 to-orange-400 text-white py-20 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold mb-4">Welcome to Tomato Restaurant</h2>
          <p className="text-lg font-medium mb-6">
            Experience the taste of authentic Indian cuisine made with love, passion, and the
            freshest ingredients.
          </p>
          
            <button onClick ={scrollToMenu} className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg hover:bg-orange-100 transition">
              Explore Menu
            </button>
          
        </div>
      </section>

      {/* Category Highlights */}
      <section className="py-14 bg-white">
        <h3 className="text-center text-3xl font-semibold text-orange-700 mb-8">Our Specialties</h3>
        <div className="flex flex-wrap justify-center gap-8 px-6">
          {[
            {
              name: "Biriyani",
              desc: "Aromatic rice dishes bursting with spices and flavor.",
            },
            { name: "Starters", desc: "Delicious appetizers to kickstart your meal." },
            { name: "Desserts", desc: "Sweet treats to make your day extra special." },
          ].map((cat, i) => (
            <div
              key={i}
              className="bg-orange-100 border border-orange-200 w-64 rounded-xl p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">🍴</div>
              <h4 className="text-xl font-semibold mb-2">{cat.name}</h4>
              <p className="text-sm text-gray-700">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section ref={menuRef} className="py-14 bg-orange-50">
        <h2 className="text-center text-3xl font-semibold text-orange-700 mb-8">Our Menu</h2>

        <div className="flex flex-wrap justify-center gap-6 px-6">
          {displayedItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-orange-100 rounded-xl p-4 w-60 flex flex-col items-center"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.itemName}
                  className="rounded-md w-full h-36 object-cover mb-3"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800">{item.itemName}</h3>
              <p className="text-gray-500 text-sm text-center">{item.description}</p>
              <p className="text-orange-600 font-bold text-lg mt-2">₹{item.price}</p>
              <p className="text-sm text-gray-600">
                Category: <span className="font-medium">{item.category}</span>
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Prep Time: {item.preparationTime} mins
              </p>
              <CartInput item={item} />
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        {data.length > 8 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200"
            >
              {showAll ? "See Less" : "See Full Menu"}
            </button>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Link to={"/cart"}>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200">
              Go to Cart
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white text-center px-6">
        <h3 className="text-3xl font-semibold text-orange-700 mb-6">About Tomato</h3>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Founded in 1998, Tomato Restaurant has been serving food lovers across the city with
          delicious flavors and warm hospitality. We blend traditional recipes with modern tastes to
          give you an unforgettable dining experience. Whether you dine in or order online, we make
          sure your meal feels like home.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-orange-500 text-white text-center py-6 mt-10">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Tomato Restaurant. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
