import AboutMe from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import "./Main.css";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";


export default function Main() {
  return (
    <main className="content">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  );
}
