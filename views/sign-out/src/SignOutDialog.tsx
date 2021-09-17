import React from "react";
import {makeStyles} from "@material-ui/core";
import RootDesc from "../../common/components/views/RootDesc";
import MainBox from "../../common/components/views/MainBox";
import ConfirmButton from "../../common/components/views/ConfirmButton";

const useStyles = makeStyles({
    desc: {
        paddingBottom: "2rem"
    }
})

type Props = {
    onConfirm: () => void
}

const WARNING = "Вы уверены, что хотите выйти из системы?"
const LINK_ITEMS = [{id: "root", href: "/", label: "Главная страница"}]

export default function SignOutDialog(props: Props) {

    const {onConfirm} = props
    const classes = useStyles()

    return (
        <MainBox linkItems={LINK_ITEMS}>
            <RootDesc className={classes.desc}>
                {WARNING}
            </RootDesc>
            <ConfirmButton onClick={onConfirm}/>
        </MainBox>
    )
}