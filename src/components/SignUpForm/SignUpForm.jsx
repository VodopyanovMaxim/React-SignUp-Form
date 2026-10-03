import { Component } from "react";
import style from "./SignUpForm.module.css";
import { TfiGallery } from "react-icons/tfi";

const INIT_VALS = {
  fullname: "",
  email: "",
  password: "",
  isChecked: false,
  isFullnameValid: false,
  isEmailValid: false,
  isPasswordValid: false,
};

const FORM_REGEX = {
  fullname: /^[A-Z][a-z]{1,20}(?:-[A-Z][a-z]{1,20}| [A-Z][a-z]{1,20})?$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/,
  password:
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*_\-])[A-Za-z0-9@#$%^&*_\-]{8,16}$/,
};

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: INIT_VALS.fullname,
      email: INIT_VALS.email,
      password: INIT_VALS.password,
      isFullnameValid: false,
      isEmailValid: false,
      isPasswordValid: false,
      isChecked: INIT_VALS.isChecked,
    };
  }

  handleNameChange = ({ target: { value } }) => {
    this.setState({
      fullname: value,
      isFullnameValid: FORM_REGEX.fullname.test(value),
    });
  };

  handleEmailChange = ({ target: { value } }) => {
    this.setState({ email: value, isEmailValid: FORM_REGEX.email.test(value) });
  };

  handlePasswordChange = ({ target: { value } }) => {
    this.setState({
      password: value,
      isPasswordValid: FORM_REGEX.password.test(value),
    });
  };

  handleTOSChange = (e) => {
    this.setState({ isChecked: e.target.checked });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(INIT_VALS);
  };

  render() {
    const {
      fullname,
      email,
      password,
      isChecked,
      isFullnameValid,
      isEmailValid,
      isPasswordValid,
    } = this.state;
    const nameInputClass = `${style["form-input"]} ${fullname && (isFullnameValid ? style["form-valid"] : style["form-invalid"])}`;
    const emailInputClass = `${style["form-input"]} ${email && (isEmailValid ? style["form-valid"] : style["form-invalid"])}`;
    const passwordInputClass = `${style["form-input"]} ${password && (isPasswordValid ? style["form-valid"] : style["form-invalid"])}`;
    return (
      <article className={style["form-wrap"]}>
        <form className={style["form"]}>
          <span className={style["image-upload"]}>
            <TfiGallery color="white" fontSize="2rem" />
          </span>
          <h1 className={style["form-title"]}>Create Your Account</h1>
          <label className={style["form-label"]} htmlFor="fullname">
            FULL NAME
          </label>
          <input
            className={nameInputClass}
            type="text"
            name="fullname"
            placeholder="John Doe"
            tabIndex="1"
            onChange={this.handleNameChange}
            value={fullname}
          />
          <label className={style["form-label"]} htmlFor="email">
            EMAIL ADDRESS
          </label>
          <input
            className={emailInputClass}
            type="text"
            name="email"
            placeholder="johndoe@gmail.com"
            tabIndex="2"
            onChange={this.handleEmailChange}
            value={email}
          />
          <label className={style["form-label"]} htmlFor="password">
            PASSWORD
          </label>
          <input
            className={passwordInputClass}
            type="password"
            name="email"
            placeholder="Password"
            tabIndex="3"
            onChange={this.handlePasswordChange}
            value={password}
            title={`Password must:
                \n - be 8-16 characters long;
                \n - have at least one capitalised letter;
                \n - have at least one special symbol;
                \n - have at least one digit.`}
          />
          <div className={style["form-group"]}>
            <input
              className={style["form-input"]}
              type="checkbox"
              id="terms"
              name="terms"
              tabIndex="4"
              onChange={this.handleTOSChange}
              checked={isChecked}
            />
            <label htmlFor="terms" className={style["label-checkbox"]}>
              I Agree All Statements In Terms Of Service
            </label>
          </div>
          <button
            className={style["form-button"]}
            tabIndex="5"
            onClick={this.handleSubmit}
          >
            Sign Up
          </button>
          <p className={style["bold"]}>
            I`m already a member!{" "}
            <a href="" target="_self">
              Sign In
            </a>
          </p>
        </form>
      </article>
    );
  }
}
