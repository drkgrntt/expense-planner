import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchCollections } from '../actions';

class IndexCollections extends Component {
  componentDidMount() {
    this.props.fetchCollections();
  }

  // RENDER EACH INDIVIDUAL COLLECTION OF EXPENSES
  renderCollectionList() {
    const { collections } = this.props;

    if (collections[0] === undefined) {
      return <h4>No collections</h4>;
    }

    return _.map(collections, collection => {
      return (
        <li key={collection._id}>
          <h4>Nashville Trip</h4>
          <h5 style={{ display: "inline-block" }}>Total Cost: ${collection.total.toFixed(2)}</h5>
          <Link to={`/collections/${collection._id}`} className="btn green lighten-2 right">
            Expenses
          </Link>
          <hr />
        </li>
      );
    });
  }

  render() {
    return (
      <div style={{ marginBottom: 30 }}>
        <h3 className="outline">Collections</h3>
        <div className="card-panel list">
          <hr />
          <ul>{this.renderCollectionList()}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { collections: state.collections };
};

export default connect(mapStateToProps, { fetchCollections })(IndexCollections);
