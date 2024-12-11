import * as React from 'react';
import { UseAuth } from '../../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Private = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  if (!user) {
    // Trigger SweetAlert if the user is not logged in
    Swal.fire({
      title: 'Please log in',
      text: 'You need to log in to access this page.',
      icon: 'warning',
      confirmButtonText: 'Go to Login',
    }).then(() => {
      // Redirect to login page after the alert
      return <Navigate to="/" state={{ from: location }} replace />;
    });
    
  }

  
};
