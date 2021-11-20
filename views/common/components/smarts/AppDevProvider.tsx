import React, {ReactNode} from 'react';
import {MockedProvider} from "@apollo/client/testing";
import StyledProvider from "./StyledProvider";

type Props = {
    children: ReactNode | ReactNode[]
    mocks: any
}

export default function AppDevProvider(props: Props) {

    const {children, mocks} = props

    return (
        <MockedProvider mocks={mocks} addTypename={false}>
            <StyledProvider>
                {children}
            </StyledProvider>
        </MockedProvider>
    )
}