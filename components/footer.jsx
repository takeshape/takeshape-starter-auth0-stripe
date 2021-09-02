import { Container, Text, Link } from 'theme-ui';

const Footer = () => {
  return (
    <Container as="footer" variant="layout.footer">
      <Text variant="smallHeading">
        Made by <Link href="">TakeShape</Link>
      </Text>
    </Container>
  );
};

export default Footer;
