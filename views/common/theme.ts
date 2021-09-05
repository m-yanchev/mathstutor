import {createTheme} from "@material-ui/core/styles";

export default function getTheme() {

    const theme = createTheme()

    theme.typography.h1.fontSize = "1.4rem"
    theme.typography.h1.fontWeight = 500
    theme.typography.h1.letterSpacing = "0.025rem"

    theme.typography.h2.fontSize = "1.2rem"
    theme.typography.h2.fontWeight = 450

    theme.typography.subtitle1.fontSize = "0.9rem"
    theme.typography.subtitle1.letterSpacing = "0.007em"

    theme.palette.primary.main = "#904050"
    theme.palette.primary.dark = "#602030"
    theme.palette.primary.light = "#E0A0B0"
    theme.palette.secondary.main = "#90B090"

    return theme
}