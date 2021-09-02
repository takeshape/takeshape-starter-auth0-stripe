import { swiss, deep } from '@theme-ui/presets';

const theme = {
  ...swiss,
  colors: {
    ...swiss.colors,
    modes: {
      dark: {
        ...deep.colors
      }
    }
  },
  styles: {
    ...swiss.styles,
    flexspace: {
      mx: 'auto'
    },
    navbox: {
      padding: '8px'
    }
  },
  layout: {
    page: {
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%'
    },
    main: {
      maxWidth: 1024,
      mx: 'auto',
      py: 3,
      px: 4,
      flex: '1 1 auto'
    },
    container: {
      maxWidth: 1024,
      mx: 'auto',
      py: 3,
      px: 4
    },
    footer: {
      maxWidth: 1024,
      mx: 'auto',
      py: 3,
      px: 4
    },
    cart: {
      px: 10,
      minHeight: '100vh',
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      height: '100%',
      width: '100%',
      maxWidth: '500px',
      zIndex: 9999,
      overflow: 'auto',
      willChange: 'transform',
      backgroundColor: '#fff',
      flexDirection: 'column',
      boxShadow: '0 2px 6px #777',
      transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  buttons: {
    ...swiss.buttons,
    primary: {
      cursor: 'pointer'
    },
    disabled: {
      cursor: 'not-allowed',
      backgroundColor: 'muted'
    }
  },
  links: {
    nav: {
      fontFamily: 'body'
    }
  },
  text: {
    ...swiss.text,
    smallHeading: {
      fontSize: 1,
      fontFamily: 'heading',
      fontWeight: 'heading',
      textTransform: 'uppercase'
    }
  }
};

export default theme;
