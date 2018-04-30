import React from 'react';
import ReceiptForm from './ReceiptForm';
import ItemForm from './ItemForm';

const NewReceipt = () => {
  return (
    <div>
      <h4>Add a Receipt</h4>
      <div className="receipt-form">
        <ReceiptForm />
        <ItemForm />
      </div>
    </div>
  );
}

export default NewReceipt;
