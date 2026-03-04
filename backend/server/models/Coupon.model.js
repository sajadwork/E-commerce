import mongoose from 'mongoose';

const couponSchema = mongoose.Schema({
    code: { type: String, required: true, unique: true, uppercase: true },
    discount: { type: Number, required: true, min: 0, max: 100 },
    isActive: { type: Boolean, required: true, default: true },
    expirationDate: { type: Date, required: true }
}, {
    timestamps: true
});

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;
