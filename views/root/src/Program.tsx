import React from "react";
import Appointment from "../../common/rules/Appointment";
import FullScreenDialog from "../../common/components/views/FullScreenDialog";
import Program from "../../common/components/smarts/Program";
import {spaPageFolder} from "../../common/constants";

type Props = {
    open: boolean,
    appointment: Appointment,
    onClose: () => void
}

export default function ProgramView(props: Props) {

    const {open, appointment, onClose} = props
    const makeLink = id => `/${spaPageFolder}/lesson?id=${id}`

    return (
        <FullScreenDialog open={open} onClose={onClose} title={"Программа назначенного курса"}>
            <Program appointment={appointment} makeLink={makeLink}/>
        </FullScreenDialog>
    )
}