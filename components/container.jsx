import { Box } from 'theme-ui';

const Container = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        maxWidth: 1024,
        mx: 'auto',
        px: 3
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Container;
