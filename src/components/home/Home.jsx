import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Home = () => {
  const [tableLog, setTableLog] = useState([])

  useEffect(() => {
    getTableData(setTableLog);
  }, [])

  useEffect(() => {
    console.log(tableLog)
  }, [tableLog])
  

  return (
    <ContentsBox className="flex flex-row mt-6 h-[44rem] bg-zinc-800 w-screen overflow-hidden text-3xl text-white">
      <table className="table-auto mt-6 w-screen outline-zinc-300 outline-2">
        {/* 칼럼의 개수, 데이터 종류 등 설정 가능하도록 */}
        <thead className='p-10'>
          <tr className='outline-2'>
            <th className="w-3/24">장치명</th>
            <th className="w-1/12">상태</th>
            <th className="w-1/12">O2</th>
            <th className="w-1/12">CO2</th>
            <th className="w-1/12">CO</th>
            <th className="w-1/12">H2S</th>
            <th className="w-1/12">LEL(CH4)</th>
            <th className="w-1/12">Battery</th>
          </tr>
          <br />
          <tr className="text-sm text-center align-middle border border-zinc-700 outline-zinc-700">
            <th className="w-1/6 text-lg col-span-2">
              <span className='text-yellow-500'>경고 알람</span>
              <span> / </span>
              <span className='text-red-600'> 위험 알람</span>
            </th>
            <th className="w-1/12 text-center align-middle border border-zinc-700 outline-zinc-700">-</th>
            <th className="w-1/12 text-center align-middle border border-zinc-700 outline-zinc-700">
              <span className="text-yellow-500">19.5% 미만 / 23.5% 이상</span>
              <br />
              <span className="text-red-600">18% 미만 / 24% 이상</span>
            </th>
            <th className="w-1/12 text-center align-middle border border-zinc-700 outline-zinc-700">
              <span className="text-yellow-500">5000 ppm 이상</span>
                <br />
              <span className="text-red-600">8000 ppm 이상</span>
            </th>
            <th className="w-1/12 text-center align-middle border border-zinc-700 outline-zinc-700">
              <span className="text-yellow-500">30 ppm 이상</span>
                <br />
              <span className="text-red-600">50 ppm 이상</span>
            </th>
            <th className="w-1/12 text-center align-middle border border-zinc-700 outline-zinc-700">
              <span className="text-yellow-500">5 ppm 이상</span>
                <br />
              <span className="text-red-600">10 ppm 이상</span>
            </th>
            <th className="w-1/12 text-center align-middle border border-zinc-700 outline-zinc-700">
              <span className="text-yellow-500">10% 이상</span>
                <br />
              <span className="text-red-600">20% 이상</span>
            </th>
            <th className="w-1/12">
              -
            </th>
          </tr>
        </thead>
        <tbody className="text-2xl text-center">
          <tr>
            <td className="w-1/12 py-10 text-center align-middle border border-zinc-700 outline-zinc-700">
              {tableLog.map((x) => (
                <div className="text-center align-middle border border-zinc-700 outline-zinc-700" key={x.module_idx}>{x.module_name}</div>
              ))}
            </td>
            <td className="text-center align-middle border border-zinc-700 outline-zinc-700">
              {tableLog.map((x) => (
                <div className="text-center align-middle border border-zinc-700 outline-zinc-700" key={x.module_idx}>정상</div>
              ))}
            </td>
            <td className="text-center align-middle border border-zinc-700 outline-zinc-700">
              {tableLog.map((x) => (
                <div className="text-center align-middle border border-zinc-700 outline-zinc-700" key={x.module_idx}>{x.A1}</div>
              ))}
            </td>
            <td className="text-center align-middle border border-zinc-700 outline-zinc-700">
              {tableLog.map((x) => (
                <div className="text-center align-middle border border-zinc-700 outline-zinc-700" key={x.module_idx}>{x.A2}</div>
              ))}
            </td>
            <td className="text-center align-middle border border-zinc-700 outline-zinc-700">
              {tableLog.map((x) => (
                <div className="text-center align-middle border border-zinc-700 outline-zinc-700" key={x.module_idx}>{x.A3}</div>
              ))}
            </td>
            <td className="text-center align-middle border border-zinc-700 outline-zinc-700">
              {tableLog.map((x) => (
                <div className="text-center align-middle border border-zinc-700 outline-zinc-700" key={x.module_idx}>{x.A4}</div>
              ))}
            </td>
            <td className="text-center align-middle border border-zinc-700 outline-zinc-700">
              {tableLog.map((x) => (
                <div className="text-center align-middle border border-zinc-700 outline-zinc-700" key={x.module_idx}>{x.A5}</div>
              ))}
            </td>
            <td className="text-center align-middle border border-zinc-700 outline-zinc-700">
              {tableLog.map((x) => (
                <div className="text-center align-middle border border-zinc-700 outline-zinc-700" key={x.module_idx}>{x.battery}</div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </ContentsBox>
  )
}

const getTableData = async (setTableLog) => {

  const res = await axios.get('/api/gas/get/recent').then(response => {
    if (response.data && response.data.length > 0){
      const latestLogsByModule = {};

      response.data.forEach(log => {
        if (!latestLogsByModule[log.module_idx] || new Date(log.rgst_dt) > new Date(latestLogsByModule[log.module_idx].rgst_dt)) {
          latestLogsByModule[log.module_idx] = log;
        }
      })

      return (Object.values(latestLogsByModule))
    }
  })

  setTableLog(res)  
}

const ContentsBox = styled.div`
  position : relative;
`

export default Home;