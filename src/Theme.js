import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#c5c6c7',
            main: '#0b0c10'
        },
        secondary: {
            main: '#43a29e'
        },
        text: {
            primary: '#66fcf1',
            secondary: '#c5c6c7'
        }
        
    },

    background: {
        paper: '#1f2833',
        default: '#1f2833'
    },

    typography: {
        h3: {
            fontWeight: 300
        } 
    }

})

export default theme;