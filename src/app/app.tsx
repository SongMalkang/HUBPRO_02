import { Page } from "components/page/Page";
import styles from "./app.module.css";
import React, { ReactElement } from "react";

import "../theme/theme.css"

const App : React.FC = (): ReactElement => {
  return (
    <main className={styles.main}>
      <Page />
    </main>
  )
};

export default App;
