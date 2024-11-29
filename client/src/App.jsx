import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/MainRoutes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
