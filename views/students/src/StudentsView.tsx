import React from 'react';
import Profile from "../../common/rules/Profile";
import {List, ListItem, ListItemText} from "@mui/material";
import {spaPageFolder} from "../../common/constants";

type Props = {
    profiles: Profile[]
}

export default function StudentsView(props: Props) {

    const {profiles} = props

    return (
        <List>
            {profiles.map(profile => (
                <ListItem key={profile.id} component={"a"}
                          href={`/${spaPageFolder}/student?id=${profile.id}`}>
                    <ListItemText primary={profile.name} secondary={profile.email}
                                  primaryTypographyProps={{color: "primary"}}/>
                </ListItem>
            ))}
        </List>
    )
}