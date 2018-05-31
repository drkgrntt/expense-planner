import React from 'react';
import ExpenseForm from './ExpenseForm';
import ItemForm from './ItemForm';

const NewExpense = () => {
  return (
    <div>
      <h4>Add a Receipt</h4>
      <div className="expense-form">
        <ExpenseForm />
        <ItemForm />
      </div>
    </div>
  );
}

export default NewExpense;
