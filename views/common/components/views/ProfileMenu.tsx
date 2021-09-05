import React from "react";
import LinkMenu from "./LinkMenu";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {IconButton} from "@material-ui/core";

export default function ProfileMenu() {

    const items = [
        {id: "profile", href: "/form/profile", label: "Просмотр и редактирование профиля"},
        {id: "update-password", href: "/form/update-password", label: "Изменение пароля"}
    ]

    const MenuButton = ({onClick}) => <IconButton onClick={onClick} color={"inherit"}><AccountBoxIcon/></IconButton>

    return (
        <LinkMenu MenuButton={MenuButton} id={"profile-menu"} items={items}/>
    )
}