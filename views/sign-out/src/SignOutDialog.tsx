import React from "react";
import RootDesc from "../../common/components/views/RootDesc";
import MainBox from "../../common/components/views/MainBox";
import ConfirmButton from "../../common/components/views/ConfirmButton";

type Props = {
    onConfirm: () => void
}

const WARNING = "Вы уверены, что хотите выйти из системы?"
const LINK_ITEMS = [{id: "root", href: "/", label: "Главная страница"}]

export default function SignOutDialog(props: Props) {

    const {onConfirm} = props

    return (
        <MainBox linkItems={LINK_ITEMS}>
            <RootDesc sx={{paddingBottom: "2rem"}}>
                {WARNING}
            </RootDesc>
            <ConfirmButton onClick={onConfirm}/>
        </MainBox>
    )
}