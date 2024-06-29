'use client'

import React, { ReactNode, useEffect, useState } from 'react';
import getProviders from "@/app/actions/getProviders";

// Define a type for the account objects
type Account = {
  label: string;
  email: string;
  icon: JSX.Element;
};

// Define a type for the component's props
interface AccountFetcherProps {
  children: (accounts: Account[]) => ReactNode;
}

const AccountFetcher: React.FC<AccountFetcherProps> = ({ children }) => {
  // Explicitly define the type of the accounts state
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await getProviders();
      if (response.type === 'GET_PROVIDERS_SUCCESS' && Array.isArray(response.payload)) {
        const formattedAccounts = response.payload.map(provider => ({
          label: provider.title,
          email: provider.title, // Assuming you meant to use a different property for email
          icon:               <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>iCloud</title>
          <path
            d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
            fill="currentColor"
          />
        </svg>, 
        }));
        setAccounts(formattedAccounts);
      } else {
        console.error('Failed to fetch accounts:', response);
      }
    };

    fetchAccounts();
  }, []);

  return children(accounts);
};

export default AccountFetcher;