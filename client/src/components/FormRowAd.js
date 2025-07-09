const FormRowAd = ({ label, children }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start my-4 w-[88%] mx-auto">
            <label className="sm:w-1/4 text-gray-600 pt-2">
                {label}
            </label>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default FormRowAd;