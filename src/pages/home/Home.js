import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import TransactionList from "./TransactionList";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error, isPending } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"] //those 3 arguments goes into the query (we'll spread), //desc = descending
  );
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isPending && (
          <h3 style={{ marginTop: "20px" }} className={styles.isPending}>
            Loading ...
          </h3>
        )}
        {error && <p className="error">{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        {/* .uid proprety containing a specific id for each user */}
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
