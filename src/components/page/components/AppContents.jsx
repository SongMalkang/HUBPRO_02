import Config from "components/config/Config"
import DataTable from "components/dataTable/DataTable"
import GraphPage from "components/graphPage/GraphPage"
import Home from "components/home/Home2"

const AppContents = ({ pageFlag }) => {

  return (
    <div>
      {pageFlag == 1 && <Home />}
      {pageFlag == 3 && <DataTable />}
      {pageFlag == 4 && <GraphPage />}
      {pageFlag == 5 && <Config />}
    </div>
  )
}

export default AppContents