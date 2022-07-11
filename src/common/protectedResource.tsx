import React from 'react'
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../app/hooks';
import { isLoggedIn } from '../features/authentication/authenticationSlice';

export default function ProtectedResource({ children }: { children: JSX.Element }) {

  if (!useAppSelector(isLoggedIn)) {
    return <Navigate to="/login" />;
  }

  return children;
}