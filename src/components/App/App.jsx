import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import './App.css'
import Footer from "../Footer/Footer";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [registrationLink, setRegistrationLink] = useState('');
  const [headerButttonText, setHeaderButtonText] = useState('Войти');
  return (
    <div className="page">
      <Header isLogin={isLogin} headerButttonText={headerButttonText} registrationLink={registrationLink} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
