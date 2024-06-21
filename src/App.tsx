import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoApp from "./pages/TodoApp";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <div className="App">
          <Routes>
            <Route path="/" element={<TodoApp />} />
          </Routes>
        </div>
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default App;
