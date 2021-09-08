/** @jsxImportSource theme-ui */
import { Box } from 'theme-ui';

const Section = ({ children, ...props }) => {
  return (
    <Box
      as="section"
      sx={{
        mb: 4
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Section;
