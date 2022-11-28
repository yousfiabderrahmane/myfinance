import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null); //just in case there wa an error before
    setIsPending(true);

    //sign the user out
    try {
      await projectAuth.signOut();

      //dispatch logout function (we skipped the payload cause we just want it to be null)
      dispatch({ type: "LOGOUT" });

      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsPending(false);
    }
  };

  return { isPending, error, logout };
};
