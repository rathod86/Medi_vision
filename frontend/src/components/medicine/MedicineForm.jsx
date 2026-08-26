import React from "react";

const MedicineForm = ({
    formData,
    handleChange,
    handleSubmit,
    buttonText,
}) => {
    return (
        <div className="medicine-form-container">
            <form className="medicine-form" onSubmit={handleSubmit}>

                <h2>{buttonText} Medicine</h2>

                <div className="form-grid">

                    <div className="form-group">
                        <label>Medicine Code</label>
                        <input
                            type="text"
                            name="medicineCode"
                            value={formData.medicineCode}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Medicine Name</label>
                        <input
                            type="text"
                            name="medicineName"
                            value={formData.medicineName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Capsule">Capsule</option>
                            <option value="Syrup">Syrup</option>
                            <option value="Injection">Injection</option>
                            <option value="Drops">Drops</option>
                            <option value="Ointment">Ointment</option>
                            <option value="Cream">Cream</option>
                            <option value="Powder">Powder</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Dosage</label>
                        <input
                            type="text"
                            name="dosage"
                            value={formData.dosage}
                            onChange={handleChange}
                            placeholder="500 mg"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Manufacturer</label>
                        <input
                            type="text"
                            name="manufacturer"
                            value={formData.manufacturer}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Batch Number</label>
                        <input
                            type="text"
                            name="batchNumber"
                            value={formData.batchNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Minimum Stock</label>
                        <input
                            type="number"
                            name="minimumStock"
                            value={formData.minimumStock}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Purchase Price</label>
                        <input
                            type="number"
                            step="0.01"
                            name="purchasePrice"
                            value={formData.purchasePrice}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Selling Price</label>
                        <input
                            type="number"
                            step="0.01"
                            name="sellingPrice"
                            value={formData.sellingPrice}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Supplier</label>
                        <input
                            type="text"
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Storage Location</label>
                        <input
                            type="text"
                            name="storageLocation"
                            value={formData.storageLocation}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>

                </div>

                <button type="submit" className="save-btn">
                    {buttonText}
                </button>

            </form>
        </div>
    );
};

export default MedicineForm;