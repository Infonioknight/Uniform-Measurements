import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
	return (
		<section className="min-h-screen flex-grow">
			<div className="container m-auto max-w-2xl ">
				<div className="flex justify-center mt-44">
					<FaExclamationTriangle className="text-yellow-400 text-51xl fa-5x" />
				</div>
				<div className="text-center">
					<h1 className="text-11xl font-bold mt-4 mb-2">Page Not Found</h1>
					<h1 className=" text- mb-10">The page you are looking for does not exist.</h1>
					<Link
						to="/"
						className="bg-crimson hover:bg-black no-underline text-white font-bold py-4 px-6 rounded"
					>
						Go Home
					</Link>
				</div>
			</div>
			<div className="flex-grow" />
		</section>
	);
};
export default NotFound;
