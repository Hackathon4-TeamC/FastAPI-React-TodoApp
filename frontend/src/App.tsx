import React from "react";
import { TodoPage } from "./components/pages/TodoPage/TodoPage";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <TodoPage />
    </div>
  );
}

export default App;
