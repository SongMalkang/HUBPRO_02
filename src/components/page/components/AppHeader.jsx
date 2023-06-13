import React, { useState, useEffect } from 'react';
import axios from "axios";
import logo from '/src/assets/icons/logo.png'
import styled from 'styled-components'

import { AdjustmentsHorizontalIcon, ChartBarIcon, CogIcon, HomeIcon, TableCellsIcon } from '@heroicons/react/24/outline'

const AppHeader = ({ pageFlag, setPageFlag }) => {
  const [ip, setIP] = useState('Requesting IP...');
  const [version, setVersion] = useState('v0.0.1');
  const [title, setTitle] = useState('HUBPRO ( Gas Monitoring System )') // HUBPRO ( Gas Monitoring System )

  useEffect(() => {
    getIpData(setIP) // IP 주소 가져오기
    getTitleName(setTitle, setVersion)
  }, []);

  return (
    <HeaderContainer className="flex flex-row space-x-10 items-center w-screen h-24 bg-zinc-800 text-center text-yellow-400 text-5xl font-bold">
      <div className="w-1/12 ml-4 min-h-10">
        <img className="absolute left-5 top-3 w-40" src={logo} onClick={() => setPageFlag(1)}/>
      </div>
      <div className="w-1/12 min-h-10">
        <div className="text-sm font-normal text-zinc-500">{ip}<br></br>( { version } )</div>
      </div>
      <div className="w-7/12 min-h-10">{title}</div>
      <div className="flex flex-row justify-end w-3/12 min-h-10 text-sm font-normal text-white">

        <HomeIcon className={`flex flex-col w-12 h-12 mx-4 ${pageFlag === 1 && 'text-yellow-400'}`} onClick={()=>setPageFlag(1)} />
        <AdjustmentsHorizontalIcon className={`flex flex-col w-12 h-12 mx-4 ${pageFlag === 2 && 'text-yellow-400'}`} onClick={()=>setPageFlag(2)}/>
        <TableCellsIcon className={`flex flex-col w-12 h-12 mx-4 ${pageFlag === 3 && 'text-yellow-400'}`} onClick={()=>setPageFlag(3)}/>
        <ChartBarIcon className={`flex flex-col w-12 h-12 mx-4 ${pageFlag === 4 && 'text-yellow-400'}`} onClick={()=>setPageFlag(4)}/>
        <CogIcon className={`flex flex-col w-12 h-12 mx-4 ${pageFlag === 5 && 'text-yellow-400'}`} onClick={()=>setPageFlag(5)}/>
        
      </div>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  justify-content: space-evenly
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getIpData(setIP) { // Ip 주소 Axios
  const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getTitleName(setTitle, setVersion) { // Ip 주소 Axios
  // const res = await axios.get('/get/title')
  /* setTitle('done') */
  setVersion("v0.0.2")
}

export default AppHeader;
