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
    containerProps?: ContainerProps,
    headerProps?: HeaderProps
}
type ContainerProps = {
    maxWidth?: MaxWidth
}
type HeaderProps = {
    onBack?: () => void
}

export default function AppPage(props: Props) {

    const {height, children, profile, title, header} = props
    const headerProps = props.headerProps || {}
    const containerProps = props.containerProps || {}

    return (
        <>
            <AppBar profile={Boolean(profile)}/>
            <Container height={height} {...containerProps}>
                <Header title={title} {...headerProps}>{header}</Header>
                {children}
            </Container>
        </>
    )
}