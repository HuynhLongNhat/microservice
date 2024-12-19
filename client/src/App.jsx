import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppContent from "./pages/AppContent";
const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
