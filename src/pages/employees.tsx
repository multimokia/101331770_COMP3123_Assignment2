
import axios from "axios";
import { useContext, useState } from "react";
import { IEmployeeData, ISaveableEmployeeData } from "../types/IEmployeeData";
import { EmployeeEntry } from "../components/EmployeEntry";
import { AlertDialogue } from "../components/AlertDialog";
import { Layout } from "../components/Layout";
import { UnauthorizedPage } from "./401";
import { UserContext } from "../components/UserContext";
import { Container, Fab, Typography } from "@mui/material";
import { useFetch } from "../hooks/useFetch";
import { IAPIResponse } from "../types/IAPIResponse";
import { EmployeeFormDialogue } from "../components/EmployeeCreateOrEditDialog";
import AddIcon from '@mui/icons-material/Add';

export interface IModalData {
    isOpen: boolean
    employeeId: string
    endpointUrl?: string
    employeeDetails?: IEmployeeData
}

export const EmployeeListPage: React.FC = () => {
    const { username } = useContext(UserContext);
    const { data, loading, refetch } = useFetch<IAPIResponse<ISaveableEmployeeData[]>>("/api/emp/employees");
    const [ alertModalData, setAlertModalData ] = useState({} as IModalData);
    const [ employeeFormModalData, setEmployeeFormModalData ] = useState({} as IModalData);

    function handleAlertModalOpen(employeeId: string) {
        setAlertModalData({isOpen: true, employeeId});
    }

    function onAlertModalClose() {
        setAlertModalData({isOpen: false, employeeId: ""});
    }

    function handleEmployeeDataModalOpen(postUrl: string, employeeData?: IEmployeeData) {
        setEmployeeFormModalData({isOpen: true, employeeId: "", endpointUrl: postUrl, employeeDetails: employeeData});
    }

    function onEmployeeDataModalClose() {
        setEmployeeFormModalData({
            isOpen: false,
            employeeId: "",
            endpointUrl: employeeFormModalData.endpointUrl,
            employeeDetails: employeeFormModalData.employeeDetails
        });
        refetch();
    }

    if (username === null) {
        return <UnauthorizedPage/>
    }

    return (
        <Layout imgUrl="https://wallpaperaccess.com/full/4268145.jpg">
            <AlertDialogue
                isOpen={alertModalData.isOpen}
                title="Delete employee?"
                description="Are you sure you wish to delete this employee?"
                confirmText="Yes"
                rejectText="Cancel"
                onConfirm={() => {
                    axios.delete(`/api/emp/employees/${alertModalData.employeeId}`)
                        .then((result) => {
                            refetch();
                        })
                        .catch(console.error);

                    onAlertModalClose();
                }}
                onReject={() => {
                    onAlertModalClose();
                }}
                onClose={onAlertModalClose}
            />
            <EmployeeFormDialogue
                isOpen={employeeFormModalData.isOpen}
                title="Employee Data"
                description=""
                rejectText="Cancel"
                onConfirm={onEmployeeDataModalClose}
                onReject={onEmployeeDataModalClose}
                onClose={onEmployeeDataModalClose}
                postUrl={employeeFormModalData.endpointUrl!}
                defaultData={employeeFormModalData.employeeDetails}
            />
            <Container
                fixed
                maxWidth={false}
                style={{
                    marginTop: "2%",
                    paddingTop: "2%",
                    backgroundColor: "#31313131",
                    overflow: "auto"
                }}
            >
                {(!loading && data.content.length === 0) && (
                    <Typography
                        variant="h2"
                        style={{
                            color: "red",
                            justifyContent: "center"
                        }}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                        }}
                    >
                        No records to show.
                    </Typography>
                )}
                {(!loading && data.content.length > 0) && (
                    data.content.map((value: ISaveableEmployeeData) => (
                        <EmployeeEntry
                            key={value._id}
                            employeeData={value}
                            handleEditModalOpen={handleEmployeeDataModalOpen}
                            handleDeleteModalOpen={handleAlertModalOpen}
                        />
                    ))
                )}
            </Container>
            <Fab
                variant="extended"
                color="primary"
                onClick={() => {
                    handleEmployeeDataModalOpen("/api/emp/employees")
                }}
                style={{
                    position: "fixed",
                    bottom: "5%",
                    right: "20%"
                }}
            >
                <AddIcon sx={{ mr: 1}}/>
                Create new
            </Fab>
        </Layout>
    );
}
