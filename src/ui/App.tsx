import "./App.css";
import { CharactersSmart } from "./smarts/CharactersSmart";
import reactLogo from "./assets/react.svg";

function App() {
  return (
    <>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <CharactersSmart></CharactersSmart>
    </>
  );
}

export default App;
