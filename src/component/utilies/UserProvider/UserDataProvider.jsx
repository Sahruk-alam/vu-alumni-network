import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export const UserDataContext = createContext(null);

const UserDataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setUserData(null);
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${user.uid}`
        );

        const data = await response.json();

        if(data.success){
            setUserData(data.userData);
        }

        const userInfo = data?.users || data;

        const fullUserData = {
          ...user,
          ...userInfo,
        };

        setUserData(fullUserData);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.uid]);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        loading,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
export default UserDataProvider;