import React from "react";
import {Link, List, ListItem, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    item: {
        height: "2rem"
    }
}))

type Props = {
    items: Array<Item>
}

export type Item = {
    id: string,
    href: string,
    label: string
}

export default function LinkList(props: Props) {

    const {items} = props

    const classes = useStyles()

    return (
        <List>
            {items.map(item =>
                <ListItem className={classes.item} key={item.id} button disableGutters>
                    <Link href={item.href} underline={"none"} variant={"button"}>{item.label}</Link>
                </ListItem>)
            }
        </List>
    )
}