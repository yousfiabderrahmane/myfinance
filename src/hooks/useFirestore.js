import { useReducer, useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

let initialState = {
  //when we do a request firestore sends us back an object that contains the document we've just created, so we'll update the state to match the document we've just got back
  document: null,
  isPending: false,
  error: null,
  succes: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false); //cleanup

  //collection ref
  const ref = projectFirestore.collection(collection);

  //add document
  const addDocument = (doc) => {};

  //delete document
  const deleteDocument = (id) => {};

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDocument, deleteDocument, response };
};
