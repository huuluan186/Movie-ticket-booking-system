import { Routes, Route, Navigate } from "react-router-dom";
import { path } from "./utils/constant";
import { Home } from "./containers/Public";
function App() {
    return (
      <div className="bg-orange-400">
        <Routes>
            <Route path={path.HOME} element={<Home/>}>
            </Route>
        </Routes>
      </div>
    );
  }
  
export default App;
