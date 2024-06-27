import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Main from "./pages/Main";

export default createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Main />} />
    )
);
