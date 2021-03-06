import React, { Component } from 'react';

class Login extends Component {
    state = {
        renderRegistrationForm: false
    }

    authenticate(event) {
        event.preventDefault()
        let credentials = {
            email: event.target.email.value,
            password: event.target.password.value,
            password_confirmation: event.target.password_confirmation.value
        }
        let response = await axios.post('http://localhost:3000/api/api/sign_up', credentials)
        let userData = {
            uid: response.headers.uid,
            client: response.headers.client,
            token_type: response.headers.token_type,
            expiry: response.headers.expiry
        }
        localStorage.setItem("credentials", JSON.stringify(userData))
        localStorage.setItem("authenticated", true)
        this.setState({ renderRegistrationForm: false })
    }
	render() {
        return(
            <>
                { this.state.renderRegistrationForm ?
                <form onSubmit={(event) => this.authenticate(event)}>
                    <input type="text" data-cy="email" />
                    <input type="password" name="password" data-cy="password" />  
                    <input type="password" name="password_confirmation" data-cy="password-confirmation" />
                    <input type="submit" value="Register "data-cy="register" />
                </form>     
                :
                    <button 
                    data-cy="register-cta"
                    onClick={() => this.setState({renderRegistrationForm: false})}
                    >
                        Register
                    </button>
                }
            </>
        )
    };
}

export default Login;