import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";

import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import LandingPage from "./pages/Dashboard/landing";
import Splash from "./pages/Dashboard/splash";
import SettingsPage from "./components/education/EducationLists";
import Positions from "./pages/Dashboard/Positions";


export default function App() {  
 
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          {/* <Route path="/" element={<Splash />} /> */}
          <Route  element={<AppLayout />}>
            <Route  index path="/dashboard"  element={<Home />}/>                            
            <Route  index path="/setting"  element={<SettingsPage />}/>                            
            <Route  index path="/positions"  element={<Positions />}/>                            
          </Route>
          <Route path="/" element={<LandingPage />} />
          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
