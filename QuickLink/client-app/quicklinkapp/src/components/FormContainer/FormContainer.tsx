import * as React from 'react';
import axios from 'axios';
import { serverUrl } from '../../helpers/Constants';

interface IFormContainerProps {
    updateReload: () => void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
    const { updateReload } = props;
    const [fullUrl, setFullUrl] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Show loader text
        try {
            await axios.post(`${serverUrl}/shorturl`, {
                fullUrl: fullUrl
            });
            setFullUrl("");
            updateReload();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Hide loader text
        }
    };

    return (
        <div className='container mx-auto p-2'>
            <div className={`bg-banner my-8 rounded-xl bg-cover bg-center shadow-xl ${loading ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
                <div className='w-full h-full rounded-xl p-20 backdrop-brightness-50 flex flex-col items-center'>
                    <h2 className='text-white font-bold text-5xl text-center pt-2 pb-4 animate-fade-in'>
                        QuickLink App
                    </h2>
                    <p className='text-white text-2xl text-center pb-2 font-extralight animate-slide-in'>
                        Paste your longer and untidy link to shorten it!
                    </p>
                    <p className='text-white text-l text-center pb-2 font-thin animate-slide-in'>
                        It's a free URL shortener app for you!
                    </p>
                    <form onSubmit={handleSubmit} className="w-full max-w-lg">
                        <div className='relative w-full'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-600">
                                urlshortner.link /
                            </div>
                            <input
                                type='text'
                                placeholder='Add your link'
                                required
                                className='block w-full ps-32 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 shadow-lg transition-all duration-300 ease-in-out'
                                value={fullUrl}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullUrl(e.target.value)}
                                disabled={loading} // Disable input during loading
                            />
                            <button
                                type='submit'
                                className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg border border-transparent hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg transition-all duration-300 ease-in-out'
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Shorten URL'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormContainer;
