import 'font-awesome/css/font-awesome.min.css'; 
import './App.css'
import './TaskBar.css'
import './main.css'
import React, { useEffect, useState } from 'react';
import Modal from './Modal.tsx';
import {apps as initialApps} from './apps.tsx'

function App() {

	// For Window home icon
	const [showTaskWindow, setTaskWindow] = useState(false);
	
	const toggleTaskWindow = () => {
		setTaskWindow(!showTaskWindow);
	};

	// For displaying time
	const [currentTime, setCurrentTime] = useState("");
	const [currentDate, setCurrentDate] = useState("");
	const fetchTimeDate = () => {
		const now = new Date()
		const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		const formattedDate = now.toLocaleDateString([], {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
		setCurrentTime(formattedTime);
		setCurrentDate(formattedDate);		
	};
	useEffect(() => {
		fetchTimeDate(); 
		const interval = setInterval(fetchTimeDate, 1000); 
		return () => clearInterval(interval); 
	}, []);
	
	// Drag and Drop functionality
	const [apps, setApps] = useState(initialApps)

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
		const target = e.currentTarget; 
		const rect = target.getBoundingClientRect();
		e.dataTransfer.setData("id", id.toString());
		e.dataTransfer.setData("offsetX", (e.clientX - rect.left).toString());
		e.dataTransfer.setData("offsetY", (e.clientY - rect.top).toString());
	};
	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	}
	const handleDrop = (e:React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const id = parseInt(e.dataTransfer.getData("id"), 10);
		const offsetX = parseInt(e.dataTransfer.getData("offsetX"), 10);
		const offsetY = parseInt(e.dataTransfer.getData("offsetY"), 10);
		const updatedApps = apps.map((app) =>
			app.id === id
				? { ...app, x: e.clientX - offsetX, y: e.clientY - offsetY }: app
		);
	
		setApps(updatedApps);
	}
  const [openAppId, setOpenAppId] = useState<number | null>(null);
	const handleAppOpen = (id: number) => {
    setOpenAppId(id);
	}
  const closeModal = () => {
    setOpenAppId(null);
  };

	return (
 		<>
			{showTaskWindow && (
				<div className={`TaskWindow ${showTaskWindow ? "show" : "hide"}`}>
					<div className='TaskWindow-main'>
						<div className='TaskWindow-searchBar'> 
							<i className="fa fa-search " ></i>
							<input type="text" placeholder="Search for apps, settings and documents" />

						</div>
					</div>
					<div className='TaskWindow-bottom'>
						<ul>
							<li className="User">
								<i className="fa fa-user"></i> Aaron Thai
							</li>
							<li className='Power'>
								<i className="fa fa-power-off"></i>									
							</li>
						</ul>

					</div>
				</div>
			)}

			{/* The MainApps will become a modal that pops up when clicked on and shows info about whatever */}
			<div className="main-container" onDragOver={handleDragOver} onDrop={handleDrop}>
				{apps.map((app) => (
					<div
						key={app.id}
						className="MainApps"
						draggable="true"
						style={{ position: "absolute", left: app.x, top: app.y }}
						onDragStart={(e) => handleDragStart(e, app.id)}
						onDoubleClick={() => handleAppOpen(app.id)}
						>
						<i className={`fa ${app.icon} fa-3x`}></i>
						<span>{app.name}</span>
					</div>
				))}

				{openAppId != null && (
					<Modal 
						app={apps.find(app => app.id === openAppId) || null}
						onClose={closeModal}
					/> 
				)}
			</div>



			<div className="bottomNav"> 
				{/* Home Icon */}
				<div className="mainIcons">
					<div className="icon">
						<i className="fa fa-windows fa-2x" onClick={toggleTaskWindow}></i>
					</div>

					{/* Search Bar */}
					<div className="searchBar">
						<i className="fa fa-search " ></i>
						<input type="text" placeholder="Search" />
					</div>

					{/* Folder Icon */}
					<div className="icon">
						<i className="fa fa-folder fa-2x"></i>
					</div>

					{/* Settings Icon */}
					<div className="icon">
						<i className="fa fa-cogs fa-2x"></i>
					</div>

					{/* Chrome Icon */}
					<div className='icon'>
						<i className="fa fa-chrome fa-2x"></i>
					</div>
				</div> 
				<div className='notificationIcons'>
					{/* Windows Update button*/}
					<div> 
						<i className="fa fa-refresh"></i>									
					</div>		
					{/* Language button*/}
					<div> 
						<i className="fa fa-language"></i>							
					</div>															
					{/* Wifi Icon */}
					<div className='icon'>
						<i className="fa fa-wifi"></i>
					</div>					
					{/* Volume Icon */}
					<div className='icon'>
						<i className="fa fa-volume-up"></i>					
					</div>	

					<div className="timeDisplay"> 
						<div className='currentTime'>{currentTime}</div>
						<div className='currentDate'>{currentDate}</div>

					</div>
					
				</div>
			</div>
		</>
	);
}

export default App;
