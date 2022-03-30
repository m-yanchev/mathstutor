import React from "react";
import {Grid, IconButton, Typography} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

type Props = {
    sx?: any,
    children: string,
    title?: string,
    onBack?: () => void
}

export default function Header(props: Props) {

    const {children, title, onBack, sx} = props

    return (
        <Grid sx={{marginBottom: 3}} container direction={"row"}>
            {onBack &&
                <Grid item>
                    <IconButton onClick={onBack} color={"primary"}><ArrowBackIosIcon/></IconButton>
                </Grid>
            }
            <Grid container item xs alignContent={"center"} justifyContent={"center"}>
                {title ? <>
                        <Typography component={"h2"} variant={"h2"} color={"textSecondary"} sx={sx}>
                            {children + " "}
                            <Typography component={"span"} variant={"inherit"} color={"textPrimary"}>
                                {title}
                            </Typography>
                        </Typography>
                    </> :
                    <Typography align={"center"} noWrap component={"h2"} variant={"h2"} sx={sx}>
                        {children}
                    </Typography>
                }
            </Grid>
        </Grid>
    )
}