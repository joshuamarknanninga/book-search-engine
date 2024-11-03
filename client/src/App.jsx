import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

export const GlobalContext = createContext();

function App() {
  const [state, setState] = useState({ isAuthenticated: false, user: null });

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/saved" component={SavedBooks} />
        </Switch>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
