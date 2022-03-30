import React from 'react';
import {Grid, Typography} from "@mui/material";
import HtmlDesc from "./HtmlDesc";

type Props = {
    numb?: number
    image: Image | null
    commonDesc: string | null
    desc: string
    withoutPadding?: boolean
}

interface Image {
    alt: string
    src: string
}

export default function (props: Props) {

    const {image, commonDesc, desc, withoutPadding, numb} = props

    return (
        <Grid container>
            {numb &&
                <Grid item xs={12} sx={{paddingLeft: withoutPadding ? "0" : "16px"}}>
                    <Typography variant={"h6"}>{`Задание №${numb}`}</Typography>
                </Grid>
            }
            <Grid item xs={12} sm={image ? 7 : 12} sx={{paddingLeft: withoutPadding ? "0" : "16px"}}>
                {commonDesc && <HtmlDesc>{commonDesc}</HtmlDesc>}
                <HtmlDesc>{desc}</HtmlDesc>
            </Grid>
            {image &&
            <Grid sx={{padding: "0 1rem"}} container item xs={12} sm={5} alignItems={"center"}
                  justifyContent={"center"}>
                <img style={{maxWidth: "100%"}}
                     src={image.src} alt={image.alt}/>
            </Grid>}
        </Grid>
    )
}