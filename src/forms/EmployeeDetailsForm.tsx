import { Button, FormControl, FormControlLabel, FormLabel, Grid, Input, Radio, RadioGroup } from "@mui/material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { IEmployeeData } from "../types/IEmployeeData";

export const EmployeeDetailsForm: React.FC<{
    postUrl: string,
    modalCloseHandler: () => void,
    presetValues?: IEmployeeData
}> = ({postUrl, modalCloseHandler, presetValues}) => {

    const { register, handleSubmit, formState: { errors } } = useForm<IEmployeeData>();
    const onSubmit: SubmitHandler<IEmployeeData> = (data: IEmployeeData) => {
        if (presetValues !== undefined) {
            axios.put(postUrl, data)
                .then(resp => {
                    modalCloseHandler();
                })
                .catch(console.error);
        }
        else {
            axios.post(postUrl, data)
                .then(resp => {
                    modalCloseHandler();
                })
                .catch(console.error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Input
                        placeholder="first name..."
                        defaultValue={presetValues?.first_name || ""}
                        fullWidth={true}
                        {...register("first_name", {required: "First name is required."})}
                        error={!!errors.first_name}
                    />
                    <br/>
                    {errors.first_name && <span className="validation-error-text">{errors.first_name.message}</span>}
                </Grid>
                <Grid item xs={6}>
                    <Input
                        placeholder="last name..."
                        defaultValue={presetValues?.last_name || ""}
                        fullWidth={true}
                        {...register("last_name", {required: "Last name is required."})}
                        error={!!errors.last_name}
                    />
                    <br/>
                    {errors.last_name && <span className="validation-error-text">{errors.last_name.message}</span>}
                </Grid>
                <Grid item xs={6}>
                    <Input
                        placeholder="email..."
                        defaultValue={presetValues?.email || ""}
                        fullWidth={true}
                        {...register("email", {required: "Email is required."})}
                        error={!!errors.email}
                    />
                    <br/>
                    {errors.email && <span className="validation-error-text">{errors.email.message}</span>}
                </Grid>
                <Grid item xs={6}>
                    <Input
                        placeholder="salary..."
                        type="number"
                        defaultValue={presetValues?.salary || ""}
                        fullWidth={true}
                        {...register("salary", {required: "Salary is required."})}
                        error={!!errors.salary}
                    />
                    <br/>
                    {errors.salary && <span className="validation-error-text">{errors.salary.message}</span>}
                </Grid>
                <Grid item xs={12}>
                    <FormControl error={!!errors.gender}>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            defaultValue={presetValues?.gender || ""}
                        >
                            <FormControlLabel value="male" control={<Radio />} {...register("gender", { required: "Gender is required."})} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} {...register("gender", { required: "Gender is required."})} label="Female" />
                            <FormControlLabel value="other" control={<Radio />} {...register("gender", { required: "Gender is required."})} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    <br/>
                    {errors.gender && <span className="validation-error-text">{errors.gender.message}</span>}
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit">Save</Button>
                </Grid>
            </Grid>
        </form>
    );
}
