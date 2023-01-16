import { Routes, Route, useLocation } from "react-router-dom";
import Account from "./components/pages/Account";
import BmiCalculator from "./components/pages/BmiCalculator";
import CalorieCalculator from "./components/pages/CalorieCalculator";
import Diet from "./components/pages/Diet";
import FatPercentage from "./components/pages/FatPercentage";
import Login from "./components/pages/Login";
import Main from "./components/pages/Main";
import Progress from "./components/pages/Progress";
import Photos from "./components/pages/Photos"
import PrivateRoute from "./components/controller/PrivateRoute";
import TopRoutingDots from "./components/macros/TopRoutingDots";
import BottomRoutingDots from "./components/macros/BottomRoutingDots";

function App() {
  const location = useLocation();

  if(localStorage.getItem('isLogged')) {

  } else {
    localStorage.setItem('isLogged', false)
  }

  return (
    <div className="flex flex-col w-screen min-h-screen bg-slate-300 items-center justify-center">
      {location.pathname !== "/login" && <TopRoutingDots/>}
      <div className={`
      ${(location.pathname !== "/diet" && location.pathname !== "/progress" && location.pathname !== "/photos" ) 
      && "flex flex-col bg-slate-300 items-center aspect-square justify-center z-0"}
      ${(location.pathname === "/diet" || location.pathname === "/progress" || location.pathname === "/photos" ) 
      && "flex flex-col bg-slate-300 items-center justify-center z-0"}
      `}>
        
        <div className={`
        ${location.pathname === "/login" && "bg-blue-600 shadow-blue-600 flex aspect-[1/1] rounded-full "}
        ${location.pathname === "/" && "bg-blue-600 shadow-blue-600 aspect-[1/1] rounded-full "}
        ${location.pathname === "/account" && "bg-yellow-500 shadow-yellow-500 min-w-[30%]  aspect-[1/1] rounded-full "}
        ${location.pathname === "/calorie-calculator" && "shadow-pink-500 bg-pink-500 min-w-[30%] lg:mx-0 mx-1 lg:aspect-[1/1] rounded-full "}
        ${location.pathname === "/fat-percentage" && "shadow-teal-400 bg-teal-400 lg:min-w-[400px] min-w-[95vw] aspect-[1/1] rounded-full "}
        ${location.pathname === "/bmi" && "shadow-black bg-black min-w-[30%] aspect-[1/1] rounded-full "}
        ${location.pathname === "/diet" && "shadow-white bg-white w-screen min-h-min lg:min-h-min lg:max-w-4xl rounded-3xl "}
        ${location.pathname === "/progress" && "shadow-emerald-500 bg-emerald-500 lg:mx-0 mx-2 lg:min-w-[68%] lg:aspect-[2/1] rounded-3xl "}
        ${location.pathname === "/photos" && "shadow-violet-500 bg-violet-500 lg:max-w-4xl aspect-[2/1] rounded-3xl "}
        flex items-center p-4 justify-center z-0 shadow-md
        `}>
          <Routes>
            <Route path='/' element={<PrivateRoute><Main/></PrivateRoute>}  />
            <Route path='account' element={<PrivateRoute><Account/></PrivateRoute>} />
            <Route path='login' element={<Login/>} />
            <Route path='calorie-calculator' element={<PrivateRoute><CalorieCalculator/></PrivateRoute>} />
            <Route path='fat-percentage' element={<PrivateRoute><FatPercentage/></PrivateRoute>} />
            <Route path='bmi' element={<PrivateRoute><BmiCalculator/></PrivateRoute>} />
            <Route path='diet' element={<PrivateRoute><Diet/></PrivateRoute>}/>
            <Route path='progress' element={<PrivateRoute><Progress/></PrivateRoute>} />
            <Route path='photos' element={<PrivateRoute><Photos/></PrivateRoute>} />
          </Routes>
        </div>
      {location.pathname !== "/login" && <BottomRoutingDots/>} 
      </div>
    </div>
  );
}

export default App;
