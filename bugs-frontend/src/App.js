import logo from './logo.svg';
import './App.css';
import Bugs from "./components/Bugs"
import configureStore  from './store/configureStore';
import {Provider}from 'react-redux'
import BugsList from './components/Bugslist';

const store = configureStore();

function App() {
  return (
    <Provider store = {store}>
      <BugsList />
    </Provider>
  );
}

export default App;
