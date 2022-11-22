import { Table, TableBody, TableRow, TableCell, Accordion, AccordionDetails, AccordionSummary, Button, Grid } from "@mui/material";
import { IEmployeeData, ISaveableEmployeeData } from "../types/IEmployeeData";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const EmployeeEntry: React.FC<{
    employeeData: ISaveableEmployeeData,
    handleDeleteModalOpen: (employeeId: string) => void,
    handleEditModalOpen: (postUrl: string, employeeData?: IEmployeeData) => void,
}> = ({employeeData, handleDeleteModalOpen, handleEditModalOpen}) => {

    return (
        <Accordion
            defaultExpanded={!!localStorage.getItem(employeeData._id)}
            onChange={(event, expanded) => {
                if (expanded) {
                    localStorage.setItem(employeeData._id, "true");
                }
                else {
                    localStorage.removeItem(employeeData._id);
                }
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {employeeData.first_name} {employeeData.last_name}
            </AccordionSummary>
            <AccordionDetails>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Email:</TableCell>
                            <TableCell>{employeeData.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Gender:</TableCell>
                            <TableCell>{employeeData.gender}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Salary:</TableCell>
                            <TableCell>${employeeData.salary.toLocaleString("en-US", {minimumFractionDigits: 2})}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </AccordionDetails>
            <hr/>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button onClick={() => handleEditModalOpen(`/api/emp/employees/${employeeData._id}`, employeeData)}>Edit...</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => handleDeleteModalOpen(employeeData._id)} style={{color: "red"}}>Delete...</Button>
                </Grid>
            </Grid>
        </Accordion>
    )
}
