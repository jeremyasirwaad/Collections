import React from "react";
import { RiLogoutCircleRFill } from "react-icons/ri";

export const AppBar = () => {
	return (
		<div className="appbar">
			<RiLogoutCircleRFill size={20} />
			<span>Logout</span>
		</div>
	);
};
