import React, {ReactNode} from "react";
import {AppBar, Dialog, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}))

type Props = {
    open: boolean,
    title: string,
    children?: ReactNode | ReactNode[],
    onClose: () => void
}

export default function FullScreenDialog(props: Props) {

    const {open, title, children, onClose} = props
    const classes = useStyles()

    return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} onClick={onClose} aria-label={"close"}>
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} noWrap>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
        </Dialog>
    )
}