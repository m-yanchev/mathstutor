import React from "react";
import {ListItem, List, ListItemText, makeStyles} from "@material-ui/core";

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
                <ListItem className={classes.item} key={item.id} component={"a"} href={item.href} button disableGutters>
                    <ListItemText primaryTypographyProps={{variant: "button", color: "primary"}}>
                        {item.label}
                    </ListItemText>
                </ListItem>)
            }
        </List>
    )
}