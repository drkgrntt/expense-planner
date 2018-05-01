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

  renderItemizations(items) {
    return _.map(items, (item, i) => {
      return (
        <li key={i}>
          <p className="item">* Category: {item.category} || Description: {item.description} || Cost: ${item.cost}</p>
        </li>
      );
    });    
  }

  renderReceiptList(receipts) {
    return _.map(receipts, receipt => {
      return (
        <li key={receipt._id}>
          <h5>Cost: ${receipt.total} || Date: {receipt.dateString}</h5>
          <div style={{ marginLeft: 20 }}>
            <p className="item">Itemizations:</p>
            <ul style={{ marginLeft: 20 }}>{this.renderItemizations(receipt.items)}</ul>
          </div>    
          <hr />  
        </li>
      );
    });
  }

  renderCategories(items, categories) {
    let categoryTotals = {};

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
      return <span key={`${category}: ${total}`}>{category}: ${total} || </span>;
    });
  }

  render() {
    const { collection } = this.props;

    let array = [];
    let items = [];
    
    _.map(collection.receipts, receipt => {
      _.map(receipt.items, item => {
        array.push(item.category);
        items.push(item);
      });
    });

    const categories = new Set(array);

    return (
      <div style={{ marginBottom: 30 }}>
        <h4>{collection.dateRange}</h4>
        <hr />
        <h4>Total: ${collection.total}</h4>
        <hr />
        <h5>Category Totals:</h5>
        <h5>{this.renderCategories(items, categories)}</h5>
        <div className="card-panel list">
          <h4>Receipts</h4>
          <hr />
          <ul>{this.renderReceiptList(collection.receipts)}</ul>
        </div>
        <Link to="/collections" className="btn blue lighten-2">
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
