import React, {useState} from "react";
import {Button, ButtonGroup, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: "0.5rem 0"
    }
})

type Props = {
    defaultLabelIdx: number,
    labels: string[],
    onClick: (idx: number) => void
}

export default function ToggleButtonGroup(props: Props) {

    const {defaultLabelIdx, labels, onClick} = props
    const [curIdx, setCurIdx] = useState<number>(defaultLabelIdx)
    const classes = useStyles()
    const getColor = idx => idx === curIdx ? "primary" : "default"
    const handleClick = idx => {
        setCurIdx(idx)
        onClick(idx)
    }

    return (
        <ButtonGroup className={classes.root} variant={"text"} size={"small"}>
            {labels.map((label, i) =>
                <Button key={i} color={getColor(i)} onClick={() => handleClick(i)}>
                    {label}
                </Button>
            )}
        </ButtonGroup>
    )
}