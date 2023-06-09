import React, { useState } from 'react'

import AppHeader from './components/AppHeader'
import styles from './style/page.module.css'

export const Page: React.FC = () => {
  const [title, setTitle] = useState<string>('HUBPRO ( Gas Monitoring System )');

  return (
    <div className={styles.container}>
      <AppHeader title={title}  />
      {/* <AppContents />
      <AppFooter /> */}

    </div>
  )
}