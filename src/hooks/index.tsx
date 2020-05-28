import React from 'react';
import { QueryParamProvider } from 'use-query-params';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <QueryParamProvider>
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  </QueryParamProvider>
);

export default AppProvider;
