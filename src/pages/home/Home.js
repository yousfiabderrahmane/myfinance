import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Home() {
  const { user } = useAuthContext();
  return (
    <div className={styles.container}>
      <div className={styles.content}>transaction list</div>
      <div className={styles.sidebar}>
        {/* .uid proprety containing a specific id for each user */}
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
