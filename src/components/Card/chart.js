import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import SectionHeader from "./SectionHeader";
import LineGraph from "./LineGraph";
import ColumnChart from "./ColumnChart";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CashFlowColumnChart from "./CashFlowColumnChart";
import 'bootstrap/dist/css/bootstrap.css';

import "./chart.scss";

const ChartCard = () => {

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const monthss = [
        "January", "February", "March", "April", "May", "June"
    ];

    const [selectedMonth, setSelectedMonth] = useState("Select Month");
    const [chartData, setChartData] = useState(generateRandomData());
    const [columnChartData, setColumnChartData] = useState(generateRandomColumnData());
    const [showModal, setShowModal] = useState(false);
    const [cashFlowData, setCashFlowData] = useState(generateCashFlowData());

    const handleDateSelectorChange = (selectedKey) => {
        setSelectedMonth(selectedKey);
        setChartData(generateRandomData(selectedKey));
        setColumnChartData(generateRandomColumnData(selectedKey));
        console.log(`Selected Month: ${selectedKey}`);
    };

    const handleNewInvoiceClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    function generateRandomData(selectedMonth) {
        const selectedMonthIndex = months.indexOf(selectedMonth);
        const daysInMonth = new Date(2022, selectedMonthIndex + 1, 0).getDate();

        
        const startDay = Math.max(1, Math.floor((daysInMonth - 10) / 2));
        const endDay = Math.min(daysInMonth, startDay + 9);

        const data = Array.from({ length: endDay - startDay + 1 }, (_, day) => {
            const date = new Date(2022, selectedMonthIndex, startDay + day);
            return {
                date,
                value: Math.floor(Math.random() * 100),
            };
        });

        console.log("Generated Data:", data);
        return data;
    }

    function generateRandomColumnData(selectedMonth) {
        const selectedMonthIndex = months.indexOf(selectedMonth);
        const daysInMonth = new Date(2022, selectedMonthIndex + 1, 0).getDate();
    
        const numIntervals = 4; // Set the number of intervals
    
        const columnData = Array.from({ length: numIntervals }, (_, index) => {
            const startDay = Math.floor((index * daysInMonth) / numIntervals);
            const endDay = Math.floor(((index + 1) * daysInMonth) / numIntervals);
    
            const sum = Array.from({ length: endDay - startDay }, (_, day) => {
                const date = new Date(2022, selectedMonthIndex, startDay + day + 1);
                return {
                    date,
                    value: Math.floor(Math.random() * 100),
                };
            }).reduce((total, data) => total + data.value, 0);
    
            return {
                label: `${startDay + 1}-${endDay}`,
                value: sum,
            };
        });
    
        console.log("Generated Column Data:", columnData);
        return columnData;
    }
    
    function generateCashFlowData() {
        const cashFlowData = monthss.map((month, index) => {
            const inCash = Math.floor(Math.random() * 100);
            const outCash = Math.floor(Math.random() * inCash); 
            return {
                month,
                inCash,
                outCash,
            };
        });

        console.log("Generated Cash Flow Data:", cashFlowData);
        return cashFlowData;
    }




    return (
        <Container style={{ paddingTop: "70px", paddingLeft: "50px" }}>
            <Row>
                <Col>
                    <Card className="p-5">
                        <Row>
                            <Col md={12} className="d-flex align-items-center justify-content-between">
                                
                                <div>
                                    <SectionHeader
                                        subtitle={"Checking account"}
                                        size={2}
                                        spaced={true}
                                        titleStyle={{ marginTop: '1rem' }}
                                    />
                                </div>
                                
                                <div className="d-flex align-items-center">
                                    <Dropdown className="mr-2" style={{ minWidth: "50px", marginRight: "5px" }}>
                                        <Dropdown.Toggle variant="success" id="manage-dropdown">
                                            Manage
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown onSelect={(selectedKey) => handleDateSelectorChange(selectedKey)} style={{ minWidth: "100px" }}>
                                        <Dropdown.Toggle variant="info" id="month-dropdown">
                                            {selectedMonth}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {months.map((month, index) => (
                                                <Dropdown.Item key={index} eventKey={month}>
                                                    {month}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                        <Card className="p-5">
                            <LineGraph data={chartData} />
                        </Card>
                    </Card>
                </Col>
                <Col>
                    <Card className="p-5">
                        <Row>
                            <Col md={12} className="d-flex align-items-center justify-content-between">
                               
                                <div>


                                    
                                    <SectionHeader
                                        subtitle={"Invoice owed to you"}
                                        size={2}
                                        spaced={true}
                                        titleStyle={{ marginTop: '1rem' }}
                                    />
                                </div>
                                <Button variant="primary" onClick={handleNewInvoiceClick} style={{ marginLeft: "10px" }}>
                                    New Sales Invoice
                                </Button>
                            </Col>
                        </Row>
                        <Card className="p-5">
                            <ColumnChart data={columnChartData} />
                        </Card>
                    </Card>
                </Col>
            </Row>
            
            <Row style={{ marginTop: "10px" }}>
                <Col>
                    <Card className="p-5">

                        <Col md={12} className="d-flex align-items-center justify-content-between">
                            <SectionHeader
                                subtitle={"Total Cash Flow"}
                                size={2}
                                spaced={true}
                                titleStyle={{ marginTop: '1rem' }}
                            />
                            <div className="d-flex justify-content-between mb-3">
                                <div className="d-flex align-items-center" style={{marginRight: "5px"}}>
                                    <div className="legend-box in-cash"></div>
                                    <span className="legend-label">In</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="legend-box out-cash"></div>
                                    <span className="legend-label">Out</span>
                                </div>
                            </div>
                        </Col>

                        <Card className="p-5">
                            <CashFlowColumnChart data={cashFlowData} />
                        </Card>
                    </Card>
                </Col>

                <Col>

                    <Card className="p-5">
                        <row>
                            <Col md={12} className="d-flex align-items-center justify-content-between">

                                <SectionHeader
                                    subtitle={"Account watchlist"}
                                    size={2}
                                    spaced={true}
                                    titleStyle={{ marginTop: '1rem' }}
                                />
                            </Col>
                        </row>
                        <hr />
                        <Row>
            <Col md={12}>
                <table>
                    <thead>
                        <tr>
                            <th>Account</th>
                            <th>This Month</th>
                            <th>YTD</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sales</td>
                            <td>1,194.58</td>
                            <td>11,418.29</td>
                        </tr>
                        <tr>
                            <td>Advertising</td>
                            <td>6,879.02</td>
                            <td>9,271.36</td>
                        </tr>

                        <tr>
                            <td>Inventory</td>
                            <td>4,692.26</td>
                            <td>9,768.09</td>
                        </tr>
                        <tr>
                            <td>Entertainment</td>
                            <td>0.00</td>
                            <td>0.00</td>
                        </tr>

                        <tr>
                            <td>Product</td>
                            <td>4,652.10</td>
                            <td>2,529.90</td>
                        </tr>

                    </tbody>
                </table>
            </Col>
        </Row>
                    </Card>
                </Col>
            </Row>
           

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New Sales Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Your file upload form or content goes here */}
                    <p>File upload form goes here...</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" disabled>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );

};


export default ChartCard;