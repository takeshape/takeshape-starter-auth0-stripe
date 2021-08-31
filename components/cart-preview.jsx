import React, { useContext } from 'react';
import classNames from 'classnames';
import styled from '@emotion/styled';
import { css, Global, keyframes } from '@emotion/react';
import { mutate } from 'swr';
import { CartStateContext, CartDispatchContext, removeFromCart, toggleCartPopup } from '../lib/contexts/cart';
import { post } from '../lib/utils/fetcher';
import getStripe from '../lib/utils/stripe';

const cartStyles = css`
  :root {
    --primary-green: green;
    --white: white;
    --primary-orange: orange;
    --gray-eighty: gray;
    --gray-light: gray;
    --gray-dark: gray;
  }

  @keyframes slideUp {
    0% {
      transform: translateY(30px);
      opacity: 0.5;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  // Cart
  .cart {
    display: flex;
    display: -webkit-flex;
    margin-left: 64px;
    position: relative;
    z-index: 99;
    @media (max-width: 991px) {
      margin-left: 16px;
    }
  }
  .cart-info {
    @media (max-width: 991px) {
      display: none;
    }
  }

  .cart-info table {
    font-size: 14px;
    color: var(--primary-green);
    text-align: right;
    tr {
      padding: 0;
      margin: 0;
    }
    td {
      padding: 0 4px;
      line-height: 16px;
    }
  }
  .cart-icon {
    margin-left: 16px;
    z-index: 99;
    position: relative;
  }
  .cart-count {
    @media (min-width: 992px) {
      display: none;
    }
    @media (max-width: 991px) {
      display: block;
      position: absolute;
      background: var(--primary-orange);
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      width: 24px;
      border-radius: 50%;
      top: -6px;
      right: -9px;
    }
  }
  .cart-preview {
    display: none;
    background: $white;
    border: 1px solid var(--gray-eighty);
    &:before {
      content: '';
      position: absolute;
      display: block;
      top: -9px;
      right: 8px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid var(--gray-eighty);
      z-index: 1;
    }
    &:after {
      content: '';
      position: absolute;
      display: block;
      top: -7px;
      right: 9px;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid $white;
      z-index: 1;
    }
  }
  .cart-preview.active {
    z-index: 99;
    display: block;
    position: absolute;
    top: 48px;
    right: 0;
    width: 360px;
    height: 388px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    @media (max-width: 400px) {
      top: 45px;
      width: 100%;
      min-width: 300px;
      & > div {
        width: 100% !important;
      }
      .cart-items {
        width: 100%;
      }
      .stepper-input {
        a {
          display: none;
        }
      }
    }
  }

  .action-block {
    background: $white;
    position: absolute;
    bottom: 0;
    padding: 16px;
    width: 100%;
    button {
      background: var(--primary-orange);
      display: block;
      width: 100%;
      &.disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }
  }
  .empty-cart {
    text-align: center;
    img {
      width: 100%;
      max-width: 250px;
      margin: 42px auto 16px auto;
    }
    h2 {
      color: var(--gray-light);
      font-size: 18px;
    }
  }
  .cart-items {
    height: 320px;
    overflow-y: auto;
    width: 360px;
  }
  .cart-item {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    padding: 8px;
    .product-image {
      width: 48px;
      height: 48px;
    }
    .product-info {
      margin-left: 16px;
      flex-grow: 1;
      .product-name {
        color: var(--gray-light);
        font-size: 14px;
      }
      .product-price {
        color: var(--gray-light);
        font-weight: 700;
        &:before {
          content: '₹ ';
        }
      }
    }
    .product-total {
      margin-left: 16px;
      .quantity {
        color: var(--gray-light);
        font-size: 14px;
        text-align: right;
      }
      .amount {
        color: var(--gray-dark);
        font-weight: 700;
        text-align: right;
        &:before {
          content: '₹ ';
        }
      }
    }
    .product-remove {
      margin-left: 24px;
      height: 24px;
      line-height: 24px;
      width: 24px;
      font-size: 22px;
      color: var(--gray-eighty);
      background-color: $white;
      text-align: center;
      padding: 0;
      &:hover {
        color: $red;
      }
    }
    &:hover {
      background: $green-light-bg;
    }
  }

  @keyframes tada {
    from {
      transform: scale3d(1, 1, 1);
      opacity: 0;
    }

    10%,
    20% {
      transform: scale3d(0.8, 0.66, 0.66) rotate3d(0, 0, 1, -3deg);
    }

    30%,
    50%,
    70%,
    90% {
      transform: scale3d(1.2, 1.2, 1.2) rotate3d(0, 0, 1, 3deg);
    }

    40%,
    60%,
    80% {
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }

    to {
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }
  }

  .tada {
    animation-name: tada;
    animation-duration: 300ms;
    animation-fill-mode: both;
  }
`;

const CartPreview = () => {
  const { items, isCartOpen } = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);

  const handleRemove = (productId) => {
    return removeFromCart(dispatch, productId);
  };

  const handleProceedCheckout = async () => {
    const session = await post('/api/my/checkout', { lineItems: [{ price: items[0].price.id, quantity: 1 }] });
    const stripe = await getStripe();
    await stripe.redirectToCheckout({
      sessionId: session.id
    });
    mutate('/api/my/subscriptions');
    toggleCartPopup(dispatch);
  };

  return (
    <div className={classNames('cart-preview', { active: isCartOpen })}>
      <Global styles={cartStyles} />
      <ul className="cart-items">
        {items.map((product) => {
          return (
            <li className="cart-item" key={product.name}>
              {/* <img className="product-image" src={product.image} /> */}
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">
                  {(product.price.unit_amount / 100).toFixed(2)} {product.price.currency.toUpperCase()} /{' '}
                  {product.price.recurring.interval}
                </p>
              </div>
              <div className="product-total">
                {/* <p className="quantity">{`${product.quantity} ${product.quantity > 1 ? 'Nos.' : 'No.'}`}</p> */}
                {/* <p className="amount">{product.quantity * product.price}</p> */}
              </div>
              <button className="product-remove" onClick={() => handleRemove(product.id)}>
                ×
              </button>
            </li>
          );
        })}
      </ul>
      <div className="action-block">
        <button
          type="button"
          className={classNames({ disabled: items && items.length === 0 })}
          onClick={handleProceedCheckout}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
      <style jsx>{``}</style>
    </div>
  );
};

export default CartPreview;
