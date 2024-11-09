const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/MedicineUsers`);

const ordersSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    orderList: [
        {
            name: { type: String, required: true },
            count: { type: Number, required: true },
        }
    ],
    totalCost: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Orders", ordersSchema);
