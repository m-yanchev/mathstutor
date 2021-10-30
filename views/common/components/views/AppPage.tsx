import React from "react";
import AppBar from "./AppBar";
import Container from "./Container";
import Header from "./Header";

type Props = {
    profile?: boolean,
    height?: number,
    header: string,
    title?: string,
    children: any
}

export default function AppPage(props: Props) {

    const {height, children, profile, title, header} = props

    return (
        <>
            <AppBar profile={Boolean(profile)}/>
            <Container height={height}>
                <Header title={title} sx={{marginLeft: "16px"}}>{header}</Header>
                {children}
            </Container>
        </>
    )
}