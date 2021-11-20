import React, {ReactNode} from 'react';
import APIProvider from "./APIProvider";
import StyledProvider from "./StyledProvider";

type Props = {
    children: ReactNode | ReactNode[]
    mocked?: any
}

export default function AppProvider(props: Props) {

    const {children} = props

    return (
        <APIProvider>
            <StyledProvider>
                {children}
            </StyledProvider>
        </APIProvider>
    )
}