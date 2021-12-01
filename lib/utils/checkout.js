const getRedirectUrl = (redirectUrl) => {
  redirectUrl = redirectUrl ?? window?.location.href;

  if (redirectUrl.startsWith('http')) {
    return redirectUrl;
  }

  return new URL(redirectUrl, window?.location.href).href;
};

export const getCheckoutPayload = (items, redirectUrl) => {
  return {
    lineItems: items.map((i) => ({
      price: i.price.id,
      quantity: i.quantity
    })),
    mode: items.some((i) => i.price.recurring) ? 'subscription' : 'payment',
    redirectUrl: getRedirectUrl(redirectUrl)
  };
};
