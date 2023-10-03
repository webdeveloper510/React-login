import './App.css';
import routes from './routes';
import { useRoutes } from 'react-router-dom';
function App() {
  const routing = useRoutes(routes);
  return (
    <>
      <div>
      {routing}
      </div>
    </>
  );
}

export default App;
