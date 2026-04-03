import React from "react";
import ReactDom from "react-dom/client ";
import {Provider} from  "react-redux";
import App from "./App.jsx";
import {createStore} from  "redux";
import { BrowserRouter } from "react-router-dom";
import reducerGlobal from "./config/reducerGlobal.js";


const store = createStore(reducerGlobal);   

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
        <Provider store={store}>
            <BrowserRouter>
                 <App />
            </BrowserRouter>
        </Provider>
);  