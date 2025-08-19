import { signInAnonymouslyAsync } from '@/store/firestore';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

const IndexPage = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authUser = async () => {
      const user = await signInAnonymouslyAsync();
      if (user) {
        setIsAuth(true);
      }
    };
    authUser();
  }, []);

  if (!isAuth) {
    return null;
  }

  return <Redirect href="/check" />;
};

export default IndexPage;