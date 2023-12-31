import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sidebar } from "./common/Sidebar";
import { AppBar } from "./common/AppBar";
import { Dashboard } from "./page/Dashboard";
import { Report } from "./page/Report";
import { Process } from "./page/Process";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<div className="layout">
				<Sidebar></Sidebar>
				<div>
					<AppBar></AppBar>
					<div style={{ marginLeft: "300px", marginTop: "65px" }}>
						<Routes>
							<Route path="/" element={<Process />} />
						</Routes>
						<Routes>
							<Route path="/detailed" element={<Dashboard />} />
						</Routes>
						<Routes>
							<Route path="/config" element={<Dashboard />} />
						</Routes>
						<Routes>
							<Route path="/report" element={<Report />} />
						</Routes>
					</div>
				</div>
			</div>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
