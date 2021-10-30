import React from "react";
import {Button} from "@mui/material";

type Props = {
    children: string | Element
    onClick: () => void
}

export default function MainButton(props: Props) {

    const {children, onClick} = props

    return (
        <Button fullWidth onClick={onClick} variant={"outlined"} color={"primary"}
                sx={{margin: "1rem 0 0 0", height: "2rem"}}>
            {children}
        </Button>
    )
}