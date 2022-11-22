import { useForm, SubmitHandler } from "react-hook-form";
import { Card, Input, Button, Link } from "@mui/material";
import axios from "axios";
import { Layout } from "../components/Layout";
import { ISignupInput } from "../types/ISignupInput";

export const Signup: React.FC = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<ISignupInput>();
    const onSubmit: SubmitHandler<ISignupInput> = (data: ISignupInput) => {
        axios.post("https://23.133.249.130:3000/api/user/signup", data)
            .then(x => {
                if (data.password !== data.confirmpassword) {
                    setError("password", {message: "Passwords do not match."});
                    setError("confirmpassword", {message: "Passwords do not match."});
                    return;
                }

                window.location.href = "/";
            })
            .catch(err => {
                if (err.response.status === 409) {
                    setError("username", {message: "User already exists."});
                }
                else if (err.response.status === 500 && err.response.data.message.keyPattern.email) {
                    setError("email", {message: "Email already registered."});
                }
            });
    }

    return (
        <Layout imgUrl="https://wallpapercave.com/wp/aOf1LFU.jpg">
            <Card
                className="frosted-glass-container"
                style={{
                    marginTop: "15%",
                    paddingTop: "2%",
                    paddingBottom: "2%",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    height: "fit-content",
                    minWidth: "25%"
                }}
            >
                <h1>Signup</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        placeholder="username..."
                        {...register("username", {required: "Username is required."})}
                        error={!!errors.username}
                        fullWidth={true}
                    />
                    <br/>
                    {errors.username && <span className="validation-error-text">{errors.username.message}</span>}
                    <br/>
                    <Input
                        placeholder="email..."
                        type="email"
                        {...register("email", {required: "Email is required."})}
                        error={!!errors.email}
                        fullWidth={true}
                    />
                    <br/>
                    {errors.email && <span className="validation-error-text">{errors.email.message}</span>}
                    <br/>
                    <Input
                        placeholder="password..."
                        type="password"
                        {...register("password", {required: "Password is required."})}
                        error={!!errors.password}
                        fullWidth={true}
                    />
                    <br/>
                    {errors.password && <span className="validation-error-text">{errors.password.message}</span>}
                    <br/>
                    <Input
                        placeholder="confirm password..."
                        type="password"
                        {...register("confirmpassword", {required: "Password confirmation is required."})}
                        error={!!errors.confirmpassword}
                        fullWidth={true}
                    />
                    <br/>
                    {errors.confirmpassword && <span className="validation-error-text">{errors.confirmpassword.message}</span>}
                    <br/>

                    <br/>
                    <span>
                        <Button type="submit">Create account</Button>
                    </span>
                </form>
            </Card>
        </Layout>
    )
}
