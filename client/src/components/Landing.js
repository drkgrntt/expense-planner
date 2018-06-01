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
          <p className="item">* Category: {item.category} || Description: {item.description} || Cost: ${item.cost.toFixed(2)}</p>
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

  // ADD EACH EXPENSE FOR A TOTAL
  renderTotalCost() {
    const { expenses } = this.props;
    let total = 0;
    _.map(expenses, expense => {
      total = total + expense.total;
    });

    return (
      <div>
        <h4>Total: ${total.toFixed(2)}</h4>
      </div>
    );
  }

  // LOGIC AND DISPLAY FOR CATEGORY TOTALS
  renderCategories() {
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

    return _.map(categoryTotals, (total, category) => {
      return <span key={`${category}: ${total}`}>{category}: ${total.toFixed(2)} || </span>;
    });
  }

  render() {
    return (
      <div style={{ marginBottom: 30 }}>
        <h3 className="outline">Planned Expenses</h3>
        <div className="card-panel list">
          {this.renderTotalCost()}
          <hr />
          <h5>|| {this.renderCategories()}</h5>
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
