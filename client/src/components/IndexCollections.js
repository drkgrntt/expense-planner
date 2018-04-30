import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchCollections } from '../actions';

class IndexCollections extends Component {
  componentDidMount() {
    this.props.fetchCollections();
  }

  // RENDER EACH INDIVIDUAL COLLECTION OF RECEIPTS
  renderCollectionList() {
    const { collections } = this.props;

    if (collections[0] === undefined) {
      return <h4>No collections</h4>;
    }

    return _.map(collections, collection => {
      return (
        <li key={collection._id}>
          <h5>Date Range: {collection.dateRange} || Total Cost: ${collection.total}</h5>
          <Link to={`/collections/${collection._id}`} className="btn green lighten-2 right">
            Receipts
          </Link>
          <br /><br />
          <hr />
        </li>
      );
    });
  }

  render() {
    return (
      <div style={{ marginBottom: 30 }}>
        <h3>Collections</h3>
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
