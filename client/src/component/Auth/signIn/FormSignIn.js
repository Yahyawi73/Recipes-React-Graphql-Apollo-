import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const initialState = {
    userName: "",
    email: "",
    password: "",
    data: null,
    error: null,
};

class SignIn extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };
    state = { ...initialState }

    handleChange = event => {
        event.preventDefault();
        let formValue = {};
        const { name, value } = event.target;
        formValue[name] = value;
        this.setState({ ...formValue });
    }

    clearState = () => {
        this.setState({ ...initialState })
    }
    validateForm = () => {
        const { userName, email, password } = this.state;
        const isInValid = !userName || !email || !password;
        return isInValid;
    }
    render() {
        const { userName, email, password } = this.state;
        const { onSubmit } = this.props;
        return (
            <div className="App">
                <h2 className="App">Sign In</h2>
                <form className="form" onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({
                        variables: {
                            inputUserSign: {
                                userName,
                                email,
                                password
                            }
                        }
                    })
                        .then(async ({ data: { signinUser: { token } } }) => {
                            localStorage.setItem('token', token)
                            await this.props.refetch();
                            this.clearState();
                            this.props.history.push('/');
                        })
                }}>
                    <input type="text" name="userName" placeholder="userName" value={userName} onChange={this.handleChange} />
                    <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
                    {this.state.error && <p className="error-message"> Auth fail </p>}
                    <button disabled={this.validateForm()} type="submit" className="button-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(SignIn);