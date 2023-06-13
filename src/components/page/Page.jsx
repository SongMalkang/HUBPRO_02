import React, { useState, useEffect } from 'react'

import AppHeader from './components/AppHeader'
import AppContents from './components/AppContents'
import styles from './style/page.module.css'

export const Page = () => {
  const [pageFlag, setPageFlag] = useState(1);

  return (
    <div className={styles.container}>
      <AppHeader pageFlag={pageFlag} setPageFlag={setPageFlag} />
      <AppContents pageFlag={pageFlag} />
      {/* <AppFooter /> */}

    </div>
  )
}