import React from "react";
import { MdDashboard } from "react-icons/md";
import { BsFillPersonLinesFill, BsSpeedometer } from "react-icons/bs";

export const Sidebar = () => {
	return (
		<div className="sidebar">
			<img
				className="side-logo"
				src="https://static.vecteezy.com/system/resources/previews/016/461/472/non_2x/paper-money-in-usd-dollar-cash-icon-clipart-png-illustration-isolated-on-transparent-background-vector.jpg"
				alt=""
			/>
			<div className="side-profile">
				<img
					src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg"
					alt=""
				/>
				<span>Jeremy Jacob</span>
			</div>
			<div className="side-dashboard-tags">
				<div
					className="side-dash-tag-ele"
					style={{ backgroundColor: " rgba(145, 158, 171, 0.12)" }}
				>
					<MdDashboard size={20} className="side-ele-icon" color="black" />
					<span
						style={{
							color: "black"
						}}
					>
						Dashboard
					</span>
				</div>
				<div className="side-dash-tag-ele">
					<BsFillPersonLinesFill size={20} className="side-ele-icon" />
					<span>Employees</span>
				</div>
				<div className="side-dash-tag-ele">
					<BsSpeedometer size={20} className="side-ele-icon" />
					<span>Performance</span>
				</div>
			</div>
		</div>
	);
};
