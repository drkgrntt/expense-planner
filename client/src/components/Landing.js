import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { 
  fetchReceipts, 
  deleteReceipt, 
  fetchReceipt, 
  createCollection 
} from '../actions';

class Landing extends Component {
  componentDidMount() {
    this.props.fetchReceipts();
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

  // ASK FOR CONFIRMATION BEFORE DELETING
  onDeleteClick(receipt) {
    const confirm = window.confirm('Are you sure?');

    if (confirm) {
      return this.props.deleteReceipt(receipt._id);
    }
  }

  // RENDER EACH INDIVIDUAL RECEIPT
  renderReceiptList() {
    const { receipts, fetchReceipt } = this.props;
    
    if (receipts[0] === undefined) {
      return <h4>No receipts</h4>;
    }

    return _.map(receipts, receipt => {
      return (
        <li key={receipt._id}>
          <h5>Cost: ${receipt.total} || Date: {receipt.dateString}</h5>
          <div style={{ marginLeft: 20 }}>
            <p className="item">Itemizations:</p>
            <ul style={{ marginLeft: 20 }}>{this.renderItemizations(receipt.items)}</ul>
          </div>
          <button 
            onClick={this.onDeleteClick.bind(this, receipt)} className="btn red lighten-2 right"
            style={{ marginBottom: 10 }}
          >
            Delete
          </button>
          <Link 
            to="/receipt"
            onClick={() => fetchReceipt(receipt._id)} 
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
    const { createCollection, receipts } = this.props;
    const confirm = window.confirm("Are you sure you're ready to finalize these receipts? (This will be a permanent save.)");

    if (confirm) {
      createCollection(receipts);
    }
  }

  render() {
    return (
      <div style={{ marginBottom: 30 }}>
        <h3>Receipts</h3>
        <div className="card-panel list">
          <hr />
          <ul>{this.renderReceiptList()}</ul>
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
  return { receipts: state.receipts.receiptList };
};

export default connect(
  mapStateToProps, { 
    fetchReceipts, 
    deleteReceipt, 
    fetchReceipt,
    createCollection
  }
)(Landing);
