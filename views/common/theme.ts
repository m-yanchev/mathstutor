import {createTheme} from "@material-ui/core/styles";

export default function getTheme() {

    const theme = createTheme()

    theme.typography.fontFamily = '"Montserrat",sans-serif'

    theme.typography.h1.fontSize = "1.4rem"
    theme.typography.h1.fontWeight = 600
    theme.typography.h1.letterSpacing = "0.025rem"
    theme.typography.h1.fontFamily = '"Montserrat",sans-serif'

    theme.typography.h2.fontSize = "1.2rem"
    theme.typography.h2.fontWeight = 500
    theme.typography.h2.fontFamily = '"Montserrat",sans-serif'

    theme.typography.h3.fontSize = "1.0rem"
    theme.typography.h3.fontWeight = 500
    theme.typography.h3.fontFamily = '"Montserrat",sans-serif'

    theme.typography.h6.fontFamily = '"Montserrat",sans-serif'

    theme.typography.subtitle1.fontSize = "0.8rem"
    theme.typography.subtitle1.fontFamily = '"Montserrat",sans-serif'

    theme.typography.subtitle2.fontFamily = '"Montserrat",sans-serif'

    theme.typography.body1.fontFamily = '"Montserrat",sans-serif'
    theme.typography.body1.fontSize = "0.9rem"

    theme.typography.body2.fontFamily = '"Montserrat",sans-serif'
    theme.typography.body2.fontSize = "0.8rem"

    theme.typography.button.fontWeight = 600
    theme.typography.button.fontFamily = '"Montserrat",sans-serif'

    theme.palette.primary.main = "#904050"
    theme.palette.primary.dark = "#602030"
    theme.palette.primary.light = "#E0A0B0"
    theme.palette.secondary.main = "#90B090"

    return theme
}