import React, { useState } from 'react';
import './AddItemsModal.css';
import Button from '../Button/Button';

const AddItemModal = ({ addItem,items, showItemModal, handleCloseModal }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddItem = () => {
    const newItem = {
      name: itemName,
      quantity: parseInt(quantity),
      price: parseFloat(amount),
      total: (parseFloat(amount) * parseInt(quantity)).toFixed(2),
    };
    addItem([...items,newItem]);
    setItemName('');
    setQuantity('');
    setAmount('');
    handleCloseModal();
  };

  return (
    <div>
      {showItemModal && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Add Item</h2>
            <form>
              <div>
                <label htmlFor="itemName">Item Name:</label>
                <input
                  type="text"
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="modal-input"
                  required={true}
                />
              </div>
              <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="modal-input"
                  required={true}
                />
              </div>
              <div>
                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  id="amount"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="modal-input"
                  required
                />
              </div>
              <div className="modal-buttons">
                <Button color="var(--edit-color)" txt="var(--add-item-button-color)" handleAction={handleCloseModal}>
                  Cancel
                </Button>
                <Button color="var(--secondary-color)" handleAction={handleAddItem}>
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItemModal;
