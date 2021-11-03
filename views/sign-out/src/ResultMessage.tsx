import React from "react";
import RootDesc from "../../common/components/views/RootDesc";
import MainBox from "../../common/components/views/MainBox";

type Props = {
    children: string
}

const LINK_ITEMS = [{id: "root", href: "/", label: "Главная страница"}]

export default function ResultMessage(props: Props) {

    const {children} = props

    return (
        <MainBox linkItems={LINK_ITEMS}>
            <RootDesc sx={{paddingBottom: "2rem"}}>
                {children}
            </RootDesc>
        </MainBox>
    )
}