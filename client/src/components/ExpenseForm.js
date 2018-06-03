import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  createExpense, 
  updateExpense,
  deleteItem,
  fetchItem
} from '../actions';

class ExpenseForm extends Component {
  // HANDLE SUBMIT
  onSubmit(date) {
    const { createExpense, updateExpense, history, expense } = this.props;
    const values = {
      total: expense.total,
      items: expense.items,
    }

    if (expense.selectedId) {
      return updateExpense(expense.selectedId, values, history);
    }

    return createExpense(values, history);
  }

  // EDIT ITEM
  onEditClick(item) {
    this.props.fetchItem(item);
  }

  // DELETE ITEM
  onDeleteClick(item) {
    const { expense, deleteItem } = this.props;
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      deleteItem(expense.items, item._id);
    }
  }

  // RENDER ITEMIZATIONS FOR EACH EXPENSE
  renderItems(items) {
    return _.map(items, (item, i) => {
      return (
        <li key={i}>
          <p className="item">
            <a
              className="right"
              onClick={this.onDeleteClick.bind(this, item)}
            >
              Delete
            </a>
            <a
              style={{ marginRight: 15 }}
              className="right"
              onClick={this.onEditClick.bind(this, item)}
            >
              Edit
            </a>
            <br />
            <p className="nospace">Category: {item.category}</p>
            <p className="nospace">Description: {item.description}</p>
            <p className="nospace">Cost: ${item.cost.toFixed(2)}</p>
          </p>
        </li>
      );
    });
  }

  // ESSENTIALLY FOR RENDERING THE TITLE
  renderItemizations() {
    const { items } = this.props.expense;

    if (items.length !== 0) {
      return (
        <div>
          <h5>Itemizations</h5>
          <hr />
          <ul>
            {this.renderItems(items)}
          </ul>
        </div>
      );
    }
  }

  // RENDER EXPENSE FORM
  render() {
    const { handleSubmit, expense } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className="card-panel form"
      >
        {this.renderItemizations()}
        <h5>Total Cost</h5>
        <hr />
        <h4>${expense.total.toFixed(2)}</h4>
        <button
          type="submit"
          className="btn green lighten-2"
        >
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { expense: state.expenses };
};

export default reduxForm({
  form: 'ExpenseForm'
})(
  connect(
    mapStateToProps, { createExpense, updateExpense, deleteItem, fetchItem }
  )(withRouter(ExpenseForm))
);
