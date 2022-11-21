import { Routes, Route, useLocation } from "react-router-dom";
import ListOfRoutingDots from "./components/macros/ListOfRoutingDots";
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


function App() {
  const location = useLocation();

  if(localStorage.getItem('isLogged')) {

  } else {
    localStorage.setItem('isLogged', false)
  }

  return (
    <div className="flex min-h-screen bg-slate-300 items-center justify-center">
      <div className={`
      ${(location.pathname !== "/diet" && location.pathname !== "/progress" && location.pathname !== "/photos" ) 
      && "flex absolute min-w-min aspect-square bg-transparent items-center justify-center p-20 z-0"}
      ${(location.pathname === "/diet" || location.pathname === "/progress" || location.pathname === "/photos" ) 
      && "flex absolute min-w-[95%] min-h-[95%] bg-transparent items-center justify-center z-0"}
      `}>
        <div className={`
        ${location.pathname === "/login" && "bg-blue-600 shadow-blue-600 min-w-[420px] aspect-[1/1] rounded-full "}
        ${location.pathname === "/" && "bg-blue-600 shadow-blue-600 min-w-[420px] aspect-[1/1] rounded-full "}
        ${location.pathname === "/account" && "bg-yellow-500 shadow-yellow-500 min-w-[420px] aspect-[1/1] rounded-full "}
        ${location.pathname === "/calorie-calculator" && "shadow-pink-500 bg-pink-500 min-w-[420px] aspect-[1/1] rounded-full "}
        ${location.pathname === "/fat-percentage" && "shadow-teal-400 bg-teal-400 min-w-[420px] aspect-[1/1] rounded-full "}
        ${location.pathname === "/bmi" && "shadow-black bg-black min-w-[420px] aspect-[1/1] rounded-full "}
        ${location.pathname === "/diet" && "shadow-white bg-white min-w-[68%] max-w-[68%] aspect-[2/1] rounded-3xl "}
        ${location.pathname === "/progress" && "shadow-emerald-500 bg-emerald-500 min-w-[68%] aspect-[2/1] rounded-3xl "}
        ${location.pathname === "/photos" && "shadow-violet-500 bg-violet-500 min-w-[68%] max-w-[68%] aspect-[2/1] rounded-3xl "}
        flex items-center p-8 justify-center z-0 shadow-md
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
        {location.pathname !== "/login" && <ListOfRoutingDots/>}
      </div>
      
    </div>
  );
}

export default App;
