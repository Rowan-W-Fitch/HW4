import logo from './logo.svg';
import './App.css';
import{
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from './pages/home/home'
import Result from './pages/result/results'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/result/:name">
          <Result />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
