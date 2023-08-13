import { useEffect, useState } from "react";
import {useLocalStorage} from "../../utils/useLocalStorage";
import { ApiController } from "../../utils/api";

export const useUser = () => {
  const [ user, setUser ] = useState(null);
  const { setItem } = useLocalStorage();

  const addUser = (userToLogin) => {
    setItem("user", JSON.stringify(userToLogin));
    setUser(userToLogin);
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser };
};


export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const storedUser = getItem("user");
    if (storedUser) {
      let parsedUser = JSON.parse(storedUser)
      addUser(parsedUser);
    }
  }, []);

  const login = (userToLogin) => {
    addUser(userToLogin);
  };

  const logout = () => {
    removeUser();
    ApiController.logout()
  };

  return { user, login, logout,  };
};
