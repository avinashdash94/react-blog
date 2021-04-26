import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { registerUSer } from '../../actions/user_actions';// impoted the action to send user data to Action then Reducer then get the responce


class Register extends Component {

    state = {
        lastname: "",
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: []
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    //To display the error
    displayErrors = errors =>
        errors.map((error, i) => <p key={i}>{error}</p>);


    isFormValid = () => {
        let errors = [];
        let error;

        //Check for any field is empty or not
        if(this.isFormEmpty(this.state)){
            error = {messabe: "Fill on all fields"};
            this.setState({errors: errors.concat(error)});
        }
        //Chek for password length should not be less than 6 and should be match with confirm password
        else if(!this.isPasswordValid(this.state)){
            error = {messabe: "Password is invalid"};
            this.setState({errors: errors.concat(error)});
        }
        else{
            return true;
        }
    }

    //Check for any field is empty or not
    isFormEmpty = ({lastname, name, email, password, passwordConfirmation}) =>{
        
        //If any of the length is emty or null it will return true
        return(
            !lastname.length ||
            !name.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        )
    }

    //To check password and confirm password are same or not
    isPasswordValid  = ({password, passwordConfirmation}) =>{
        //Check password should not be less then 6
        if(password.length < 6 ||  passwordConfirmation.length < 6)
            return false;
        else if (password !== passwordConfirmation){
            return false;
        }
        else{
            return true;
        }
    }

    submitForm = event =>{
        event.preventDefault();

        let dataTosubmit = {
            email: this.state.email,
            name: this.state.name,
            lastname: this.state.lastname,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation

        }
        
        if(this.isFormValid()){
            //If no Error then make error empty
            this.setState({errors: []});
            this.props.dispatch(registerUSer(dataTosubmit))
            .then(response =>{
                console.log(response);
                if(response.payload.success){
                    this.props.history.push('/login');

                }
                else{
                    this.setState({
                        errors: this.state.errors.concat(
                            "Your attempt to send data to DB was failed"
                        )
                    })
                }
            })
            .catch(err =>{
                this.setState({
                    errors: this.state.errors.concat(err)
                })
            });
        }
        else{//if form is not valid
            console.log("form is not valid");

        }
    }

    render() {
        return (
            <div className="containre">
                <h2>Sign Up</h2>
                <div className="row">
                    <form className="col s12" >                        
                        <div className="row">                         
                            <div className="input-field col s12">
                                <input
                                    name="lastname"
                                    value={this.state.lastname}
                                    onChange={e => this.handleChange(e)}
                                    id="lastname"
                                    type="text"
                                    className="validate"
                                />
                                <label className="active" htmlFor="lastname">lastname</label>
                                <span className="helper-text"
                                    data-error=" Type a right type email"
                                    data-success="right"
                                />
                            </div>                           
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input
                                    name="name"
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                    id="name"
                                    type="text"
                                    className="validate"
                                />
                                <label className="active" htmlFor="name">name</label>
                                <span className="helper-text"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>                            
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                            <input
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                    id="email"
                                    type="email"
                                    className="validate"
                                />
                                <label className="active" htmlFor="email">email</label>
                                <span className="helper-text"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>                            
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                            <input
                                    name="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                    id="password"
                                    type="password"
                                    className="validate"
                                />
                                <label className="active" htmlFor="password">Password</label>
                                <span className="helper-text"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>                            
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                            <input
                                    name="passwordConfirmation"
                                    value={this.state.passwordConfirmation}
                                    onChange={e => this.handleChange(e)}
                                    id="passwordConfirmation"
                                    type="password"
                                    className="validate"
                                />
                                <label className="active" htmlFor="passwordConfirmation">Password Confirmation</label>
                                <span className="helper-text"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>                            
                        </div>

                        {/* Error Panel */}
                        {this.state.errors.length > 0 && (
                            <div>
                                {this.displayErrors(this.state.errors)}
                            </div>
                        )}

                        {/* Submit button */}

                        <div className="row">
                            <div className="col s12">
                                <button className="btn waves-effect red lighten-2"
                                type="submit"
                                name="action"
                                onClick={this.submitForm}
                                >
                                    Create an account
                                </button> 
                            </div>

                            
                        </div>
                    </form>

                </div>
            </div>
       
        );
    }
}


function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)( Register); // The connect() function connects a React component to a Redux store.
