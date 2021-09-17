import React from "react";
import {makeStyles} from "@material-ui/core";
import RootDesc from "../../common/components/views/RootDesc";
import MainBox from "../../common/components/views/MainBox";

type Props = {
    children: string
}

const useStyles = makeStyles({
    desc: {
        paddingBottom: "2rem"
    }
})

const LINK_ITEMS = [{id: "root", href: "/", label: "Главная страница"}]

export default function ResultMessage(props: Props) {

    const {children} = props

    const classes = useStyles()

    return (
        <MainBox linkItems={LINK_ITEMS}>
            <RootDesc className={classes.desc}>
                {children}
            </RootDesc>
        </MainBox>
    )
}