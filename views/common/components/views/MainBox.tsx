import React from "react"
import type {ReactNode} from "react";
import {makeStyles, Grid} from "@material-ui/core";
import LinkList, {Item} from "./LinkList";

const useStyles = makeStyles({
    root: {
    },
    box: {
        paddingBottom: "3rem",
        flexGrow: 1
    },
    linkList: {
    }
})

type Props = {
    linkItems: Array<Item>,
    children: ReactNode | Array<ReactNode>
}

export default function MainBox(props: Props) {

    const {children, linkItems} = props
    const classes = useStyles()

    return (
        <Grid className={classes.root} container item direction={"column"} justifyContent={"space-between"}>
            <Grid className={classes.box} container item direction={"column"}>{children}</Grid>
            <Grid className={classes.linkList} item>
                <LinkList items={linkItems}/>
            </Grid>
        </Grid>
    )
}