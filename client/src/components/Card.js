import { Link, useLocation } from 'react-router-dom';
import { toCapitalize } from '../utils/helpers';

const Card = ({ title, image, releaseDate, navigateTo }) => {
    const { pathname } = useLocation();
    return (
       <Link to={navigateTo ? navigateTo : pathname} className="flex justify-center items-center">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" 
                title={title}
            >
                <img src={image} alt={title} className="w-full h-80 object-cover" />
                <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">{toCapitalize(title)}</h3>
                    <p className="mt-2"><span className='font-semibold'>Khởi chiếu:</span> {releaseDate}</p>
                </div>
            </div>
       </Link>
    )
}

export default Card