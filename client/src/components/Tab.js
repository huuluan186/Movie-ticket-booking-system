const Tabs = ({ tabs = [], isActiveTab, onChange }) => {
    const isActive = 'border-b-2 border-orange-500 text-orange-500';
    const isNotActive = 'border-transparent';
    if (!tabs.length) return null;

    return (
        <>
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`px-4 py-2 border-b-2 ${isActiveTab === index ? isActive : isNotActive}`}
                    onClick={() => onChange(index)}
                >
                    {tab}
                </button>
            ))}
        </>
    );
};

export default Tabs;
