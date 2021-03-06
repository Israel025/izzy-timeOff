import React from "react";
import axios from "axios";
import env from "../../env";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../../assets/styles/SignUp.css";
import Side from "../../assets/images/side2.jpg";
import SignupBtn from "../common/SignupBtn";
import { Link } from "react-router-dom";
import FormValidator from "../common/FormValidator";
import Swal from "sweetalert";

const locale =
  "en-US" ||
  "ar" ||
  "ar-AE" ||
  "ar-BH" ||
  "ar-DZ" ||
  "ar-EG" ||
  "ar-IQ" ||
  "ar-JO" ||
  "ar-KW" ||
  "ar-LB" ||
  "ar-LY" ||
  "ar-MA" ||
  "ar-QA" ||
  "ar-QM" ||
  "ar-SA" ||
  "ar-SD" ||
  "ar-SY" ||
  "ar-TN" ||
  "ar-YE" ||
  "bg-BG" ||
  "cs-CZ" ||
  "da-DK" ||
  "de-DE" ||
  "el-GR" ||
  "en-AU" ||
  "en-GB" ||
  "en-HK" ||
  "en-IN" ||
  "en-NZ" ||
  "en-ZA" ||
  "en-ZM" ||
  "es-ES" ||
  "fr-FR" ||
  "hu-HU" ||
  "it-IT" ||
  "nb-NO" ||
  "nl-NL" ||
  "nn-NO" ||
  "pl-PL" ||
  "pt-BR" ||
  "pt-PT" ||
  "ru-RU" ||
  "sk-SK" ||
  "sr-RS" ||
  "sr-RS@latin" ||
  "sv-SE" ||
  "tr-TR" ||
  "uk-UA";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: "signupFname",
        method: "isEmpty",
        validWhen: false,
        message: "Firstname is Required."
      },
      {
        field: "signupFname",
        method: "isAlpha",
        args: [locale],
        validWhen: true,
        message: "Single word of alphabets only."
      },
      {
        field: "signupLname",
        method: "isEmpty",
        validWhen: false,
        message: "Lastname is required."
      },
      {
        field: "signupLname",
        method: "isAlpha",
        args: [locale],
        validWhen: true,
        message: "Single word of alphabets only."
      },
      {
        field: "signupEmail",
        method: "isEmpty",
        validWhen: false,
        message: "Email is required."
      },
      {
        field: "signupEmail",
        method: "isEmail",
        validWhen: true,
        message: "That is not a valid email."
      },
      {
        field: "signupPass",
        method: "isEmpty",
        validWhen: false,
        message: "Password is required."
      },
      {
        field: "signupPassConfirm",
        method: "isEmpty",
        validWhen: false,
        message: "Retype Password."
      },
      {
        field: "signupPassConfirm",
        method: this.passwordMatch, // notice that we are passing a custom function here
        validWhen: true,
        message: "Password do not match."
      },
      {
        field: "signupCoy",
        method: "isEmpty",
        validWhen: false,
        message: "Company name is Required."
      },
      {
        field: "signupCoy",
        method: "matches",
        args: [
          /([a-zA-Z\d]{1}[a-zA-Z\d]*[\s]{0,1}[a-zA-Z\d])+([\s]{0,1}[a-zA-Z\d]+)/
        ],
        validWhen: true,
        message: "Invalid entry."
      },
      {
        field: "signupPost",
        method: "isEmpty",
        validWhen: false,
        message: "Post is Required."
      },
      {
        field: "signupPost",
        method: "matches",
        args: [/([a-zA-Z]{1}[a-zA-Z]*[\s]{0,1}[a-zA-Z])+([\s]{0,1}[a-zA-Z]+)/],
        validWhen: true,
        message: "Alphabets only."
      },
      {
        field: "signupDept",
        method: "isEmpty",
        validWhen: false,
        message: "Company name is Required."
      },
      {
        field: "signupDept",
        method: "matches",
        args: [/([a-zA-Z]{1}[a-zA-Z]*[\s]{0,1}[a-zA-Z])+([\s]{0,1}[a-zA-Z]+)/],
        validWhen: true,
        message: "Alphabets only."
      },
      {
        field: "signupManager",
        method: "isEmpty",
        validWhen: false,
        message: "Manager name is Required."
      },
      {
        field: "signupManager",
        method: "matches",
        args: [/([a-zA-Z]{1}[a-zA-Z]*[\s]{0,1}[a-zA-Z])+([\s]{0,1}[a-zA-Z]+)/],
        validWhen: true,
        message: "Alphabets only."
      },
      {
        field: "signupPhone",
        method: "isEmpty",
        validWhen: false,
        message: "Phone number is Required."
      },
      {
        field: "signupPhone",
        method: "matches",
        args: [/^\(?\d\d\d\)? ?\d\d\d\d-?\d\d\d\d$/], // args is an optional array of arguements that will be passed to the validation method
        validWhen: true,
        message: "Invalid phone number (11 digits only)."
      },
      {
        field: "signupDob",
        method: "isEmpty",
        validWhen: false,
        message: "Date of birth is Required."
      },
      {
        field: "signupCity",
        method: "isEmpty",
        validWhen: false,
        message: "Company name is Required."
      },
      {
        field: "signupCity",
        method: "matches",
        args: [/([a-zA-Z]{1}[a-zA-Z]*[\s]{0,1}[a-zA-Z])+([\s]{0,1}[a-zA-Z]+)/],
        validWhen: true,
        message: "Alphabets only."
      },
      {
        field: "signupState",
        method: "isEmpty",
        validWhen: false,
        message: "Company name is Required."
      },
      {
        field: "signupState",
        method: "matches",
        args: [/([a-zA-Z]{1}[a-zA-Z]*[\s]{0,1}[a-zA-Z])+([\s]{0,1}[a-zA-Z]+)/],
        validWhen: true,
        message: "Alphabets only."
      }
    ]);

    this.state = {
      signupFname: "",
      signupLname: "",
      signupEmail: "",
      signupPass: "",
      signupPassConfirm: "",
      signupCoy: "",
      signupPost: "",
      signupDept: "",
      signupManager: "",
      signupPhone: "",
      signupDob: "",
      signupGender: "",
      signupMstatus: "",
      signupCountry: "",
      signupCity: "",
      signupState: "",
      validation: this.validator.valid()
    };

    this.submitted = false;
  }
  componentDidMount() {
    const token = localStorage.getItem("timeoff-token");

    if (token) {
      return this.props.history.push("/employee-dash");
    }
  }

  passwordMatch = (confirmation, state) => state.signupPass === confirmation;

  handleInputChange = event => {
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = async event => {
    event.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      const regData = {
        first_name: this.state.signupFname,
        last_name: this.state.signupLname,
        email: this.state.signupEmail,
        password: this.state.signupPass,
        company_name: this.state.signupCoy,
        designation: this.state.signupPost,
        department: this.state.signupDept,
        manager_name: this.state.signupManager,
        phone_number: this.state.signupPhone,
        dob: this.state.signupDob,
        city: this.state.signupCity,
        state: this.state.signupState,
        gender: this.state.signupGender,
        marital_status: this.state.signupMstatus,
        country: this.state.signupCountry
      };

      try {
        const res = await axios.post(`${env.api}/user/`, regData);

        const token = res.data.data.token;

        localStorage.setItem("timeoff-token", token);

        Swal({
          title: "Sign-up Successful",
          icon: "success",
          button: "Okay",
          timer: 2000
        });

        this.props.history.push("/employee-dash");
      } catch (err) {
        console.log("an error occured", err);
      }
    }
  };

  render() {
    let validateSignup = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;

    return (
      <div className=".mx-auto px-0">
        <div>
          <Header />
        </div>
        <div className="row index">
          <div className="col-md-4">
            <Link to="/sign-up">
              <SignupBtn />
            </Link>
            <img className="index" alt="sideBar" src={Side} />
          </div>
          <div className="col-md-8">
            <form className="needs-validation signupPos" noValidate>
              <div className="form-row">
                <div
                  className={`col-md-6 mb-3 ${validateSignup.signupFname
                    .isInValid && "has-error"}`}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="signupFname"
                    name="signupFname"
                    onChange={this.handleInputChange}
                    placeholder="First name"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupFname.message}
                  </span>
                </div>

                <div
                  className={`col-md-6 mb-3 ${validateSignup.signupLname
                    .isInValid && "has-error"}`}
                >
                  
                  <input
                    type="text"
                    className="form-control"
                    id="signupLname"
                    name="signupLname"
                    onChange={this.handleInputChange}
                    placeholder="Last name"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupLname.message}
                  </span>
                </div>
              </div>

              <div className="form-row">
                <div
                  className={`col-md-4 mb-3 ${validateSignup.signupEmail
                    .isInValid && "has-error"}`}
                >
                  <input
                    type="email"
                    className="form-control"
                    id="signupEmail"
                    name="signupEmail"
                    onChange={this.handleInputChange}
                    placeholder="user@domain.com"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupEmail.message}
                  </span>
                </div>

                <div
                  className={`col-md-4 mb-3 ${validateSignup.signupPass
                    .isInValid && "has-error"}`}
                >
                  <input
                    type="password"
                    className="form-control"
                    id="signupPass"
                    name="signupPass"
                    onChange={this.handleInputChange}
                    placeholder="password"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupPass.message}
                  </span>
                </div>

                <div
                  className={`col-md-4 mb-3 ${validateSignup.signupPassConfirm
                    .isInValid && "has-error"}`}
                >
                  <input
                    type="password"
                    className="form-control"
                    id="signupPassConfirm"
                    name="signupPassConfirm"
                    onChange={this.handleInputChange}
                    placeholder="re-type password"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupPassConfirm.message}
                  </span>
                </div>
              </div>

              <div className="form-row">
                <div
                  className={`col-md-6 mb-3 ${validateSignup.signupCoy
                    .isInValid && "has-error"}`}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="signupCoy"
                    name="signupCoy"
                    onChange={this.handleInputChange}
                    placeholder="your company's name"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupCoy.message}
                  </span>
                </div>

                <div
                  className={`col-md-6 mb-3 ${validateSignup.signupPost
                    .isInValid && "has-error"}`}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="signupPost"
                    name="signupPost"
                    onChange={this.handleInputChange}
                    placeholder="your designation in your company"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupPost.message}
                  </span>
                </div>
              </div>
              <div className="form-row">
                <div
                  className={`col-md-6 mb-3 ${validateSignup.signupDept
                    .isInValid && "has-error"}`}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="signupDept"
                    name="signupDept"
                    onChange={this.handleInputChange}
                    placeholder="your department"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupDept.message}
                  </span>
                </div>

                <div
                  className={`col-md-6 mb-3 ${validateSignup.signupManager
                    .isInValid && "has-error"}`}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="signupManager"
                    name="signupManager"
                    onChange={this.handleInputChange}
                    placeholder="your manager's name"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupManager.message}
                  </span>
                </div>
              </div>

              <div className="form-row">
                <div
                  className={`form-group col-md-3 ${validateSignup.signupPhone
                    .isInValid && "has-error"}`}
                >
                  <input
                    type="phone"
                    className="form-control"
                    id="signupPhone"
                    name="signupPhone"
                    onChange={this.handleInputChange}
                    placeholder="Tel: 08012345678"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupPhone.message}
                  </span>
                </div>

                <div
                  className={`form-group col-md-3 ${validateSignup.signupDob
                    .isInValid && "has-error"}`}
                >
                  <input
                    type="date"
                    className="form-control"
                    name="signupDob"
                    onChange={this.handleInputChange}
                    placeholder="Date of Birth"
                    id="signupDob"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupDob.message}
                  </span>
                </div>

                <div className="form-group col-md-3">
                  <select
                    className="custom-select"
                    name="signupGender"
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <span className="help-block SignupError" />
                </div>

                <div className="form-group col-md-3">
                  <select
                    className="custom-select"
                    name="signupMstatus"
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="engaged">Engaged</option>
                  </select>
                  <span className="help-block SignupError" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-3 mb-3">
                  <select
                    className="custom-select"
                    onChange={this.handleInputChange}
                    name="signupCountry"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="France">France</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Australia">Australia</option>
                    <option value="Mexico">Mexico</option>
                  </select>
                  <div className="invalid-feedback">Select a country</div>
                </div>

                <div
                  className={`col-md-5 mb-3 ${validateSignup.signupCity
                    .isInValid && "has-error"}`}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="signupCity"
                    name="signupCity"
                    onChange={this.handleInputChange}
                    placeholder="City"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupCity.message}
                  </span>
                </div>

                <div
                  className={`col-md-4 mb-3 ${validateSignup.signupState
                    .isInValid && "has-error"}`}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="signupState"
                    name="signupState"
                    onChange={this.handleInputChange}
                    placeholder="State"
                    required
                  />
                  <span className="help-block SignupError">
                    {validateSignup.signupState.message}
                  </span>
                </div>
              </div>

              <div className="form-group signupBtnPos">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="invalidCheck"
                    required
                  />
                  <label className="form-check-label" htmlFor="invalidCheck">
                    Agree to terms and conditions
                  </label>
                  <div className="invalid-feedback">
                    You must agree before submitting.
                  </div>
                </div>
              </div>
              <div className="form-row signupBtnPos">
                <button
                  type="submit"
                  onClick={this.handleFormSubmit}
                  className="btn btn-primary"
                >
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default SignUp;
