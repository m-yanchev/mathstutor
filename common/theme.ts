import {createTheme} from "@material-ui/core/styles";

export default function getTheme() {

    const theme = createTheme()

    theme.typography.h1.fontSize = "1.5rem"
    theme.typography.h1.fontWeight = 500

    return theme
}