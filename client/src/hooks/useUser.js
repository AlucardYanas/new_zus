import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from '../components/api/axiosInstance';
import useStore from '../store';

export default function useUser() {
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    axiosInstance('/tokens/refresh')
      .then(({ data }) => {
        setTimeout(() => {
          setUser({ status: 'logged', data: data.user });
        }, 1000);
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setUser({ status: 'guest', data: null });
        setAccessToken('');
      });
  }, []);

  const logoutHandler = () => {
    axiosInstance.get('/auth/logout').then(() => setUser({ status: 'guest', data: null }));
    setAccessToken('');
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!formData.email || !formData.password || !formData.name) {
      return alert('Missing required fields');
    }
    axiosInstance.post('/auth/signup', formData).then(({ data }) => {
      setUser({ status: 'logged', data: data.user });
    });
    // window.location.href = '/auth/signin';
  };

  const signInHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!formData.email || !formData.password) {
      return alert('Missing required fields');
    }
    axiosInstance.post('/auth/signin', formData).then(({ data }) => {
      setUser({ status: 'logged', data: data.user });
    });
  };

  return {
    signInHandler,
    signUpHandler,
    logoutHandler,
  };
}
