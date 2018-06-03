import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchCollection } from '../actions';

class ShowCollection extends Component {
  componentDidMount() {
    // this.props.match.params.id is from the URL
    const { match, fetchCollection } = this.props;

    fetchCollection(match.params.id);
  }

  // RENDER EACH ITEM FROM EACH EXPENSE
  renderItemizations(items) {
    return _.map(items, (item, i) => {
      return (
        <li key={i}>
          <p className="item">
            <p className="nospace">Category: {item.category}</p>
            <hr className="nospace" />
            <p className="nospace">Description: {item.description}</p>
            <hr className="nospace" />
            <p className="nospace">Cost: ${item.cost.toFixed(2)}</p>
          </p>
        </li>
      );
    });
  }

  // RENDER EACH EXPENSE
  renderExpenseList(expenses) {
    return _.map(expenses, expense => {
      return (
        <li key={expense._id}>
          <h5>Cost: ${expense.total.toFixed(2)}</h5>
          <div className="margin20">
            <p className="item-title">Itemizations:</p>
            <ul>{this.renderItemizations(expense.items)}</ul>
          </div>    
          <br />
          <hr />  
        </li>
      );
    });
  }

  // LOGIC AND DISPLAY FOR CATEGORY TOTALS
  renderCategories() {
    const { collection } = this.props;
    let categoryTotals = {};
    let array = [];
    let items = [];

    _.map(collection.expenses, expense => {
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
      return <span className="btn fake-btn" key={`${category}: ${total}`}>{category}: ${total.toFixed(2)}</span>;
    });
  }

  render() {
    const { collection } = this.props;

    if (collection.total === undefined) {
      return <h3>Loading . . .</h3>
    }
    
    return (
      <div style={{ marginBottom: 30 }}>
        <h3 className="outline">Nashville Trip</h3>
        <div className="card-panel list">
          <h4 className="center">Trip Total: ${collection.total.toFixed(2)}</h4>
          <hr />
          <h5>{this.renderCategories()}</h5>
          <hr /><hr />
          <h4 className="center italic">Expenses</h4>
          <hr />
          <ul>{this.renderExpenseList(collection.expenses)}</ul>
        </div>
        <Link to="/collections" className="btn blue darken-4">
          Back
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { collection: state.collections };
};

export default connect(mapStateToProps, { fetchCollection })(ShowCollection);
