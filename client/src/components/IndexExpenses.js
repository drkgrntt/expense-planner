import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Field, reduxForm } from 'redux-form';
import { 
  fetchExpenses, 
  deleteExpense, 
  fetchExpense, 
  createCollection 
} from '../actions';

class IndexExpenses extends Component {
  componentDidMount() {
    this.props.fetchExpenses();
    
    $(document).ready(() => {
      $('.modal').modal();
    });
  }

  // SHOW EACH ITEM FOR EACH EXPENSE
  renderItemizations(items) {
    return _.map(items, (item, i) => {
      return (
        <li key={i}>
          <p className="item">
            <p className="nospace">Category: {item.category}</p>
            <p className="nospace">Description: {item.description}</p>
            <p className="nospace">Cost: ${item.cost.toFixed(2)}</p>
          </p>
        </li>
      );
    });
  }

  // ASK FOR CONFIRMATION BEFORE DELETING
  onDeleteClick(expense) {
    const confirm = window.confirm('Are you sure?');

    if (confirm) {
      return this.props.deleteExpense(expense._id);
    }
  }

  // RENDER EACH INDIVIDUAL EXPENSE
  renderExpenseList() {
    const { expenses, fetchExpense } = this.props;
    
    if (expenses[0] === undefined) {
      return <div><h4>No expenses</h4><hr /></div>;
    }

    return _.map(expenses, expense => {
      return (
        <li key={expense._id}>
          <h5>Cost: ${expense.total.toFixed(2)}</h5>
          <div className="margin20">
            <p className="item-title">Itemizations:</p>
            <ul>{this.renderItemizations(expense.items)}</ul>
          </div>
          <br />
          <button 
            onClick={this.onDeleteClick.bind(this, expense)} className="btn red lighten-2 right"
            style={{ marginBottom: 10 }}
          >
            Delete
          </button>
          <Link 
            to="/expense"
            onClick={() => fetchExpense(expense._id)} 
            className="btn orange lighten-2 right"
            style={{ marginRight: 10 }}
          >
            Edit
          </Link>
          <br /><br />
          <hr />
        </li>
      );
    });
  }

  // HANDLE FINALIZE BUTTON CLICK
  onFinalizeClick(values) {
    const { createCollection, expenses, withRouter } = this.props;
    const confirm = window.confirm("Are you sure you're ready to finalize these expenses? (This will be a permanent save.)");

    if (confirm) {
      // createCollection(expenses, withRouter);
      console.log(createCollection, expenses, withRouter, values);
    }
  }

  // ADD EACH EXPENSE FOR A TOTAL
  renderTotalCost() {
    const { expenses } = this.props;
    let total = 0;
    _.map(expenses, expense => {
      total = total + expense.total;
    });

    return (
      <div>
        <h4>Current Total: ${total.toFixed(2)}</h4>
      </div>
    );
  }

  // LOGIC AND DISPLAY FOR CATEGORY TOTALS
  renderCategories() {
    // category logic
    const { expenses } = this.props;
    let categoryTotals = {};
    let array = [];
    let items = [];

    _.map(expenses, expense => {
      _.map(expense.items, item => {
        array.push(item.category);
        items.push(item);
      });
    });

    const categories = new Set(array);

    categories.forEach(category => {
      _.map(items, item => {
        if (item.category === category) {
          if (categoryTotals[category]) {
            categoryTotals[category] = categoryTotals[category] + item.cost;
          } else {
            categoryTotals[category] = item.cost;
          }
        }
      });
    });

    // render categories
    return _.map(categoryTotals, (total, category) => {
      return (
        <span 
          key={`${category}: ${total}`}
          className="btn fake-btn"
          style={{ margin: 2 }}
        >
          {category}: ${total.toFixed(2)}
        </span>
      );
    });
  }

  // Shows finalization modal
  renderModal() {
    const { handleSubmit } = this.props;

    return (
      <div id="modal1" className="modal">
        <form
          onSubmit={handleSubmit(this.onFinalizeClick.bind(this))}
        >
          <div className="modal-content">
            <h4>Before you're done</h4>
            <hr />
            <h5>Name of your vacation</h5>
            <Field
              name="title"
              component="input"
              type="text"
              placeholder="The Bahamas"
            />
            <h5>Give a memorable description</h5>
            <Field
              name="description"
              component="textarea"
              placeholder="We went on an all inclusive cruise!"
            />
            <button
              type="submit"
              className="modal-close btn blue darken-4 right"
            >
              Finalize
            </button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div style={{ marginBottom: 30 }}>
        <h3 className="outline">Planned Expenses</h3>
        <div className="card-panel list">
          {this.renderTotalCost()}
          <hr />
          <h5>{this.renderCategories()}</h5>
          <hr />
          <ul>{this.renderExpenseList()}</ul>
        </div>
        <a
          className="btn blue darken-4 modal-trigger"
          href="#modal1"
        >
          Finish Up
        </a>
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { expenses: state.expenses.expenseList };
};

const formConfig = reduxForm({
  form: 'finalizationForm'
})(withRouter(IndexExpenses));

export default connect(
  mapStateToProps, { 
    fetchExpenses, 
    deleteExpense, 
    fetchExpense,
    createCollection
  }
)(formConfig);
