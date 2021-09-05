import React from "react";
import {Link, Menu, MenuItem} from "@material-ui/core";

type Props = {
    id: string,
    items: Array<Item>,
    MenuButton: any
}

type Item = {
    id: string,
    label: string,
    href: string
}

export default function LinkMenu(props: Props) {

    const {id, items, MenuButton} = props

    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const MenuLink = ({children, href, onClick}) =>
        <MenuItem onClick={onClick}>
            <Link href={href}>
                {children}
            </Link>
        </MenuItem>

    return (
        <>
            <MenuButton onClick={handleClick} aria-controls={id} aria-haspopup/>
            <Menu id={id} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}
                  onClose={handleClose}>
                {items.map(item =>
                    <MenuLink key={item.id} href={item.href} onClick={handleClose}>{item.label}</MenuLink>
                )}
            </Menu>
        </>
    )
}