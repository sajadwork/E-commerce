import React, { useState } from 'react';

const AddressForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(initialData || {
        name: '',
        mobile: '',
        pincode: '',
        locality: '',
        address: '',
        city: '',
        state: '',
        landmark: '',
        altPhone: '',
        type: 'Home'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLocation = () => {
        // Simple mock for geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // In a real app, you'd reverse geocode this
                    alert(`Location detected: ${position.coords.latitude}, ${position.coords.longitude}`);
                    // For demo, let's fill some dummy data
                    setFormData(prev => ({
                        ...prev,
                        city: 'Detected City',
                        state: 'Detected State',
                        address: 'Detected Location'
                    }));
                },
                (error) => {
                    alert("Error detecting location: " + error.message);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
        "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
        "Uttarakhand", "West Bengal"
    ];

    return (
        <form className="address-form-container" onSubmit={handleSubmit}>
            <h3 className="address-form-title">Add a New Address</h3>
            
            <button type="button" className="btn-location" onClick={handleLocation}>
                <i className="ph ph-crosshair"></i> Use my current location
            </button>

            <div className="address-grid">
                <div className="address-input-group">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="address-input-group">
                    <input 
                        type="text" 
                        name="mobile" 
                        placeholder="10-digit mobile number" 
                        value={formData.mobile} 
                        onChange={handleChange} 
                        required 
                        pattern="[0-9]{10}"
                    />
                </div>
                <div className="address-input-group">
                    <input 
                        type="text" 
                        name="pincode" 
                        placeholder="Pincode" 
                        value={formData.pincode} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="address-input-group">
                    <input 
                        type="text" 
                        name="locality" 
                        placeholder="Locality" 
                        value={formData.locality} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="address-input-group full-width">
                    <textarea 
                        name="address" 
                        placeholder="Address (Area and Street)" 
                        rows="4" 
                        value={formData.address} 
                        onChange={handleChange} 
                        required 
                    ></textarea>
                </div>
                <div className="address-input-group">
                    <input 
                        type="text" 
                        name="city" 
                        placeholder="City/District/Town" 
                        value={formData.city} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="address-input-group">
                    <select name="state" value={formData.state} onChange={handleChange} required>
                        <option value="">--Select State--</option>
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="address-input-group">
                    <input 
                        type="text" 
                        name="landmark" 
                        placeholder="Landmark (Optional)" 
                        value={formData.landmark} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="address-input-group">
                    <input 
                        type="text" 
                        name="altPhone" 
                        placeholder="Alternate Phone (Optional)" 
                        value={formData.altPhone} 
                        onChange={handleChange} 
                    />
                </div>
            </div>

            <div className="address-type-section">
                <p>Address Type</p>
                <div className="radio-group">
                    <label className="radio-option">
                        <input 
                            type="radio" 
                            name="type" 
                            value="Home" 
                            checked={formData.type === 'Home'} 
                            onChange={handleChange} 
                        />
                        Home
                    </label>
                    <label className="radio-option">
                        <input 
                            type="radio" 
                            name="type" 
                            value="Work" 
                            checked={formData.type === 'Work'} 
                            onChange={handleChange} 
                        />
                        Work
                    </label>
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-save-address">SAVE</button>
                <button type="button" className="btn-cancel-address" onClick={onCancel}>CANCEL</button>
            </div>
        </form>
    );
};

export default AddressForm;
