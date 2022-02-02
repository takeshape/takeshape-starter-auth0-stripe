import { Grid, Box, Card, IconButton, Paragraph, Text } from '@theme-ui/components';
import { formatPrice } from 'lib/utils/text';
import { format } from 'date-fns';
import { FiCheckCircle, FiArrowDownCircle } from 'react-icons/fi';

export const PaymentItemCard = ({ payment: { created, invoice, currency, amount } }) => {
  return (
    <Card>
      <Grid gap={2} columns={2}>
        <Box>
          <Text variant="smallHeading" sx={{ color: 'lightGray' }}>
            {format(created * 1000, 'PP')}
          </Text>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          {invoice?.invoicePdf ? (
            <IconButton as="a" target="_blank" href={invoice.invoicePdf}>
              <FiArrowDownCircle />
            </IconButton>
          ) : null}
          {invoice?.paid ? <FiCheckCircle color="green" /> : null}
        </Box>
      </Grid>
      Total: {formatPrice(currency, amount)}
    </Card>
  );
};

export const PaymentList = ({ payments }) => {
  return (
    <>
      {payments.length ? (
        <Grid gap={3} columns={1}>
          {payments.map((payment) => (
            <Box key={payment.id}>
              <PaymentItemCard payment={payment} />
            </Box>
          ))}
        </Grid>
      ) : (
        <Paragraph>No payments to display!</Paragraph>
      )}
    </>
  );
};
