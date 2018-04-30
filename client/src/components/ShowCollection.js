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

  render() {
    const { collection } = this.props;

    return (
      <div style={{ marginBottom: 30 }}>
        <h4>{collection.dateRange}</h4>
        <hr />
        <h4>Total: ${collection.total}</h4>
        <div className="card-panel list">
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
