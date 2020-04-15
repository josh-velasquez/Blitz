import React from "react";
import _ from "lodash";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchProfile, editProfile } from "../../actions";
import { Field, reduxForm } from "redux-form";
import Placeholder from "./profile.jpeg";

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchProfile({ id: this.props.match.params.id });
  }

  onSubmit = (formValues) => {
    this.props.editProfile(this.props.match.params.id, formValues);
    this.props.fetchProfile({ id: this.props.match.params.id });
  };

  renderActions() {
    return (
      <React.Fragment>
        <button
          className="ui button primary"
          onClick={this.props.handleSubmit(this.onSubmit)}
        >
          Update
        </button>
        <button className="ui button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </React.Fragment>
    );
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label className="white-text">{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderTextArea = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label className="white-text">{label}</label>
        <textarea {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderContent() {
    return (
      <form
        className="ui form error"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <img
          src={Placeholder}
          className="ui image centered circular"
          height="150"
          alt="Avatar"
        />
        <Field name="username" component={this.renderInput} label="Username" />
        <Field name="bio" component={this.renderTextArea} label="Bio" />
      </form>
    );
  }

  render() {
    return (
      <Modal
        title="Profile"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.goBack()}
      />
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.username) {
    errors.username = "You must enter a Username";
  }
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: _.pick(
      state.profiles[ownProps.match.params.id],
      "username",
      "bio"
    ),
    enableReinitialize: true,
  };
};

const formWrapped = reduxForm({
  form: "editProfile",
  validate,
})(Profile);

export default connect(mapStateToProps, { fetchProfile, editProfile })(
  formWrapped
);
