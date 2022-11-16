import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const AlertDialogue: React.FC<{
    isOpen: boolean,
    title: string,
    description: string,
    confirmText: string,
    rejectText: string,
    onConfirm: (() => void),
    onReject: (() => void),
    onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void | undefined)
}> = ({isOpen, title, description, confirmText, rejectText, onConfirm, onReject, onClose}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onReject}>{rejectText}</Button>
                <Button onClick={onConfirm} autoFocus>{confirmText}</Button>
            </DialogActions>
        </Dialog>
    )
}
