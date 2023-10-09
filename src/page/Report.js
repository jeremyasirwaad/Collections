import { Row, Col, Form, DatePicker, Select, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import data from "../Data/report.json";

export const Report = () => {
	const [statuspie, setStatuspie] = useState([]);
	const [startdate, setStartdate] = useState("");
	const [enddate, setEnddate] = useState("");
	const [manager, setManager] = useState("");
	const [assmanager, setAssmanager] = useState("");
	const [callername, setCallername] = useState("");
	const [datavalue, setDatavalue] = useState(data);
	const [callerlist, setCallerlist] = useState([]);
	const [managerlist, setManagerlist] = useState([]);
	const [assmanagerlist, setAssmanagerlist] = useState([]);
	const [form] = Form.useForm();

	const columns = [
		{
			title: "Caller Name",
			dataIndex: "CALLER NAME",
			key: "address"
		},
		{
			title: "Process",
			dataIndex: "PORTFOLIO",
			key: "process"
		},
		{
			title: "PTP Amount",
			dataIndex: "PTP AMOUNT",
			key: "ptp_amount"
		},
		{
			title: "Status",
			dataIndex: "STATUS",
			key: "status"
		},
		{
			title: "Date",
			dataIndex: "DATE",
			key: "date"
		},
		{
			title: "TL Name",
			dataIndex: "ASST.MANAGER",
			key: "address"
		},
		{
			title: "Manager",
			dataIndex: "MANAGER",
			key: "manager"
		}
	];

	useEffect(() => {
		let collectedCount = 0;
		let approvedCount = 0;
		let doubtCount = 0;

		datavalue.forEach((customer) => {
			switch (customer["STATUS"]) {
				case "COLLECTED":
					collectedCount = collectedCount + customer["PTP AMOUNT"];
					break;
				case "APPROVED":
					approvedCount = approvedCount + customer["PTP AMOUNT"];
					break;
				case "DOUBT":
					doubtCount = doubtCount + customer["PTP AMOUNT"];
					break;
				default:
					break;
			}
		});

		// Create an array with the counts
		const statusCountsArray = [collectedCount, approvedCount, doubtCount];
		setStatuspie(statusCountsArray);

		const managerList1 = new Set();
		const assmanagerList1 = new Set();
		const callernameList1 = new Set();

		// Loop through the array and add each name to the Set
		data.forEach((obj) => {
			if (obj.MANAGER) {
				managerList1.add(obj.MANAGER);
			}
		});

		data.forEach((obj) => {
			if (obj["ASST.MANAGER"]) {
				assmanagerList1.add(obj["ASST.MANAGER"]);
			}
		});

		data.forEach((obj) => {
			if (obj["CALLER NAME"]) {
				callernameList1.add(obj["CALLER NAME"]);
			}
		});

		setManagerlist(Array.from(managerList1));
		setAssmanagerlist(Array.from(assmanagerList1));
		setCallerlist(Array.from(callernameList1));
	}, []);

	const filter = () => {
		var mock = data;
		console.log(data);
		if (manager != "") {
			mock = mock.filter((val) => {
				return val.MANAGER === manager;
			});
		}
		console.log(mock);

		if (assmanager != "") {
			mock = mock.filter((val) => {
				return val["ASST.MANAGER"] === assmanager;
			});
		}
		console.log(mock);

		if (callername != "") {
			mock = mock.filter((val) => {
				return val["CALLER NAME"] === callername;
			});
		}
		console.log(mock);

		setDatavalue(mock);
	};

	const clearfilter = () => {
		setDatavalue(data);
	};

	return (
		<div className="dashboard-page">
			<span className="page-title">Reports</span>
			<div className="page-bar-section">
				<div className="graph-sec-1">
					<div className="graph-sec-31">
						<span className="graph-title">Managers ₹</span>
						<span className="graph-sub-title">
							Total Amount of collections by each manager
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
										categories: ["Jeremy"]
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
										data: [20]
									}
								]}
								type="bar"
								height={220}
							/>
						</div>
					</div>
					<div className="graph-sec-32">
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
								tooltip: {
									y: {
										formatter: function (val) {
											return "₹" + val + " Rupees";
										}
									}
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
							series={statuspie}
							type="pie"
							width={380}
						/>
					</div>
				</div>
			</div>

			<div className="FiltersCont">
				<span className="graph-title">Filters</span>
				<span className="graph-sub-title">Select the required filters</span>
				<div className="filteroptionscont">
					<div className="filteroptions">
						<Form form={form}>
							<Row gutter={[32, 16]}>
								<Col span={8}>
									<Form.Item label="Start Date" name={"sdate"}>
										<DatePicker
											onChange={(value) => {
												setStartdate(value.$d);
											}}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label="End Date" name={"edate"}>
										<DatePicker
											onChange={(value) => {
												setEnddate(value.$d);
											}}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label="Manager" name={"manager"}>
										<Select
											onChange={(e) => {
												setManager(e);
											}}
											placeholder="Choose Manager"
										>
											{managerlist.length > 0 &&
												managerlist.map((val) => {
													return (
														<Select.Option value={val}>{val}</Select.Option>
													);
												})}
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={[16, 16]}>
								<Col span={12}>
									<Form.Item label="As.Manager" name={"assmanager"}>
										<Select
											onChange={(e) => {
												// setAssmanager(e);
											}}
											placeholder="Choose Ass.Manager"
										>
											{assmanagerlist.length > 0 &&
												assmanagerlist.map((val) => {
													return (
														<Select.Option value={val}>{val}</Select.Option>
													);
												})}
										</Select>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="Caller Name" name={"caller"}>
										<Select
											onChange={(e) => {
												setCallername(e);
											}}
											placeholder="Choose Caller Name"
										>
											{callerlist.length > 0 &&
												callerlist.map((val) => {
													return (
														<Select.Option value={val}>{val}</Select.Option>
													);
												})}
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Form.Item>
								<div className="addindibtn">
									<Button
										htmlType="reset"
										onClick={() => {
											clearfilter();
											form.resetFields();
										}}
									>
										Reset
									</Button>
									<div style={{ width: "10px" }}></div>
									<Button
										htmlType="submit"
										type="primary"
										onClick={() => {
											filter();
										}}
									>
										Get Data
									</Button>
								</div>
							</Form.Item>
						</Form>
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
							<Table columns={columns} dataSource={datavalue} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
