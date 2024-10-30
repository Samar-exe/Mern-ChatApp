
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { ChatContextProvider } from "./contexts/ChatContext";

function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <>
    <ChatContextProvider user={user}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={user ? <Chat /> : <Login />} />
          <Route exact path="/login" element={user ? <Chat /> : <Login />} />
          <Route exact path="/register" element={user ? <Chat /> : <Register />}/>
        </Routes>
      </Router>
    </ChatContextProvider>
    </>
  );
}

export default App;
