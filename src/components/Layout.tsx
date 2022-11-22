import { Container } from "@mui/material";
import { NavBar } from "./NavBar";

export const Layout: React.FC<{children: React.ReactNode, imgUrl: string}> = ({children, imgUrl}) => {
    return (
        <>
            <NavBar/>
            <img className="backdrop" src={imgUrl} alt="a splash background of space"/>
            <Container fixed style={{display: "flex", justifyContent: "center", height: "90vh"}}>
                {children}
            </Container>
        </>
    );
}
