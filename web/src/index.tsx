import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./colors.css";
import "./index.css";

const devMode = !window?.["invokeNative"];

const rootElement = document.getElementById("root");

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);

	if (window.name === "" || devMode) {
		const renderApp = () => {
			root.render(
				<React.StrictMode>
				<App />
				</React.StrictMode>
			);
		};

		if (devMode) {
			renderApp();
		} else {
			window.addEventListener("message", (event) => {
				if (event.data === "componentsLoaded") renderApp();
			});
		}
	}
} else {
  	console.error("Root element not found");
}
