import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchVacation } from '../actions';

class ShowVacation extends Component {
  componentDidMount() {
    // this.props.match.params.id is from the URL
    const { match, fetchVacation } = this.props;

    fetchVacation(match.params.id);
  }

  // RENDER EACH ITEM FROM EACH EXPENSE
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
    const { vacation } = this.props;
    let categoryTotals = {};
    let array = [];
    let items = [];

    _.map(vacation.expenses, expense => {
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
    const { vacation } = this.props;

    if (vacation.total === undefined) {
      return <h3>Loading . . .</h3>
    }
    
    return (
      <div style={{ marginBottom: 30 }}>
        <h3 className="outline">Nashville Trip</h3>
        <div className="card-panel list">
          <h4 className="center">Trip Total: ${vacation.total.toFixed(2)}</h4>
          <hr />
          <h5>{this.renderCategories()}</h5>
          <hr /><hr />
          <h4 className="center italic">Expenses</h4>
          <hr />
          <ul>{this.renderExpenseList(vacation.expenses)}</ul>
        </div>
        <Link to="/vacations" className="btn blue darken-4">
          Back
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { vacation: state.vacations };
};

export default connect(mapStateToProps, { fetchVacation })(ShowVacation);
