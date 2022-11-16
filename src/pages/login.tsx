import { NavBar } from "../components/NavBar";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, Input, Button, Link } from "@mui/material";
import axios from "axios";

type ILoginInput = {
    username: string,
    password: string
}

export const Login: React.FC = (children) => {
    const { register, handleSubmit, setError, watch, formState: { errors } } = useForm<ILoginInput>();
    const onSubmit: SubmitHandler<ILoginInput> = (data: ILoginInput) => {
        axios.post("https://23.133.249.134:8888/api/user/login", data)
            .then(x => {
                if (x.status === 200) {
                    window.location.href = "/home";
                }
                else {
                    setError("password", {message: "Invalid credentials"})
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <NavBar/>
            <img className="backdrop" src="https://wallpapercave.com/wp/aOf1LFU.jpg" alt="a splash background of space"/>
            <div className="centered-flex full-viewport">
                <Card
                    className="frosted-glass-container"
                    style={{
                        marginTop: "15%",
                        paddingTop: "2%",
                        paddingBottom: "2%",
                        paddingLeft: "5%",
                        paddingRight: "5%"
                    }}
                >
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="username..." {...register("username", {required: true})}/>
                        <br/>
                        {errors.username && <span className="validation-error-text">Username is required.</span>}

                        <br/>
                        <Input placeholder="password..." type="password" {...register("password", {required: true})}/>
                        <br/>
                        {errors.password && <span className="validation-error-text">Password is required.</span>}

                        <br/>
                        <span>
                            <Button type="submit">Login</Button>
                            <Link
                                href="/signup"
                                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root"
                                style={{
                                    textDecoration: "none"
                                }}
                            >Need an account?</Link>
                        </span>
                    </form>
                </Card>
            </div>
        </>
    )
}
