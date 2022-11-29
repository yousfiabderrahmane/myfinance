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
    case "IS_PENDING":
      return { isPending: true, document: null, error: null, succes: false };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        succes: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        succes: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false); //cleanup

  //collection ref
  const ref = projectFirestore.collection(collection);

  //only dispatch if not cancelled(it saves us from doing the ckeck again and again)
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PRENDING" });
    try {
      const addedDocument = await ref.add(doc);

      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  //delete document
  const deleteDocument = async (id) => {};

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDocument, deleteDocument, response };
};
