import { useState } from "react";
import Header from "../Header/Header";


function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div >
      <Header isLogin={isLogin} />
    </div>
  );
}

export default App;
