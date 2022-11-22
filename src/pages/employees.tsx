
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IEmployeeData } from "../types/IEmployeeData";
import { EmployeeEntry } from "../components/EmployeEntry";
import { AlertDialogue } from "../components/AlertDialog";
import { Layout } from "../components/Layout";
import { UnauthorizedPage } from "./401";
import { UserContext } from "../components/UserContext";
import { Container } from "@mui/material";

export interface IModalData {
    isOpen: boolean
    employeeId: string
}

export const EmployeeListPage: React.FC = (children) => {
    const { username } = useContext(UserContext);
    const [employeeData, setEmployeeData] = useState([{} as IEmployeeData]);
    const [modalData, setModalData] = useState({} as IModalData);

    useEffect(() => {
        axios.get("/api/emp/employees")
            .then((response) => {
                setEmployeeData(response.data.content);
            })
            .catch((err) => {
                setEmployeeData([]);
                console.error(err);
            });
    }, [employeeData]);

    function handleModalOpen(employeeId: string) {
        setModalData({isOpen: true, employeeId});
    }

    function onModalClose() {
        setModalData({isOpen: false, employeeId: modalData.employeeId});
    }

    if (username === null) {
        return <UnauthorizedPage/>
    }

    return (
        <Layout imgUrl="https://wallpaperaccess.com/full/4268145.jpg">
            <AlertDialogue
                isOpen={modalData.isOpen}
                title="Delete employee?"
                description="Are you sure you wish to delete this employee?"
                confirmText="Yes"
                rejectText="Cancel"
                onConfirm={() => {
                    axios.delete(`/api/emp/employees/${modalData.employeeId}`)
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
            {employeeData.length === 0 && <h2 style={{color: "red"}}>No records to show.</h2>}

            <Container
                fixed
                maxWidth="sm"
                style={{
                    backgroundColor: "#31313131"
                }}
            >
                {employeeData.length > 0 && (
                    employeeData.map((value: IEmployeeData) => (
                        <EmployeeEntry employeeData={value} handleModalOpen={handleModalOpen}/>
                    ))
                )}
            </Container>

        </Layout>
    );
}
