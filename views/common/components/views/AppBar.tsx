import React, {ReactNode} from "react";
import {AppBar as MaterialAppBar, Typography, Link, Slide, Toolbar, useScrollTrigger} from "@mui/material"
import {LOGO} from "../../constants";
import ProfileMenu from "./ProfileMenu";

type Props = {
    children?: ReactNode | Array<ReactNode>
    profile?: boolean
}

function HideOnScroll({children}) {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function AppBar({children, profile}: Props) {

    return (
        <HideOnScroll>
            <MaterialAppBar>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <Typography component={"div"} noWrap sx={{fontSize: "1.2rem", fontWeight: 600}}>
                        <Link href={LOGO.url} color={"inherit"} underline={"none"}>
                            {LOGO.name}
                        </Link>
                    </Typography>
                    {children}
                    {profile && <ProfileMenu/>}
                </Toolbar>
            </MaterialAppBar>
        </HideOnScroll>
    )
}