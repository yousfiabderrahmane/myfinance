import styles from "./Home.module.css";

export default function TransactionList({ transactions }) {
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li
          style={{ borderLeft: transaction.amount < 0 && "4px solid red" }}
          key={transaction.id}
        >
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
        </li>
      ))}
    </ul>
  );
}
