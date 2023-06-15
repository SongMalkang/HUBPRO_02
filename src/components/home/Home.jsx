import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import criterion from './functions/criterion'
import { MoonIcon } from '@heroicons/react/24/outline'

const Home = () => {
  const [tableLog, setTableLog] = useState([])

  useEffect(() => { // 5초마다 데이터를 가져옴
    const fetchData = async () => {
      const data = await getTableData();
      setTableLog(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    criterion()
  }, [])

  const fields = ["module_name", "status", "A1", "A2", "A3", "A4", "A5", "battery"];

  const TableRow = () => (
    <tr>
      {fields.map((field) => (
        <td className="text-center align-middle border border-zinc-700 outline-zinc-700" key={field}>
          {tableLog.map((x) => (
            <div className="h-32 pt-4 text-4xl font-bold" key={x.module_idx}>
              <div className="align-middle">{field === "status" ? x.status : (field === "A1" || field === "A5") ? x[field].toFixed(1) : (field === "A2" || field === "A3" || field === "A4") ? x[field].toFixed(0) : x[field]}</div>
              <div className="align-bottom text-2xl">{(field === "A2" || field === "A3" || field === "A4") ? ' ppm' :  (field === "A1" || field === "A5" || field === "battery") ? ' %' : ''}</div>
            </div>
          ))}
        </td>
      ))}
    </tr>
  )

  const AlarmCell = ({ warningText, dangerText }) => (
    <th className="w-1/12 text-center align-middle border border-zinc-700 outline-zinc-700">
      <span className="text-yellow-500">{warningText}</span>
      <br />
      <span className="text-red-600">{dangerText}</span>
    </th>
  );
  

  return (
    <ContentsBox className="flex flex-row mt-8 h-[52rem] overflow-x-hidden w-screen text-3xl text-white">
      <table className="table-auto w-screen bg-zinc-800 outline-zinc-300 outline-2">
        {/* 칼럼의 개수, 데이터 종류 등 설정 가능하도록 */}
        <thead className=''>
          <tr className='h-20'>
            <th className="w-1/12 border border-zinc-700 outline-zinc-700">장치명</th>
            <th className="w-1/12 border border-zinc-700 outline-zinc-700">상태</th>
            <th className="w-1/12 text-4xl border border-zinc-700 outline-zinc-700">O<sub>2</sub></th>
            <th className="w-1/12 text-4xl border border-zinc-700 outline-zinc-700">CO<sub>2</sub></th>
            <th className="w-1/12 text-4xl border border-zinc-700 outline-zinc-700">CO</th>
            <th className="w-1/12 text-4xl border border-zinc-700 outline-zinc-700">H<sub>2</sub>S</th>
            <th className="w-1/12 text-4xl border border-zinc-700 outline-zinc-700">LEL(CH<sub>4</sub>)</th>
            <th className="w-1/12 border border-zinc-700 outline-zinc-700">Battery</th>
          </tr>
          <tr className="text-lg text-center align-middle border border-zinc-700 outline-zinc-700">
            <th className="w-1/12 text-lg col-span-2 py-5">
              <span className='text-yellow-500'>경고 알람</span>
              <span> / </span>
              <span className='text-red-600'> 위험 알람</span>
            </th>
            <th className="w-1/24 text-center align-middle border border-zinc-700 outline-zinc-700"></th>
            <AlarmCell warningText="19.5% 미만 / 23.5% 이상" dangerText="18% 미만 / 24% 이상" />
            <AlarmCell warningText="5000 ppm 이상" dangerText="8000 ppm 이상" />
            <AlarmCell warningText="30 ppm 이상" dangerText="50 ppm 이상" />
            <AlarmCell warningText="5 ppm 이상" dangerText="10 ppm 이상" />
            <AlarmCell warningText="10% 이상" dangerText="20% 이상" />
            <th className="w-1/12">-</th>
          </tr>
        </thead>
        <tbody className="text-2xl text-center">
          <TableRow />
        </tbody>
      </table>
    </ContentsBox>
  )
}

const getTableData = async () => {

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

  return res; 
}

const ContentsBox = styled.div`
  position : relative;
`

export default Home;