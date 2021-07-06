import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { useUser } from '@auth0/nextjs-auth0';
import { get } from '../lib/fetcher';
import { buildImageUrl } from '../lib/images';

const Header = () => {
  const { user } = useUser();
  const { data: profile } = useSWR('/api/my/profile', get);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/everybody">
              <a>Everybody</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/account">
                  <a>Account</a>
                </Link>
              </li>{' '}
              <li>
                <a href="/account-ssr">Account (SSR)</a>
              </li>{' '}
              <li>
                <a href="/api/auth/logout" data-testid="logout">
                  Logout
                </a>
                {profile?.avatar?.path && (
                  <img src={buildImageUrl(profile.avatar, { h: 50, w: 50, mask: 'ellipse', 'mask-bg': '28214a' })} />
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/api/auth/login" data-testid="login">
                  Login
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>

      <style jsx>{`
        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #28214a;
        }
        nav {
          max-width: 42rem;
          margin: 0.5rem auto;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: 1rem;
          height: 60px;
        }
        img {
          margin: 1rem;
        }
        li:nth-child(3) {
          margin-right: auto;
        }
        a {
          color: #5edeb3;
          text-decoration: none;
        }
        button {
          font-size: 1rem;
          color: #fff;
          cursor: pointer;
          border: none;
          background: none;
        }
      `}</style>
    </header>
  );
};

export default Header;
