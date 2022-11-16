import { Card, Link } from "@mui/material";
import { IEmployeeData } from "../types/IEmployeeData";

export const EmployeeEntry: React.FC<{employeeData: IEmployeeData}> = (children, employeeData: IEmployeeData) => {
    return (
        <Card className="employee-data">
            <h2>{employeeData.first_name} {employeeData.last_name}</h2>
            <hr/>
            <h4>Email: </h4>{employeeData.email}
            <h4>Gender: </h4>{employeeData.gender}
            <h4>Salary: </h4>${employeeData.salary}

            <hr/>
            <Link
                href={`/employee/edit/${employeeData._id}`}
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root"
            >Edit...</Link>
            <Link
                href={`/employee/edit/${employeeData._id}`}
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root"
                style={{
                    color: "red"
                }}
            >Delete...</Link>
        </Card>
    )
}
