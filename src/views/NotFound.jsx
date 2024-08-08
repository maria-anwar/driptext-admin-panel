import { Link } from 'react-router-dom';

const NotFound = () => {

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex justify-center gap-1">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
            <div className="w-7.5 h-7.5 bg-black rounded-full animate-bounce"></div>
          </div>
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
            <div className="w-7.5 h-7.5 bg-black rounded-full animate-bounce"></div>
          </div>
        </div>
        <div>
          <h1 className="capitalize text-yellow-400 text-4xl md:text-5xl font-medium">Looks like you're lost</h1>
          <p className="mt-2 text-lg md:text-xl font-light">404 error</p>
        </div>
        <Link 
          to="/" 
          className="capitalize text-lg md:text-xl font-light px-6 py-3 border border-yellow-400 rounded-lg shadow-md transition ease-in-out duration-300 hover:bg-yellow-400 hover:text-white"
        >
          back to home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
