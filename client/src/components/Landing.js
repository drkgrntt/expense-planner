import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { 
  fetchExpenses, 
  deleteExpense, 
  fetchExpense, 
  createCollection 
} from '../actions';

class Landing extends Component {
  componentDidMount() {
    this.props.fetchExpenses();
  }

  // SHOW EACH ITEM FOR EACH EXPENSE
  renderItemizations(items) {
    return _.map(items, (item, i) => {
      return (
        <li key={i}>
          <p className="item">* Category: {item.category} || Description: {item.description} || Cost: ${item.cost}</p>
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
      return <h4>No expenses</h4>;
    }

    return _.map(expenses, expense => {
      return (
        <li key={expense._id}>
          <h5>Cost: ${expense.total} || Date: {expense.dateString}</h5>
          <div style={{ marginLeft: 20 }}>
            <p className="item">Itemizations:</p>
            <ul style={{ marginLeft: 20 }}>{this.renderItemizations(expense.items)}</ul>
          </div>
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
  onFinalizeClick() {
    const { createCollection, expenses } = this.props;
    const confirm = window.confirm("Are you sure you're ready to finalize these expenses? (This will be a permanent save.)");

    if (confirm) {
      createCollection(expenses);
    }
  }

  render() {
    return (
      <div style={{ marginBottom: 30 }}>
        <h3>Planned Expenses</h3>
        <div className="card-panel list">
          <hr />
          <ul>{this.renderExpenseList()}</ul>
        </div>
        <Link
          to="/collections"
          className="btn blue lighten-2"
          onClick={() => this.onFinalizeClick()}
        >
          Finalize
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { expenses: state.expenses.expenseList };
};

export default connect(
  mapStateToProps, { 
    fetchExpenses, 
    deleteExpense, 
    fetchExpense,
    createCollection
  }
)(Landing);
