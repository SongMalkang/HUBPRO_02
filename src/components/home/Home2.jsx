import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './style/home.module.css'

const Home = () => {
  const [tableLog, setTableLog] = useState([])
  const [criterionValue, setCriterionValue] = useState([])

  const [columnSet, setColumnSet] = useState([
    { index : 1, name : 'module_name', kname: '장치명', enable : true },
    { index : 2, name : 'status', kname: '상태', enable : true },
    { index : 3, name : 'A1', kname: 'O2', enable : true },
    { index : 4, name : 'A2', kname: 'CO2', enable : true },
    { index : 5, name : 'A3', kname: 'H2S', enable : true },
    { index : 6, name : 'A4', kname: 'CO', enable : true },
    { index : 7, name : 'A5', kname: 'CH4', enable : true },
    { index : 8, name : 'battery', kname: '배터리', enable : true },
    { index : 9, name : 'rssi', kname: '감도', enable : true },
    { index : 10, name : 'rgst_dt', kname: '수신시각', enable : true },
  ])

  useEffect(() => { // 5초마다 데이터를 가져옴
    const fetchData = async () => {
      const data = await getTableData();
      setTableLog(data);
    };

    const fetchData2 = async () => {
      const data = await getCriterionData();
      setCriterionValue(data);
      
      const updatedColumnSet = columnSet.map((column) => {
        const matchingCriterion = data.find((criterion) => criterion.criterion_idx === column.index - 2);
        if (matchingCriterion) {
          return {
            ...column,
            kname: matchingCriterion.criterion_name,
          };
        }
        return column;
      });

      setColumnSet(updatedColumnSet);
    };

    fetchData();
    fetchData2();
    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <div className={styles.HomeContainer}>
      <div className={styles.TypeContainer}>
        <table className={styles.TableHeader}>
          <thead>
            <tr>
              {columnSet
                .filter((x) => x.enable === true)
                .map((x) => <td key={x.index} className={`py-3 px-10 text-2xl h-24 w-screen font-bold border-2 border-zinc-900`}
                >{x.kname}</td>)
              }
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      <div className={styles.TableContainer}>
        <table className={styles.TableBody}>
          <tbody>
            {tableLog.map((x) => 
              <tr key={x.module_idx} className='px-10'>
                <td>{x.module_name}</td>
                <td>{x.status}</td>
                <td>{x.A1}</td>
                <td>{x.A2}</td>
                <td>{x.A3}</td>
                <td>{x.A4}</td>
                <td>{x.A5}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


// 임시 Data 보관소
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

const getCriterionData = async () => {
  const res = await axios.get('/api/criterion/get/value').then(response => {
    if (response.data && response.data.length > 0){
      return (Object.values(response.data))
    }
  })

  return res; 
}

export default Home;