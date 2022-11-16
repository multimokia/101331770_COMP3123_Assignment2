import { Button, Card, Link } from "@mui/material";
import { NavBar } from "../components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { IEmployeeData } from "../types/IEmployeeData";
import { EmployeeEntry } from "../components/EmployeEntry";
import { AlertDialogue } from "../components/AlertDialog";

export interface IModalData {
    isOpen: boolean
    employeeId: string
}

export const EmployeeListPage: React.FC = (children) => {

    const [employeeData, setEmployeeData] = useState([{} as IEmployeeData]);
    const [modalData, setModalData] = useState({} as IModalData);

    useEffect(() => {
        axios.get("http://23.133.249.134:8888/api/emp/employees")
            .then((response) => {
                setEmployeeData(response.data.content);
            })
            .catch((err) => {
                setEmployeeData([]);
                console.error(err);
            });
    }, []);

    function handleModalOpen(employeeId: string) {
        setModalData({isOpen: true, employeeId});
    }

    if (employeeData.length === 0) {
        return (
            <>
                <NavBar/>
                <img className="backdrop" src="https://wallpaperaccess.com/full/4268145.jpg" alt="a splash background of space"/>
                <div className="centered-flex full-viewport">
                    <Card
                        className="frosted-glass-container"
                        style={{
                            marginTop: "15%",
                            paddingTop: "2%",
                            paddingBottom: "2%",
                            paddingLeft: "5%",
                            paddingRight: "5%"
                        }}
                    >
                        <h2 style={{color: "red"}}>No records to show.</h2>
                    </Card>
                </div>
            </>
        );
    }

    function onModalClose() {
        setModalData({isOpen: false, employeeId: modalData.employeeId});
    }

    return (
        <>
            <NavBar/>
            <img className="backdrop" src="https://wallpaperaccess.com/full/4268145.jpg" alt="a splash background of space"/>
            <AlertDialogue
                isOpen={modalData.isOpen}
                title="Delete employee?"
                description="Are you sure you wish to delete this employee?"
                confirmText="Yes"
                rejectText="Cancel"
                onConfirm={() => {
                    axios.delete(`http://23.133.249.134:8888/emp/employee/${modalData.employeeId}`)
                        .then((result) => {
                            console.log(result);
                        })
                        .catch(console.error);

                    onModalClose();
                }}
                onReject={() => {
                    onModalClose();
                    setModalData({isOpen: false, employeeId: modalData.employeeId});
                }}
                onClose={onModalClose}
            />
            <div className="centered-flex full-viewport">
                <div
                    className="frosted-glass-container"
                    style={{
                        marginTop: "15%",
                        paddingTop: "2%",
                        paddingBottom: "2%",
                        paddingLeft: "5%",
                        paddingRight: "5%",
                        minWidth: "80%",
                        minHeight: "80%"
                    }}
                >
                    {employeeData.map((value: IEmployeeData) => (
                        <Card key={value._id} className="employee-data">
                            <h2>{value.first_name} {value.last_name}</h2>
                            <hr/>
                            <h4>Email: </h4>{value.email}
                            <h4>Gender: </h4>{value.gender}
                            <h4>Salary: </h4>${value.salary}

                            <hr/>
                            <Button
                                href={`/employee/edit/${value._id}`}
                                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root"
                            >Edit...</Button>
                            <Button
                                onClick={() => handleModalOpen(value._id)}
                                style={{
                                    color: "red"
                                }}
                            >Delete...</Button>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
