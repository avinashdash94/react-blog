import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions';// impoted the action to send user data to Action then Reducer then get the responce

class RegisterLogin extends Component {
    state = {
        email: "",
        password: "",
        errors: []
    };

    displayErrors = errors =>
        errors.map((error, i) => <p key={i}>{error}</p>);

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitForm = event => {
        event.preventDefault();

        //Get the data from UI form 
        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password
        };

        //Validate the user input data before submit
        if(this.isFormvalid(this.state)){
            this.setState({errors: []}); //if data is valid it will make error empty
            this.props.dispatch(loginUser(dataToSubmit)) //we send user login data to loginUser() is Action which again further called reducer then get the responce
            .then(response => {
                console.log( response)
                if(response.payload.loginSuccess){ //If login successfull the show home page
                    this.props.history.push('/') 
                }
                else{ //if not successfull then add error 
                    this.setState({
                        errors: this.state.errors.concat(
                            "FailED to log in, you can check your Email and Password"
                        )
                    })
                }
            })
        }
        else{
            this.setState({
                errors: this.state.errors.concat("Form is not valid")
            })
        }

    }

    //if we have email and Password both then form is valid
    isFormvalid = ({email, password}) =>  email && password; // we destructure the email and passward password from state which is passed as param for validation
       
    

    render() {
        return (
            <div className="containre">
                <h2>Login</h2>
                <div className="row">
                    <form className="col s12" >                        
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
                                <label htmlFor="email">Email</label>
                                <span className="helper-text"
                                    data-error=" Type a right type email"
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
                                <label htmlFor="password">Password</label>
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
                                    Login
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

export default connect(mapStateToProps)( RegisterLogin); // The connect() function connects a React component to a Redux store.