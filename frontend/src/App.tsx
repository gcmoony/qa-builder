import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { ListWrapper } from "./components/QA_List/ListWrapper";
import { QA_Form } from "./components/QA_Form/QA_Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<ListWrapper />}
        />
        <Route
          path='/qa/edit/:id'
          element={<QA_Form />}
        />
        <Route
          path='/qa/new'
          element={<QA_Form />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
