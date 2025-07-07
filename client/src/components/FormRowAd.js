const FormRowAd = ({ label, children }) => {
    return (
        <div className="grid grid-cols-12 items-center mb-4 w-[88%] mx-auto">
            <label className="col-span-3 text-base text-gray-600">{label}</label>
            <div className="col-span-9 relative">{children}</div>
        </div>
    );
};

export default FormRowAd;
