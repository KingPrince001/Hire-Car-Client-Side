import RegisterForm from "../components/register/RegisterForm";
import Redirect from "../components/Redirect";
import './register.css';

const Register = () => {
    return (<div className="register-page">
      <div className="register-form">
       <RegisterForm />
          
      </div>
      <div >
      <Redirect message="If you already have an account" redirectLinkTo="Login" route="/login" />
      </div>
      </div>
    )
  }
  
  export default Register;
  