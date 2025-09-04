import MainPage from "../components/mainPage";
import SecondPage from "../components/secondPage";
import './mainandsecondpage.css'

const MainandSecondPage = ({ isSmallScreen }) => {
  return (
    <div className="mscon">
      <MainPage isSmallScreen={isSmallScreen}/>
      <SecondPage isSmallScreen={isSmallScreen}/>
    </div>
  );
};

export default MainandSecondPage;