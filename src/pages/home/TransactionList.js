import styles from "./Home.module.css";
import { useFirestore } from "../../hooks/useFirestore";
import Trash from "../../assets/trash.svg";

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore("transactions");

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li
          style={{ borderLeft: transaction.amount < 0 && "4px solid red" }}
          key={transaction.id}
        >
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <button
            className={styles}
            onClick={() => deleteDocument(transaction.id)}
          >
            <img className={styles.trash} src={Trash} alt="delete" />
          </button>
        </li>
      ))}
    </ul>
  );
}
