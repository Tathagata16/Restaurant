import React, { useState } from "react";
import { Trash2, Pencil } from "lucide-react";

const Item = ({ _id, image, name, price, description, prepTime, onDelete, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    name,
    price,
    description,
    prepTime,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = () => {
    onUpdate(_id, editData);
    setShowModal(false);
  };

  const handleDelete = () => {
    onDelete(_id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-orange-200 flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6 mb-6">
        <div className="w-full sm:w-1/3 flex justify-center items-center bg-orange-50 rounded-xl overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="object-cover w-full h-40 sm:h-32 rounded-lg" />
          ) : (
            <div className="flex items-center justify-center text-gray-400 h-40 sm:h-32 w-full">
              No Image
            </div>
          )}
        </div>

        <div className="sm:ml-6 flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="text-lg font-bold text-orange-600">₹{price}</p>
          </div>

          <p className="text-gray-600 mt-2 text-sm">
            {description.length > 100 ? description.slice(0, 100) + "..." : description}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-500 text-sm font-medium">⏱️ {prepTime} mins</span>
            <div className="flex space-x-3">
              <button
                className="flex items-center gap-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
                onClick={() => setShowModal(true)}
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white bg-opacity-30 flex justify-center items-center z-50">
          <div
            className="bg-white rounded-xl shadow-lg p-6 w-11/12 sm:w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to delete this item?</h2>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-orange-200 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 sm:w-96">
            <h3 className="text-xl font-semibold text-orange-600 mb-4">Edit Item</h3>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                placeholder="Item Name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <textarea
                name="description"
                value={editData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="number"
                name="prepTime"
                value={editData.prepTime}
                onChange={handleChange}
                placeholder="Preparation Time (mins)"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Item;





// className="fixed inset-0 backdrop-blur-sm bg-white bg-opacity-30 flex justify-center items-center z-50"
