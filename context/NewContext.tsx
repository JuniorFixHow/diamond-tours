import React, { createContext, useState, FC, ReactNode } from "react";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

interface NewContextValue {
  isNew: boolean;
  setIsNew: (isNew: boolean) => void;
}

export const NewContext = createContext<NewContextValue>({
  isNew: true,
  setIsNew: () => {},
});

const NewContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isNew, setIsNew] = useState<boolean>(false);
  const router = useRouter();

  const checkUserStatus = async () => {
    try {
      const userStatus = await SecureStore.getItemAsync('userStatus');
      if (userStatus === 'old') {
        setIsNew(false);
      } 
      else {
        // Navigate to the first screen if the user is new
        // router.replace('(public)');
        setIsNew(true);
      }
    } catch (error) {
      console.error('Error checking user status:', error);
    }
  };

  const setUserStatus = async (isNew: boolean) => {
    try {
      await SecureStore.setItemAsync('userStatus', isNew ? 'new' : 'old');
      setIsNew(isNew);
    } catch (error) {
      console.error('Error setting user status:', error);
    }
  };

  // Check user status when the component mounts
  React.useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <NewContext.Provider value={{ isNew, setIsNew: setUserStatus }}>
      {children}
    </NewContext.Provider>
  );
};

export default NewContextProvider;