import "./App.css";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <div className="container">
      <Navbar />

      <h1>React i18n</h1>

      <p>
        Welcome to my little spot on the interwebs, user
      </p>
      <p>You have count new messages</p>
    </div>
  );
}

export default App;
