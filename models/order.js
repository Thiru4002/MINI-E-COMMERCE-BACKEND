const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    products: [  // changed to plural
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: "pending",
    },
}, { timestamps: true });

orderSchema.pre(/^find/, function (next) {
    this.populate("user", "name email")
        .populate("products.product", "name price category");
    next();
});

orderSchema.pre('save', async function (next) {
    try {
        for (let item of this.products) {
            const product = await mongoose.model("Product").findById(item.product);

            if (!product) {
                throw new Error(`Product not found: ${item.product}`);
            }

            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product: ${product.name}`);
            }

            product.stock -= item.quantity;
            await product.save();
        }
        next();
    } catch (err) {
        next(err);
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
