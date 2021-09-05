import React from "react";
import {Grid, makeStyles} from "@material-ui/core";
import ResultMessage from "../../common/components/views/ResultMessage";
import LinkList from "../../common/components/views/LinkList";

const useStyles = makeStyles({
    root: {
        height: "100%"
    },
    message: {
        paddingBottom: "3rem"
    }
})

type Props = {
    children: string | null
}

export default function SignInDialog(props: Props) {

    const {children} = props
    const classes = useStyles()

    const linkItems = [{id: "root", href: "/", label: "Главная страница"}]

    return (
        <Grid className={classes.root} container direction={"column"} justifyContent={"space-between"}>
            <ResultMessage className={classes.message}>
                {children || ""}
            </ResultMessage>
            <LinkList items={linkItems}/>
        </Grid>
    )
}