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
                    height: "fit-content"
                }}
            >
                <h1>Signup</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="username..." {...register("username", {required: "Username is required."})}/>
                    <br/>
                    {errors.username && <span className="validation-error-text">{errors.username.message}</span>}
                    <br/>
                    <Input placeholder="password..." type="password" {...register("password", {required: "Password is required."})}/>
                    <br/>
                    {errors.password && <span className="validation-error-text">{errors.password.message}</span>}
                    <br/>
                    <Input placeholder="email..." type="email" {...register("email", {required: "Email is required."})}/>
                    <br/>
                    {errors.email && <span className="validation-error-text">{errors.email.message}</span>}

                    <br/>
                    <span>
                        <Button type="submit">Create account</Button>
                    </span>
                </form>
            </Card>
        </Layout>
    )
}
