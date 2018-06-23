import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser, registerUser } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { newUser: false };
  }
  
  onLogin(values) {
    const { loginUser, history } = this.props;

    loginUser(values, history);
  }

  onRegister(values) {
    const { registerUser, history } = this.props;

    registerUser(values, history);
  }

  onSubmit(values) {
    if (this.state.newUser) {
      return this.onRegister(values);
    }

    return this.onLogin(values);
  }

  render() {
    const { user, handleSubmit } = this.props;

    return (
      <div className="authenticate">
        <div className="card-panel list">
          <h4 className="center">Please sign in with your email and password.</h4>
          <hr /><br />
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
            className="container"
          >
            <div className="email-input">
              <h5 style={{ marginBottom: 32 }}>Email</h5>
              <Field
                name="username"
                component="input"
                type="text"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="flexbox">
              <div className="password-input">
                <h5 style={{ marginBottom: 32 }}>Password</h5>
                <Field
                  name="password"
                  component="input"
                  type="password"
                  placeholder="**********"
                />
              </div>
              <div className="password-input">
                <span>
                  <h5>Verify Password</h5>
                  (only if you're a new user)
                </span>
                <Field
                  name="verify"
                  component="input"
                  type="password"
                  placeholder="**********"
                />
              </div>
            </div>
            <div className="center">
              <span className="error">{user.error}</span>
            </div>
            <hr />
            <div className="flexbox">
              <div className="center">
                <h5>Already a user?</h5>
                <button
                  type="submit"
                  className="btn green lighten-2"
                  onClick={() => this.setState({ newUser: false })}
                >
                  Login
                </button>
              </div>
              <br />
              <div className="center">
                <h5>New user?</h5>
                <button
                  type="submit"
                  className="btn green lighten-2"
                  onClick={() => this.setState({ newUser: true })}
                >
                  Register
                </button>
              </div>
              <br />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default reduxForm({
  form: 'LoginForm'
})(
  connect(mapStateToProps, { loginUser, registerUser })(withRouter(Login))
);
