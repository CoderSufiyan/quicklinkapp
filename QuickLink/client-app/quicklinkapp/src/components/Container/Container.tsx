import * as React from 'react';
import FormContainer from '../FormContainer/FormContainer';
import { UrlData } from '../../interface/UrlData';
import axios from 'axios';
import { serverUrl } from '../../helpers/Constants';
import DataTable from '../DataTable/DataTable';

interface IContainerProps {
}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);
  const updateReload = () => {
    setReload(true)
  }
  const fetchTableData = async () => {
    const response = await axios.get(`${serverUrl}/shortUrl`)
    setData(response.data)
    setReload(false)
  }
  React.useEffect(() => {
    fetchTableData()
  }, [reload])
  return (
    <>
      <FormContainer updateReload={updateReload} />
      <DataTable updateReload={updateReload} data={data} />
    </>
  )
};

export default Container;
