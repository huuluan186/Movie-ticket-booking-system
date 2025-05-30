const Banner = ({backgroundImg, title, description}) => {
    return (
        <div className="container-fluid">
            <div 
                className='w-full h-[130px] bg-cover bg-center flex items-center justify-center relative'
                style={{ backgroundImage: `url(${backgroundImg})` }}
            >
                <div className='absolute inset-0 bg-black opacity-20'></div> {/* Lớp overlay mờ */}
                <div className='container mx-auto py-4 relative'>
                    <div className='text-center'>
                        <h1 class="mb-3 text-white text-3xl font-bold">
                            {title}
                        </h1>
                        <div className='text-white mt-0 text-lg'>  
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;