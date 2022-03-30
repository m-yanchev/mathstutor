import React from 'react';
import Program from "../../common/components/smarts/Program";
import {spaPageFolder} from "../../common/constants";
import {Student} from "./model";

type Props = {
    profile: Student
}

export default function (props: Props) {

    const {profile} = props
    const makeLink = id => `/${spaPageFolder}/lesson?id=${id}&studentId=${profile.id}`

    return (
        <Program appointment={profile.appointment} makeLink={makeLink}/>
    )
}