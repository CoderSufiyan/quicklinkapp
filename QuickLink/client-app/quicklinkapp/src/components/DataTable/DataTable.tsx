import * as React from 'react';
import { UrlData } from '../../interface/UrlData';
import { Link } from 'react-router-dom';
import { serverUrl } from '../../helpers/Constants';
import axios from 'axios';

interface IDataTableProps {
    data: UrlData[];
    updateReload: () => void;
    loading: boolean; // Pass loading prop from parent
}

const DataTable: React.FunctionComponent<IDataTableProps> = (props) => {
    const { data, updateReload, loading } = props;

    const copyToClickboard = async (url: string) => {
        try {
            await navigator.clipboard.writeText(`${serverUrl}/shortUrl/${url}`);
            alert(`URL copied: ${serverUrl}/shortUrl/${url}`);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUrl = async (id: string) => {
        try {
            await axios.delete(`${serverUrl}/shortUrl/${id}`);
            updateReload();
        } catch (error) {
            console.log(error);
        }
    };

    const handleShortUrlClick = (url: string) => {
        window.open(`${serverUrl}/shortUrl/${url}`, '_blank');
        updateReload(); // Call updateReload after the click
    };

    const renderTableData = () => {
        return data.map((item) => (
            <tr 
                key={item._id} 
                className='border-b text-white bg-gray-600 transition duration-300 ease-in-out hover:bg-blue-500'
            >
                <td className='px-6 py-3 break-words'>
                    <Link to={item.fullUrl} target='_blank' rel='noreferer noopener'>
                        {item.fullUrl}
                    </Link>
                </td>
                <td className='px-6 py-3 break-words'>
                    <span
                        className='cursor-pointer text-blue-200 underline'
                        onClick={() => handleShortUrlClick(item.shortUrl)}
                    >
                        {item.shortUrl}
                    </span>
                </td>
                <td className='px-6 py-3'>{item.clicks}</td>
                <td className='px-6 py-3'>
                    <div className='flex content-center'>
                        <div className='cursor-pointer px-2' onClick={() => copyToClickboard(item.shortUrl)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                            </svg>
                        </div>
                        <div className='cursor-pointer px-2' onClick={() => deleteUrl(item._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </div>
                    </div>
                </td>
            </tr>
        ));
    };
    
    
    
    
    

    return (
        <div className='container mx-auto pb-10 pt-2'>
            <div className={`relative overflow-x-auto shadow-sm sm:rounded-lg transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
                <table className='w-full table-fixed text-sm text-left rtl:text-right text-gray-500'>
                    <thead className='text-md uppercase text-gray-50 bg-gray-700'>
                        <tr>
                            <th scope='col' className='px-6 py-3 w-6/12'>Full Url</th>
                            <th scope='col' className='px-6 py-3 w-3/12'>Short Url</th>
                            <th scope='col' className='px-6 py-3'>Clicks</th>
                            <th scope='col' className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>{renderTableData()}</tbody>
                </table>
                {/* Show loader while loading */}
                {loading && (
                    <div className='flex justify-center items-center mt-4'>
                        <p className='text-lg font-medium'>Loading...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataTable;
