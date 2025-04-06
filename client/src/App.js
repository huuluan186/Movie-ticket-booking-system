import { Routes,Route } from "react-router-dom";
import { path } from "./utils/constant";
// import './assets/styles/main.scss'
import { Home, Login } from "./containers/Public";

function App() {
  return (
    <div className="h-screen w-screen bg-primary">
        <Routes>
            <Route path={path.HOME} element={<Home />}>
                {/* Login là route con của Home */}
                <Route path={path.LOGIN} element={<Login />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;