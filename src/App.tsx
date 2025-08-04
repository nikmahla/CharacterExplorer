import Home from "./pages/Home";
import "./layouts/mainLayout.css";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div className="min-h-screen bg-[#0f172a] text-white">
        <Home />
        <Toaster richColors position="top-right" />
      </div>
    </>
  );
}

export default App;
