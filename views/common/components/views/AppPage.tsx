import React from "react";
import AppBar from "./AppBar";
import Container, {MaxWidth} from "./Container";
import Header from "./Header";

type Props = {
    profile?: boolean,
    height?: number,
    header: string,
    title?: string,
    children: any,
    containerProps?: ContainerProps
}
type ContainerProps = {
    maxWidth?: MaxWidth
}

export default function AppPage(props: Props) {

    const {height, children, profile, title, header} = props
    const containerProps = props.containerProps || {}

    return (
        <>
            <AppBar profile={Boolean(profile)}/>
            <Container height={height} {...containerProps}>
                <Header title={title} sx={{marginLeft: "16px"}}>{header}</Header>
                {children}
            </Container>
        </>
    )
}