import React, { useEffect, useState } from 'react'
import axiosInstance from '../lib/axios.js'
import Item from '../Components/Item.jsx';
import Logout from '../Components/Logout.jsx';
import useAuthRedirect from '../context/AuthRederect.jsx';
import { Link } from 'react-router-dom';
import { PlusIcon } from "lucide-react";

const AdminDashboard = () => {
    useAuthRedirect();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('adminToken');
            try {
                setLoading(true);
                const res = await axiosInstance.get('/admin/menu/list', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',

                    }
                });
                console.log(res.data)
                setItems(res.data.menuItems);
                setLoading(false);
            } catch (error) {
                console.log("error fetching data from adminController");
            }
        }
        fetchData();
    }, []);

    const handleUpdate = async (id, updatedItem) => {
        try {
            await axiosInstance.put(`/admin/menu/update/${id}`, updatedItem);
            setItems((prev) => prev.map((item) => item._id === id ? {
                ...item,
                itemName: updatedItem.name,
                price: updatedItem.price,
                description: updatedItem.description,
                preparationTime: updatedItem.prepTime,
            } : item));
        } catch (error) {
            console.error("error updating item:", error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/admin/menu/delete/${id}`);
            setItems((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.error("error deleting item", error);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-4 text-orange-700 text-lg font-medium">Loading menu items...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 to-orange-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-orange-800 mb-4">
                        Admin Dashboard
                    </h1>

                    <p className="text-orange-600 text-lg max-w-2xl mx-auto">
                        Manage your restaurant's menu items. Update prices, descriptions, and preparation times or remove items from the menu.
                    </p>
                    <Logout />
                </div>

                {/* Stats Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-orange-500">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="text-center flex-1 min-w-[200px]">
                            <p className="text-3xl font-bold text-orange-600">{items.length}</p>
                            <p className="text-orange-800 font-medium">Total Items</p>
                        </div>
                        <div className="h-12 w-px bg-orange-200 hidden md:block"></div>
                        <div className="text-center flex-1 min-w-[200px]">
                            <p className="text-3xl font-bold text-orange-600">
                                {items.filter(item => item.price < 20).length}
                            </p>
                            <p className="text-orange-800 font-medium">Affordable Items</p>
                        </div>
                        <div className="h-12 w-px bg-orange-200 hidden md:block"></div>
                        <div className="text-center flex-1 min-w-[200px]">
                            <p className="text-3xl font-bold text-orange-600">
                                {items.filter(item => item.preparationTime < 30).length}
                            </p>
                            <p className="text-orange-800 font-medium">Quick Prep Items</p>
                        </div>
                    </div>
                </div>

                {/* Items Grid */}
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-orange-800">
                        Current Food Items
                    </h2>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        {items.length} items
                    </span>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <div className="text-orange-400 text-6xl mb-4">🍽️</div>
                        <h3 className="text-xl font-semibold text-orange-800 mb-2">No Items Found</h3>
                        <p className="text-orange-600 max-w-md mx-auto">
                            Your menu is currently empty. Start by adding some delicious food items to your menu.
                        </p>
                        <Link to={'/admin/menu/add'}>
                            <button
                                className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                                
                            >
                                <PlusIcon size={16} /> Add Dishes
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100 hover:border-orange-200"
                            >
                                <Item
                                    _id={item._id}
                                    name={item.itemName}
                                    price={item.price}
                                    description={item.description}
                                    prepTime={item.preparationTime}
                                    onUpdate={handleUpdate}
                                    onDelete={handleDelete}
                                />
                            </div>
                        ))}
                        <Link to={'/admin/menu/add'}>
                            <button
                                className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                                
                            >
                                <PlusIcon size={16} /> Add Dishes
                            </button>
                        </Link>
                    </div>
                )}

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <p className="text-orange-500 text-sm">
                        💡 Tip: Click on any menu item to edit its details or remove it from the menu.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;