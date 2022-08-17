import {BrowserRouter,Routes,Route} from "react-router-dom"
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { PrivateRoute } from "./pages/PrivateRoute";
import { SetAvatar } from "./pages/SetAvatar";
import { UserContextProvider } from "./context/UserContext";


function App() {
  return (
    <BrowserRouter>
    <UserContextProvider>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<PrivateRoute><Chat/></PrivateRoute>}/>
      <Route path="/setAvatar" element={<SetAvatar/>}/>
    </Routes>
    </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
