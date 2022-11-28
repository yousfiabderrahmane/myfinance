import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();
  const signup = async (email, password, displayName) => {
    setError(null); //in case there was an error in the previous call
    setIsPending(true);

    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      //user is a proprety on the res object

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // add display name to user by updating profile
      // {displayName: displayName} they match so we can shorten it
      await res.user.updateProfile({ displayName });

      //dispatch login action

      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
