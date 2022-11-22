import { Card, Table, TableBody, TableRow, TableCell, Accordion, AccordionDetails, AccordionSummary, Button, Grid } from "@mui/material";
import { IEmployeeData } from "../types/IEmployeeData";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const EmployeeEntry: React.FC<{employeeData: IEmployeeData, handleModalOpen: (employeeId: string) => void}> = ({employeeData, handleModalOpen}) => {
    return (
        <Card className="employee-data">
            <Accordion>
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
                                <TableCell>${employeeData.salary}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </AccordionDetails>
                <hr/>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button href={`/employee/edit/${employeeData._id}`}>Edit...</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => handleModalOpen(employeeData._id)} style={{color: "red"}}>Delete...</Button>
                    </Grid>
                </Grid>
            </Accordion>
        </Card>
    )
}
