import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const query = useRef(_query).current; //we doing this so javascript don't see it as different and run us into an infinite loop =>  cause array reference type (different on avery function call)

  useEffect(() => {
    setIsPending(true);
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    //real time listener to firebase collection
    //subscribtion returns to us an unsub function
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id }); //data() the function we use to get data from a document - id is going to be the id of the document not uid
        });

        //update state
        console.log(results);
        setDocuments(results);
        setIsPending(false);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data.");
        setIsPending(false);
      }
    );

    //unsubscribe on unmount
    return () => {
      unsubscribe();
    };
  }, [collection, query]);

  return { documents, error, isPending };
};
