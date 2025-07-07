const ContainerBox = ({children}) => {
    return (
        <div className="w-full bg-primary shadow-md rounded-md px-4 py-3 border border-gray-300">
            {children}
        </div>
    );
};

export default ContainerBox;