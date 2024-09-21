import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import "./App.css"
import MazeGame from "./pages/MazeGame"
import ZoomControl from "./pages/ZoomControl"

const devMode = !window?.["invokeNative"]

const App = () => {
	const [theme, setTheme] = useState("light")
	const [zoomLevel, setZoomLevel] = useState(1);
	const [notificationText, setNotificationText] = useState("Notification text")
	const appDiv = useRef(null)

	const {
		setPopUp,
		setContextMenu,
		selectGIF,
		selectGallery,
		selectEmoji,
		fetchNui,
		sendNotification,
		getSettings,
		onSettingsChange,
		colorPicker,
		useCamera
	} = window as any

	useEffect(() => {
		if (devMode) {
			document.getElementsByTagName("html")[0].style.visibility = "visible"
			document.getElementsByTagName("body")[0].style.visibility = "visible"
			return
		} else {
			getSettings().then((settings: any) => setTheme(settings.display.theme))
			onSettingsChange((settings: any) => setTheme(settings.display.theme))
		}

		// fetchNui("getDirection").then((direction: string) => setDirection(direction))

		// window.addEventListener("message", (e) => {
		// 	if (e.data?.type === "updateDirection") setDirection(e.data.direction)
		// })
	}, [])

	useEffect(() => {
		if (notificationText === "") setNotificationText("Notification text")
	}, [notificationText]);

	// Zoom handlers
	const zoomIn = useCallback(() => {
		setZoomLevel(prev => Math.min(prev + 0.1, 2));
	}, []);

	const zoomOut = useCallback(() => {
		setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
	}, []);

	return (
		<AppProvider>
			<div className="app" ref={appDiv} data-theme={theme}>
				<div className="app-wrapper">
					<ZoomControl zoomIn={zoomIn} zoomOut={zoomOut} />
					<MazeGame zoomLevel={zoomLevel}/>
				</div>
			</div>
		</AppProvider>
	)
}

interface AppProviderProps {
	children: ReactNode;
}
  
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	if (devMode) {
	  	return <div className="dev-wrapper">{children}</div>;
	} else return <>{children}</>;
};

export default App
