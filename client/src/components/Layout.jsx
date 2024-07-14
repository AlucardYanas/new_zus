import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBar from './ui/NavBar';
import Loader from './HOCs/Loader';
import useStore from '../store/index';

export default function Layout() {
  const user = useStore((state) => state.user);
  return (
    <Loader showSpinner={user.status === 'fetching'}>
      <Container>
        <NavBar />
        <Outlet />
      </Container>
    </Loader>
  );
}
