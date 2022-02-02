import { swiss } from '@theme-ui/presets';
import { lighten } from '@theme-ui/color';

const theme = {
  ...swiss,
  colors: {
    ...swiss.colors,
    lightGray: lighten('black', 0.5)
  },
  styles: {
    ...swiss.styles,
    flexspace: {
      mx: 'auto'
    },
    navbox: {
      padding: '8px'
    },
    spinner: {
      color: 'primary'
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
    section: {
      my: 4
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
    },
    snackbar: {
      position: 'fixed',
      left: '50%',
      top: '10px',
      opacity: 0,
      transform: 'translateX(-50%)',
      zIndex: 100
    },
    loading: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: '0'
    }
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)'
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'muted'
    }
  },
  buttons: {
    primary: {
      cursor: 'pointer',
      '&:disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'muted'
      }
    },
    login: {
      cursor: 'pointer',
      backgroundColor: 'purple'
    },
    logout: {
      cursor: 'pointer',
      backgroundColor: 'lightGray'
    },
    icon: {
      cursor: 'pointer'
    }
  },
  links: {
    nav: {
      fontFamily: 'body'
    }
  },
  text: {
    ...swiss.text,
    paragraph: {
      my: 2,
      textAlign: 'justify',
      textAlignLast: 'start',
      textJustify: 'auto'
    },
    smallHeading: {
      fontSize: 1,
      fontFamily: 'heading',
      fontWeight: 'heading',
      textTransform: 'uppercase'
    },
    h1: {
      variant: "text.display"
    },
    h2: {
      variant: "text.heading",
      fontSize: 5
    },
    h3: {
      variant: "text.heading",
      fontSize: 4
    },
    h4: {
      variant: "text.heading",
      fontSize: 3
    },
    h5: {
      variant: "text.heading",
      fontSize: 2
    }       
  },
  alerts: {
    ...swiss.alerts,
    primary: {
      color: 'background',
      bg: 'primary'
    },
    secondary: {
      color: 'highlight',
      bg: 'purple'
    }
  },
  images: {
    avatar: {
      width: 200,
      height: 200,
      borderRadius: 99999,
      backgroundColor: 'muted'
    },
    avatarHeader: {
      width: 35,
      height: 35,
      borderRadius: 99999,
      backgroundColor: 'muted',
      borderColor: 'primary',
      borderWidth: 2,
      borderStyle: 'solid'
    }
  },
  forms: {
    input: {
      '&:read-only': {
        color: 'gray',
        borderColor: 'gray'
      },
      '&:focus:read-only': {
        borderColor: 'none',
        boxShadow: 0,
        outline: 'none'
      }
    },
    disabledLabel: {
      color: 'gray',
      borderColor: 'gray'
    },
    select: {
      '&:disabled': {
        color: 'gray',
        borderColor: 'gray'
      }
    }
  },
  cart: {
    itemList: {
      flexDirection: 'column'
    },
    item: {
      marginBottom: 4
    },
    itemGrid: {
      alignItems: 'center'
    }
  },
  product: {
    quantity: {
      width: 50
    }
  }
};

export default theme;
