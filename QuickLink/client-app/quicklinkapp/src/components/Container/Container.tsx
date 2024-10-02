import * as React from 'react';
import FormContainer from '../FormContainer/FormContainer';
import { UrlData } from '../../interface/UrlData';
import axios from 'axios';
import { serverUrl } from '../../helpers/Constants';
import DataTable from '../DataTable/DataTable';

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const updateReload = () => {
    setReload(true);
  };

  const fetchTableData = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await axios.get(`${serverUrl}/shortUrl`);
      setData(response.data);
      setReload(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  React.useEffect(() => {
    fetchTableData();
  }, [reload]);

  return (
    <>
      {/* Reduce opacity when loading */}
      <div className={`transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
        <FormContainer updateReload={updateReload} />
        <DataTable loading={loading} updateReload={updateReload} data={data} />
      </div>
      {/* Display a loader during data fetching */}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <p className="text-lg font-medium">Loading...</p>
        </div>
      )}
    </>
  );
};

export default Container;
