//resources
import tennisImg from '../../Img/tennisImg.jpg'

//components
import LoginForm from '../../components/Login/LoginForm'

//style
import '../../styles/login.css'

export const Login = () => {
  return (
    <div id="login-frame">
      <div id="nav-div">
        <img src={tennisImg} alt="Banner club de tenis" id="nav-img" />
      </div>
      <div id="login-form-component">
        <div id="login-header">
          <div id="login-header-fist"></div>
          <div id="login-header-medium"></div>
          <div id="login-header-last"></div>
        </div>
        <div id="logo"></div>
        <LoginForm />
      </div>
    </div>
  )
}
