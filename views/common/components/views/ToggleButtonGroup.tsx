import React, {useState} from "react";
import {Button, ButtonGroup} from "@mui/material";

type Props = {
    defaultLabelIdx: number,
    labels: string[],
    onClick: (idx: number) => void
}

export default function ToggleButtonGroup(props: Props) {

    const {defaultLabelIdx, labels, onClick} = props
    const [curIdx, setCurIdx] = useState<number>(defaultLabelIdx)
    const getColor = idx => idx === curIdx ? "primary" : "inherit"
    const handleClick = idx => {
        setCurIdx(idx)
        onClick(idx)
    }

    return (
        <ButtonGroup sx={{margin: "0.5rem 0"}} variant={"text"} size={"small"}>
            {labels.map((label, i) =>
                <Button key={i} color={getColor(i)} onClick={() => handleClick(i)}>
                    {label}
                </Button>
            )}
        </ButtonGroup>
    )
}