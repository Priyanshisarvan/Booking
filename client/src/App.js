
import "./App.css";

import MainRoute from "./components/routes/MainRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
     
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        autoClose={2000}
        theme="dark"
      />
      <MainRoute />
      

    </div>
  );
}

export default App;
