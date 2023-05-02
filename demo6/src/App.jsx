import "./App.css"
import {Route} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import EditPage from "./Pages/EditPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <div className="app">
          <Route path="/" component={HomePage} exact/>
          <Route path="/data" component={SearchPage} exact/>
          <Route path="/edit/:id" component={EditPage} exact/>
          <Route path="/profile/:id" component={ProfilePage} exact/>

    </div>
  );
}

export default App;
