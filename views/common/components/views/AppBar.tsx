import React, {ReactNode} from "react";
import {
    AppBar as MaterialAppBar,
    Link,
    makeStyles,
    Slide,
    Toolbar,
    Typography,
    useScrollTrigger
} from "@material-ui/core";
import {LOGO} from "../../constants";
import ProfileMenu from "./ProfileMenu";

type Props = {
    children?: ReactNode | Array<ReactNode>
    profile?: boolean
}

const useStyles = makeStyles({
    toolbar: {
        justifyContent: "space-between"
    },
    logo: {
        fontSize: "1.2rem",
        fontWeight: 600
    }
})

function HideOnScroll({children}) {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function AppBar({children, profile}: Props) {

    const classes = useStyles()

    return (
        <HideOnScroll>
            <MaterialAppBar>
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.logo} component={"div"} noWrap>
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