import './App.css';
import Wordle from './views/Wordle/';
import AddToHomeScreen from '@ideasio/add-to-homescreen-react'

function App() {
  return (
    <div>
      <AddToHomeScreen />
      <Wordle />
    </div>
  );
}

export default App;
