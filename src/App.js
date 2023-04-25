import { Routes, Route } from "react-router-dom";
import { Invoices, ViewInvoice } from "./pages";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Invoices />} />
        <Route path="/view-invoice" element={<ViewInvoice />} />
        <Route path="*" element={<center>
          <h1>Page Not Found</h1>
        </center>}/>
      </Routes>
    </div>
  );
}

export default App;
