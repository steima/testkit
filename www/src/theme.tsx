import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#061539',
      light: '#259794'
    },
    secondary: {
      main: '#103D7B',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f0f0f0',
    },
  },
});

export default customTheme;
