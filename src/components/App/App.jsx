import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import './App.css'

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [registrationLink, setRegistrationLink] = useState('');
  const [headerButttonText, setHeaderButtonText] = useState('Войти');
  return (
    <div className="page">
      <Header isLogin={isLogin} headerButttonText={headerButttonText} registrationLink={registrationLink} />
      <Main />
    </div>
  );
}

export default App;
