const TitleHeader = ({ title, variant = 'default', textColor = 'text-orange-700', underlineColor = 'bg-orange-400', underlineBg='bg-black', underlineWidth='w-full'}) => {
    if (variant === 'underline') {
        return (
            <div className="text-center">
                <h1 className={`text-3xl uppercase font-bold mb-6 inline-block mx-auto ${textColor}`}>
                    {title}
                    <div className={`relative ${underlineWidth} h-0.5 mt-3 ${underlineBg}`}>
                        <div className={`absolute inset-0 w-20 h-1.5 m-auto z-10 ${underlineColor}`}></div>
                    </div>
                </h1>
            </div>
        );
    }

    return (
        <h1 className="text-3xl font-semibold text-center text-gray-800 uppercase">
            {title}
        </h1>
    );
};

export default TitleHeader;
