import './App.css';
import AppRouter from './Components/AppRouter';
import { UserProvider } from './Components/common/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <AppRouter />
      </div>
    </UserProvider>
  );
}

export default App;
