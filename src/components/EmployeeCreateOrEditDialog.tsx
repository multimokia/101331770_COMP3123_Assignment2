import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { EmployeeDetailsForm } from "../forms/EmployeeDetailsForm"
import { IEmployeeData } from "../types/IEmployeeData"

export const EmployeeFormDialogue: React.FC<{
    isOpen: boolean,
    title: string,
    description: string,
    rejectText: string,
    postUrl: string,
    onConfirm: (() => void),
    onReject: (() => void),
    onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void | undefined),
    defaultData?: IEmployeeData
}> = ({isOpen, title, description, rejectText, postUrl, onConfirm, onReject, onClose, defaultData}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="-dialog-title"
            aria-describedby="employeeform-dialog-description"
        >
            <DialogTitle id="employeeform-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="employeeform-dialog-description">
                    {description}
                </DialogContentText>
                <EmployeeDetailsForm postUrl={postUrl} modalCloseHandler={onConfirm} presetValues={defaultData}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onReject}>{rejectText}</Button>
            </DialogActions>
        </Dialog>
    )
}
