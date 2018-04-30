import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  createReceipt, 
  updateReceipt,
  deleteItem,
  fetchItem
} from '../actions';

class ReceiptForm extends Component {
  // HANDLE SUBMIT
  onSubmit(date) {
    const { createReceipt, updateReceipt, history, receipt } = this.props;
    const values = {
      total: receipt.total,
      items: receipt.items,
    }

    if (receipt.selectedId) {
      return updateReceipt(receipt.selectedId, values, history);
    }

    return createReceipt(values, history);
  }

  // EDIT ITEM
  onEditClick(item) {
    this.props.fetchItem(item);
  }

  // DELETE ITEM
  onDeleteClick(item) {
    const { receipt, deleteItem } = this.props;
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      deleteItem(receipt.items, item._id);
    }
  }

  // RENDER ITEMIZATIONS FOR EACH RECEIPT
  renderItems(items) {
    return _.map(items, (item, i) => {
      return (
        <li key={i}>
          <p>* Cost: ${item.cost}, Category: {item.category}, Description: {item.description}</p>
          <br />
          <a className="right" onClick={this.onDeleteClick.bind(this, item)}>
            Delete
          </a>
          <a style={{ marginRight: 15 }} className="right" onClick={this.onEditClick.bind(this, item)}>
            Edit
          </a>
          <br />
          <hr />
        </li>
      );
    });
  }

  // ESSENTIALLY FOR RENDERING THE TITLE
  renderItemizations() {
    const { items } = this.props.receipt;

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

  // RENDER RECEIPT FORM
  render() {
    const { handleSubmit, receipt } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className="card-panel form"
      >
        {this.renderItemizations()}
        <h5>Total Cost</h5>
        <hr />
        <h4>${receipt.total}</h4>
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
  return { receipt: state.receipts };
};

export default reduxForm({
  form: 'ReceiptForm'
})(
  connect(
    mapStateToProps, { createReceipt, updateReceipt, deleteItem, fetchItem }
  )(withRouter(ReceiptForm))
);
