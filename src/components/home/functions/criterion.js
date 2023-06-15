import axios from 'axios';

const criterion = async () => {

  const res = await axios.get('/api/criterion/get/value').then(response => {
    if (response.data && response.data.length > 0){
      return response.data
    }else {
      return 'No Data'
    }
  })

  console.log(res)

  return res;
}

export default criterion;