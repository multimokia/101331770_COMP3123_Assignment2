import { Card } from "@mui/material";
import { Layout } from "./Layout";

export const ErrorPage: React.FC<{errorCode: number, errorText: string}> = ({errorCode, errorText}) => {
    return (
        <Layout imgUrl="https://attackofthefanboy.com/wp-content/uploads/2019/06/Outer-Wilds-Anglerfish-Dark-Bramble-1.jpg">
            <Card
                className="frosted-glass-container"
                style={{
                    justifySelf: "center",
                    maxWidth: "50%",
                    marginTop: "15%",
                    paddingTop: "2%",
                    paddingBottom: "2%",
                    paddingLeft: "5%",
                    paddingRight: "5%"
                }}
            >
                <h1 style={{fontSize: "400%"}}>{errorCode}</h1>
                <h4>{errorText}</h4>
            </Card>
        </Layout>
    );
}
