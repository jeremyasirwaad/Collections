import React, { useState, useEffect } from "react";
import "./dashboard.css";

import ReactApexChart from "react-apexcharts";
import { Space, Table, Tag } from "antd";
import filedata from "../Data/csvjson.json";

export const Dashboard = () => {
	const [totalPtp, setTotalPtp] = useState(0);
	const [collectedptp, setCollectedPtp] = useState(0);
	const [totalReceived, setTotalReceived] = useState(0);
	const [totalnotreceived, setTotalNotreceived] = useState(0);
	const [statusArry, setstatusArry] = useState([]);
	const [bankArry, setBankArry] = useState([]);
	const [collectionperday, setCollectionperday] = useState([]);
	const [collectionperdaydate, setCollectionperdaydate] = useState([]);
	const [nofcollectionperday, setnofCollectionperday] = useState([]);
	const [nofcollectionperdaydate, setnofCollectionperdaydate] = useState([]);

	const getData = () => {
		const ptpSum = filedata.reduce(
			(total, customer) => total + customer["PTP AMOUNT"],
			0
		);
		const ptpSumCollected = filedata
			.filter((customer) => customer["STATUS"] === "COLLECTED")
			.reduce((total, customer) => total + customer["PTP AMOUNT"], 0);
		const receivedReceiptCount = filedata.filter(
			(customer) => customer["RECEIPT"] === "RECEIVED"
		).length;
		const notreceivedReceiptCount = filedata.filter(
			(customer) => customer["RECEIPT"] !== "RECEIVED"
		).length;

		setTotalPtp(ptpSum);
		setCollectedPtp(ptpSumCollected);
		setTotalReceived(receivedReceiptCount);
		setTotalNotreceived(notreceivedReceiptCount);

		console.log(ptpSum, ptpSumCollected, receivedReceiptCount);

		let collectedCount = 0;
		let approvedCount = 0;
		let doubtCount = 0;

		filedata.forEach((customer) => {
			switch (customer["STATUS"]) {
				case "COLLECTED":
					collectedCount++;
					break;
				case "APPROVED":
					approvedCount++;
					break;
				case "DOUBT":
					doubtCount++;
					break;
				default:
					break;
			}
		});

		// Create an array with the counts
		const statusCountsArray = [collectedCount, approvedCount, doubtCount];
		setstatusArry(statusCountsArray);

		let ICICcount = 0;
		let HDFCcount = 0;

		filedata.forEach((customer) => {
			switch (customer["DEPOSIT BANK"]) {
				case "ICICI":
					ICICcount++;
					break;
				case "HDFC":
					HDFCcount++;
					break;
				default:
					break;
			}
		});

		// Create an array with the counts
		const bankcountArray = [ICICcount, HDFCcount];
		console.log("bank", bankcountArray);
		setBankArry(bankcountArray);

		const dateSums = {};

		filedata.forEach((entry) => {
			const date = entry.DATE;
			const ptpAmount = entry["PTP AMOUNT"];

			if (!dateSums[date]) {
				dateSums[date] = ptpAmount;
			} else {
				dateSums[date] += ptpAmount;
			}
		});

		const data_bar_chart = Object.entries(dateSums).map(([date, sum]) => ({
			date,
			total_amount: sum
		}));

		setCollectionperday(data_bar_chart.map((item) => item.total_amount));
		setCollectionperdaydate(data_bar_chart.map((item) => item.date));

		const collectionCounts = {};

		// Loop through the data and count collections for each date
		filedata.forEach((entry) => {
			const date = entry.DATE;
			const status = entry.STATUS;

			// Check if the entry has "COLLECTED" status
			if (status === "COLLECTED") {
				// Increment the collection count for the date
				collectionCounts[date] = (collectionCounts[date] || 0) + 1;
			}
		});

		// Convert the collectionCounts object to an array of objects
		const data_line_chat = Object.entries(collectionCounts).map(
			([date, count]) => ({
				date,
				collection_count: count
			})
		);

		console.log(data_line_chat);
		setnofCollectionperday(data_line_chat.map((item) => item.collection_count));
		setnofCollectionperdaydate(data_line_chat.map((item) => item.date));
	};

	useEffect(() => {
		getData();
	}, []);

	const columns = [
		{
			title: "Customer Name",
			dataIndex: "CUSTOMER NAME",
			key: "name",
			render: (text) => <a>{text}</a>
		},

		{
			title: "PTP Amount",
			dataIndex: "PTP AMOUNT",
			key: "address",
			render: (text) => <a>{text} ₹</a>
		},
		{
			title: "Status",
			dataIndex: "STATUS",
			key: "status",
			render: (text) => {
				if (text == "COLLECTED") {
					return <Tag color="green">{text}</Tag>;
				} else if (text == "DOUBT") {
					return <Tag color="red">{text}</Tag>;
				} else {
					return <Tag color="blue">{text}</Tag>;
				}
			},
			filters: [
				{
					text: "COLLECTED",
					value: "COLLECTED"
				},
				{
					text: "APPROVED",
					value: "APPROVED"
				},
				{
					text: "DOUBT",
					value: "DOUBT"
				}
			],
			onFilter: (value, record) => record.STATUS.includes(value)
			// onFilter: (value, record) => value === record.status
		},
		{
			title: "Caller Name",
			dataIndex: "CALLER NAME",
			key: "address"
		}
	];

	return (
		<div className="dashboard-page">
			<span className="page-title">AUG Payment File</span>
			<div className="pagecard-section">
				<div
					className="page-card"
					style={{ backgroundColor: "rgb(209, 233, 252)" }}
				>
					<span className="card-title">{totalPtp}₹</span>
					<span>Total PTP Amount</span>
				</div>
				<div
					className="page-card"
					style={{ backgroundColor: "rgb(208, 242, 255)" }}
				>
					<span className="card-title">{collectedptp} ₹</span>
					<span>Collected PTP</span>
				</div>
				<div
					className="page-card"
					style={{ backgroundColor: "rgb(255, 247, 205)" }}
				>
					<span className="card-title">{totalReceived}</span>
					<span>Total Received</span>
				</div>
				<div
					className="page-card"
					style={{ backgroundColor: "rgb(255, 231, 217)" }}
				>
					<span className="card-title">{totalnotreceived}</span>
					<span>Not Received</span>
				</div>
			</div>
			<div className="page-bar-section">
				<div className="graph-sec-1">
					<div className="graph-sec-11">
						<span className="graph-title">Collections ₹</span>
						<span className="graph-sub-title">
							Total Amount of collections on each day
						</span>
						<div style={{ width: "100%" }}>
							<ReactApexChart
								options={{
									chart: {
										type: "bar",
										height: 350
									},
									plotOptions: {
										bar: {
											horizontal: false,
											columnWidth: "55%",
											endingShape: "rounded"
										}
									},
									dataLabels: {
										enabled: false
									},
									stroke: {
										show: true,
										width: 2,
										colors: ["transparent"]
									},
									xaxis: {
										categories: collectionperdaydate
									},
									yaxis: {
										title: {
											text: "₹ (Rupees)"
										}
									},
									fill: {
										opacity: 1
									},
									tooltip: {
										y: {
											formatter: function (val) {
												return "₹" + val + " Rupees";
											}
										}
									}
								}}
								series={[
									{
										name: "Collected",
										data: collectionperday
									}
								]}
								type="bar"
								height={220}
							/>
						</div>
					</div>
					<div className="graph-sec-12">
						<span className="graph-title">Status</span>
						<span className="graph-sub-title">
							a breif status on Collections
						</span>
						<ReactApexChart
							options={{
								chart: {
									width: 380,
									type: "pie"
								},
								labels: ["Collected", "Approved", "Doubt"],
								responsive: [
									{
										breakpoint: 480,
										options: {
											chart: {
												width: 200
											},
											legend: {
												position: "bottom"
											}
										}
									}
								]
							}}
							series={statusArry}
							type="pie"
							width={380}
						/>
					</div>
				</div>
			</div>
			<div className="page-bar-section">
				<div className="graph-sec-1">
					<div className="graph-sec-11">
						<span className="graph-title">Collections</span>
						<span className="graph-sub-title">
							Number of collections on each day
						</span>
						<div style={{ width: "100%" }}>
							<ReactApexChart
								options={{
									chart: {
										height: 350,
										type: "line",
										zoom: {
											enabled: false
										}
									},
									dataLabels: {
										enabled: false
									},
									stroke: {
										curve: "straight"
									},

									grid: {
										row: {
											colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
											opacity: 0.5
										}
									},
									xaxis: {
										categories: nofcollectionperdaydate
									}
								}}
								series={[
									{
										name: "Collections",
										data: nofcollectionperday
									}
								]}
								type="line"
								height={220}
							/>
						</div>
					</div>
					<div className="graph-sec-12">
						<span className="graph-title">Bank</span>
						<span className="graph-sub-title">Name of deposit bank</span>
						<ReactApexChart
							options={{
								chart: {
									width: 380,
									type: "pie"
								},
								labels: ["ICIC", "HDFC"],
								responsive: [
									{
										breakpoint: 480,
										options: {
											chart: {
												width: 200
											},
											legend: {
												position: "bottom"
											}
										}
									}
								]
							}}
							series={bankArry}
							type="pie"
							width={380}
						/>
					</div>
				</div>
			</div>
			<div className="page-bar-section">
				<div className="graph-sec-3">
					<span className="graph-title">Augest Payments</span>
					<span className="graph-sub-title">
						Breif overview of Augest Payment data
					</span>
					<div style={{ width: "100%" }}>
						<div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
							<Table columns={columns} dataSource={filedata} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
