const ContainerBox = ({children}) => {
    return (
        <div className="w-full bg-primary shadow-md rounded-md p-4 border border-gray-300">
            {children}
        </div>
    );
};

export default ContainerBox;