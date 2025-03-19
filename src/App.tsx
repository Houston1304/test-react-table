import { Navigate, Route, Routes, useNavigate } from "react-router";
import AutorizationPage from "./pages/AutorizationPage";
import TablePage from "./pages/TablePage";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/table");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AutorizationPage />}></Route>
        <Route path="/table" element={<TablePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
