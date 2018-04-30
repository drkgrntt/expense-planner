import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createItem, submitItemFail, updateItem } from '../actions';

class ItemForm extends Component {
  // HANDLE SUBMIT
  onSubmit(values) {
    const { createItem, updateItem, submitItemFail, initialValues, receipt } = this.props;
    const { category, cost, description } = values;

    // no empty fields
    if (!category || !cost || !description) {
      return submitItemFail();
    }

    // if the form had initial values, update the selected item
    if (initialValues._id) {
      return updateItem(receipt.items, initialValues._id, values);
    }

    // if no selected item, create a new item
    return createItem(values);
  }

  // RENDER ITEM FORM
  render() {
    const { handleSubmit, receipt } = this.props;

    return (
      <form 
        className="card-panel form"
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      >
        <h5>Itemize the receipt</h5>
        <hr />
        <span className="error">{receipt.itemError}</span>
        <h5>Category</h5>
        <Field
          name="category"
          component="input"
          type="text"
          placeholder="category"
        />
        <h5>Cost</h5>
        <Field
          parse={value => Number(value)}
          name="cost"
          component="input"
          type="number"
          placeholder="0.00"
          step=".01"
        />
        <h5>Description</h5>
        <Field
          name="description"
          component="input"
          type="text"
          placeholder="category"
        />
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
  return { receipt: state.receipts, initialValues: state.receipts.selectedItem };
};

const formConfig = reduxForm({
  form: 'ItemForm',
  enableReinitialize: true
})(ItemForm);

export default connect(
  mapStateToProps, { 
    createItem, 
    submitItemFail,
    updateItem
  }
)(formConfig);
