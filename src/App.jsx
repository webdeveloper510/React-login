import { useEffect } from 'react';
import './App.css';
import routes from './routes';
import { useRoutes } from 'react-router-dom';
import { Outlet, useNavigate } from "react-router";
function App() {
  const routing = useRoutes(routes);
  const navigate = useNavigate();
  // useEffect(() => {
   
  //     navigate("/dashboard")
 
  // }, []);
  return (
    <>
      <div>
        {routing}
      </div>
    </>
  );
}

export default App;
