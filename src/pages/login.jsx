import LoginForm from "../components/login/LoginForm";
import './login.css'
import Redirect from "../components/Redirect";
import LoginPageTitle from "../components/login/LoginPageTitle";
const login =() => {
  return (
    <div className="login-page">
      <LoginPageTitle />
      <LoginForm />
      <div className="register-link">
      <Redirect message='If you dont have an account' route='/register' redirectLinkTo='Register' />
      </div>
     
    </div>
  )
}

export default login
