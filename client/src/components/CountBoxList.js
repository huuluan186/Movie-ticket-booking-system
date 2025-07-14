const CountBoxList = ({ items = [] , width}) => {
    return (
        <>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`${item.bgColor || 'bg-blue-500'} text-white px-10 py-4 rounded shadow-lg text-center ${width ? `${width}` : 'w-72'}`}
                >
                    <div className="text-lg font-semibold">{item.title || 'title'}</div>
                    <div className="text-3xl font-bold">{item.amount || 0}</div>
                </div>
            ))}
        </>
    );
};

export default CountBoxList;
