import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        required: true,
        enum: ['gravy', 'rice', 'dessert', 'fast-food', 'starter','biriyani'],
        lowercase: true
    },
    image: {
        type: String,
        default: ""
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    preparationTime: {
        type: Number, // in minutes
        default: 15
    },
    isVeg:{
        type:Boolean,
        default:true,
    }
    
}, {
    timestamps: true // adds createdAt and updatedAt automatically
});

// Index for better query performance
menuSchema.index({ category: 1, isAvailable: 1 });
menuSchema.index({ dietaryTags: 1 });

export const Menu = mongoose.model('Menu', menuSchema);