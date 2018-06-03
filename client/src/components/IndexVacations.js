import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchVacations } from '../actions';

class IndexVacations extends Component {
  componentDidMount() {
    this.props.fetchVacations();
  }

  // RENDER EACH INDIVIDUAL VACATION OF EXPENSES
  renderVacationList() {
    const { vacations } = this.props;

    if (vacations[0] === undefined) {
      return <h4>No vacations</h4>;
    }

    return _.map(vacations, vacation => {
      return (
        <li className="vacation" key={vacation._id}>
          <h4>{vacation.title}</h4>
          <p className="margin20">{vacation.description}</p>
          <hr />
          <h5 style={{ display: "inline-block" }}>Total Cost: ${vacation.total.toFixed(2)}</h5>
          <br />
          <Link to={`/vacations/${vacation._id}`} className="btn green lighten-2">
            Expenses
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div style={{ marginBottom: 30 }}>
        <h3 className="outline">Vacations</h3>
        <div className="card-panel list">
          <ul>{this.renderVacationList()}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { vacations: state.vacations };
};

export default connect(mapStateToProps, { fetchVacations })(IndexVacations);
