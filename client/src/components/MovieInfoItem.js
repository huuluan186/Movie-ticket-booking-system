const MovieInfoItem = ({ label, value }) => {
    return (
        <p className='text-lg text-gray-700'>
            <span className='font-bold pr-1'>{label}: </span>
            {value || 'Không có thông tin'}
        </p>
    );
};

export default MovieInfoItem;