import { useForm, SubmitHandler } from "react-hook-form";
import { Card, Input, Button, Link } from "@mui/material";
import axios from "axios";
import { Layout } from "../components/Layout";
import { ILoginInput } from "../types/ILoginInput";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";

export const Login: React.FC = () => {
    const ctx = useContext(UserContext);
    const { register, handleSubmit, setError, formState: { errors } } = useForm<ILoginInput>();
    const onSubmit: SubmitHandler<ILoginInput> = (data: ILoginInput) => {
        axios.post("/api/user/login", data)
            .then(x => {
                ctx.setUsername(data.username);
                ctx.setToken(x.data.jwt);
                window.location.href = "/#/employees";
            })
            .catch(err => {
                setError("password", {message: "Invalid credentials."});
                console.log(err);
            })
    }

    return (
        <Layout imgUrl="https://wallpapercave.com/wp/aOf1LFU.jpg">
            <Card
                className="frosted-glass-container"
                style={{
                    marginTop: "24%",
                    paddingTop: "2%",
                    paddingBottom: "2%",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    maxWidth: "30%",
                    height: "fit-content"
                }}
            >
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        placeholder="username..."
                        {...register("username", {required: true})}
                        error={!!errors.username}
                    />
                    <br/>
                    {errors.username && <span className="validation-error-text">Username is required.</span>}

                    <br/>
                    <Input
                        placeholder="password..."
                        type="password"
                        {...register("password", {required: "Password is required."})}
                        error={!!errors.password}
                    />
                    <br/>
                    {errors.password && <span className="validation-error-text">{errors.password.message}</span>}

                    <br/>
                    <span>
                        <Button type="submit">Login</Button>
                        <Link
                            href="/#/signup"
                            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root"
                            style={{
                                textDecoration: "none"
                            }}
                        >Need an account?</Link>
                    </span>
                </form>
            </Card>
        </Layout>
    )
}
