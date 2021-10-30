import React from "react";
import LinkMenu from "./LinkMenu";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {IconButton} from "@mui/material";

export default function ProfileMenu() {

    const items = [
        {id: "profile", href: "/form/profile", label: "Просмотр и редактирование профиля"},
        {id: "update-password", href: "/form/update-password", label: "Изменение пароля"},
        {id: "sign-out", href: "/form/sign-out", label: "Выход"}
    ]

    const MenuButton = ({onClick}) => <IconButton onClick={onClick} color={"inherit"}><AccountBoxIcon/></IconButton>

    return (
        <LinkMenu MenuButton={MenuButton} id={"profile-menu"} items={items}/>
    )
}