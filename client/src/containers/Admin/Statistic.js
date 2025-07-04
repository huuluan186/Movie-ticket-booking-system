import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { useEffect, useState, useRef} from 'react';
import { apiGetMovieList } from '../../services/movie'; 
import { useClickMouseOutside } from '../../hooks';
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { toast } from "react-toastify";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Sử dụng BarChart
import { TitleHeader, ContainerBox, Button, SelectBox, Tab, CountBoxList} from '../../components';
import { apiGetRevenueByMovie, apiGetRevenueByCluster } from '../../services/statistic'; // Import API

const Statistics = () => {
    const { cinemaChains, cinemaClusters } = useSelector(state => state.cinema);
    const { moviesData } = useSelector(state => state.movie);
    const dispatch = useDispatch();

    const [comingCount, setComingCount] = useState(0);
    const [showingCount, setShowingCount] = useState(0);
    const [activeTab, setActiveTab] = useState(0); // 0: theo cụm rạp, 1: theo phim

    const [selectedChain, setSelectedChain] = useState({ id: '', name: '' });
    const [selectedCluster, setSelectedCluster] = useState({ id: '', name: '' });
    const [selectedMovie, setSelectedMovie] = useState({ id: '', title: '' });
    const [openDropdown, setOpenDropdown] = useState(null);
    const [showAbove, setShowAbove] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [hasStatistic, setHasStatistic] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const chainRef = useRef();
    const clusterRef = useRef();
    const movieRef = useRef();
    const dateRef = useRef();

    useClickMouseOutside( [chainRef, clusterRef, movieRef, dateRef],
        () => {
            setOpenDropdown(null);
            setShowDatePicker(false); //đóng lịch luôn
        }
    );

    useEffect(() => {
        dispatch(actions.getAllCinemaChains());
        dispatch(actions.getMovieList());
    }, [dispatch]);

    // Reset state khi đổi tab
    useEffect(() => {
        setSelectedChain({ id: '', name: '' });
        setSelectedCluster({ id: '', name: '' });
        setSelectedMovie({ id: '', title: '' });
        setDateRange([{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }]);
        setShowDatePicker(false);
        setHasStatistic(false);
    }, [activeTab]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Phim sắp chiếu
                const res1 = await apiGetMovieList({ status: 'Coming Soon' });
                if (res1?.data?.response?.count !== undefined) setComingCount(res1.data.response.count);
                // Phim đang chiếu
                const res2 = await apiGetMovieList({ status: 'Now Showing' });
                if (res2?.data?.response?.count !== undefined) setShowingCount(res2.data.response.count);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, [dispatch]);

    const handleSelectChain = (chain) => {
        setSelectedChain({ id: chain.chain_id, name: chain.chain_name });
        dispatch(actions.getCinemaClustersByChainId(chain.chain_id));
        setSelectedCluster({ id: '', name: '' }); // Reset cụm rạp khi chọn chuỗi mới
        setOpenDropdown(null);
    };

    const handleSelectCluster = (cluster) => {
        setSelectedCluster({ id: cluster.cluster_id, name: cluster.cluster_name });
        setOpenDropdown(null);
    };

     const handleSelectMovie = (movie) => {
        setSelectedMovie({ id: movie.movie_id, title: movie.title });
        setOpenDropdown(null);
    };

    const handleOpenDropdownWithAutoPosition = (dropdownKey, ref) => {
        const rect = ref.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const estimatedDropdownHeight = 300; // Có thể tuỳ chỉnh theo độ dài menu
        const shouldShowAbove = spaceBelow < estimatedDropdownHeight;

        setShowAbove(shouldShowAbove);
        if (dropdownKey === 'date') {
            const isCurrentlyOpen = openDropdown === 'date' && showDatePicker;
            if (isCurrentlyOpen) {
                // 🔁 Nếu lịch đang mở → đóng lại, KHÔNG reset ngày
                setOpenDropdown(null);
                setShowDatePicker(false);
            } else {
                // ✅ Nếu đang đóng → kiểm tra xem có cần reset ngày
                if (!isDefaultDate) {
                    const today = new Date();
                    setDateRange([{
                        startDate: today,
                        endDate: today,
                        key: 'selection',
                    }]);
                }
                setOpenDropdown('date');
                setShowDatePicker(true);
            }
            return;
        }
        // Ngược lại thì mở dropdown như bình thường
        setShowDatePicker(false);
        setOpenDropdown(prev => (prev === dropdownKey ? null : dropdownKey));
    };

    
    const handleStatisticBtnClick = async () => {
        try {
            const filters = {};
            if (isCustomDateRange) {
                filters.start_date = format(dateRange[0].startDate, 'yyyy-MM-dd');
                filters.end_date = format(dateRange[0].endDate, 'yyyy-MM-dd');
            }
            if (activeTab === 0) {
                if (!selectedCluster.id) {
                    toast.warn("Vui lòng chọn cụm rạp trước khi thống kê!");
                    return;
                }
                const res = await apiGetRevenueByCluster({
                    ...filters,
                    cluster_id: selectedCluster.id,
                });
                if (res?.data?.err === 0 && res.data.response) {
                    const r = res.data.response[0];
                    setChartData([
                        {
                            name: r.cluster_name_snapshot,
                            revenue: +r.total_revenue,
                            tickets: +r.total_tickets,
                        },
                    ]);
                } else setChartData([]); // reset nếu không có dữ liệu
            } else if (activeTab === 1) {
                if (!selectedMovie.id) {
                    toast.warn("Vui lòng chọn phim trước khi thống kê!");       
                    return;
                }
                const res = await apiGetRevenueByMovie({
                    ...filters,
                    movie_id: selectedMovie.id,
                });

                if (res?.data?.err === 0 && res.data.response) {
                    const r = res.data.response[0];
                    setChartData([
                        {
                            name: selectedMovie.title,
                            revenue: +r.total_revenue,
                            tickets: +r.total_tickets,
                        },
                    ]);
                } else setChartData([]);
            }
        setHasStatistic(true);
        } catch (error) {
            console.error('Lỗi khi thống kê:', error);
            setChartData([]);
            setHasStatistic(true);
        }
    }

    const handleResetDate = (e) => {
        e.stopPropagation(); // Không lan ra ngoài để trigger đóng dropdown
        const today = new Date();
        setDateRange([{
            startDate: today,
            endDate: today,
            key: 'selection',
        }]);
    };

    const today = new Date();
    const isDefaultDate = 
        dateRange[0].startDate.toDateString() === today.toDateString() && 
        dateRange[0].endDate.toDateString() === today.toDateString();
    const isCustomDateRange = !isDefaultDate;

    return (
        <div className="space-y-4">
            {/* TIÊU ĐỀ THỐNG KÊ */}
            <ContainerBox>
                <TitleHeader title="Thống kê"/>
            </ContainerBox>
            <ContainerBox>
                <div className="flex justify-center gap-12">
                    <CountBoxList
                         items={[
                            { title: 'PHIM SẮP CHIẾU', amount: comingCount, bgColor: 'bg-blue-500' },
                            { title: 'PHIM ĐANG CHIẾU', amount: showingCount, bgColor: 'bg-green-500' },
                        ]}
                    />
                </div>
            </ContainerBox>
            <ContainerBox>
                <TitleHeader title={'doanh thu'} variant='underline'/>
                <div className="text-center mt-2 pb-10">
                    {/* Tabs */}
                    <div className="flex justify-center space-x-4">
                        <Tab
                            tabs={['Theo cụm rạp', 'Theo phim']}
                            isActiveTab={activeTab}
                            onChange={setActiveTab}
                        />
                    </div>

                    {/* Select Boxes và Input */}
                    <div className="max-w-4xl mx-auto mt-4">
                        <div className="grid grid-cols-12 gap-4">
                            {activeTab === 0 && (
                                <>
                                    <div className="col-span-3 text-left relative" ref={chainRef}>
                                        <SelectBox
                                            label="Chuỗi rạp"
                                            value={selectedChain.name}
                                            placeholder="Chọn chuỗi rạp"
                                            items={cinemaChains.map((chain) => ({
                                                label: chain.chain_name,
                                                onClick: () => handleSelectChain(chain),
                                            }))}
                                            dropdownKey="chain"
                                            openDropdown={openDropdown}
                                            showAbove={showAbove}
                                            setOpenDropdown={setOpenDropdown}
                                            onClick={() => {
                                                setShowDatePicker(false);
                                                handleOpenDropdownWithAutoPosition('chain', chainRef);
                                            }}
                                            emptyMessage="Chưa có chuỗi rạp trong hệ thống"
                                        />
                                    </div>
                                    <div className="col-span-3 text-left relative" ref={clusterRef}>
                                        <SelectBox
                                            label="Cụm rạp"
                                            value={selectedCluster.name}
                                            placeholder="Chọn cụm rạp"
                                            items={cinemaClusters.map((cluster) => ({
                                                label: cluster.cluster_name,
                                                onClick: () => handleSelectCluster(cluster),
                                            }))}
                                            dropdownKey="cluster"
                                            openDropdown={openDropdown}
                                            showAbove={showAbove}
                                            setOpenDropdown={setOpenDropdown}
                                            onClick={() => {
                                                setShowDatePicker(false);
                                                handleOpenDropdownWithAutoPosition('cluster', clusterRef);
                                            }}
                                            emptyMessage="Chưa có cụm rạp cho chuỗi này"
                                            disabled={!selectedChain.id}
                                        />
                                    </div>
                                </>
                            )}
                            {activeTab === 1 && (
                                <div className="col-span-6 text-left relative" ref={movieRef}>  
                                    <SelectBox
                                        label="Phim"
                                        value={selectedMovie.title}
                                        placeholder="Chọn phim"
                                        items={moviesData.map((movie) => ({
                                            label: movie.title,
                                            onClick: () => handleSelectMovie(movie),
                                        }))}
                                        dropdownKey="movie"
                                        openDropdown={openDropdown}
                                        showAbove={showAbove}
                                        setOpenDropdown={setOpenDropdown}
                                        onClick={() => {
                                            setShowDatePicker(false);
                                            handleOpenDropdownWithAutoPosition('movie', movieRef);
                                        }}
                                        emptyMessage="Không có phim nào"
                                    />
                                </div>
                            )}
                            <div className="col-span-4 text-left relative" ref={dateRef}>
                                <label className="block text-sm font-medium text-gray-700">Khoảng thời gian</label>
                                <div
                                    onClick={() => handleOpenDropdownWithAutoPosition('date', dateRef)}
                                    className="flex justify-between items-center border border-gray-300 px-4 py-2 rounded-md cursor-pointer bg-white shadow-sm mt-1"
                                >
                                    <div className={`flex justify-between items-center gap-1 w-full ${isDefaultDate ? 'text-gray-400' : 'text-gray-800'}`}>
                                        <span className="basis-2/5 text-left truncate">
                                            {isDefaultDate ? 'Start date' : format(dateRange[0].startDate, 'dd/MM/yyyy')}
                                        </span>
                                        <span className="flex-shrink-0 mx-1">→</span>
                                        <span className="basis-2/5 text-left truncate">
                                            {isDefaultDate ? 'End date' : format(dateRange[0].endDate, 'dd/MM/yyyy')}
                                        </span>
                                    </div>
                                    {showDatePicker ? (
                                    // Hiện icon "X" để reset ngày
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={handleResetDate}
                                        className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    // Icon lịch như bình thường
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-gray-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 7V3m8 4V3m-9 8h10M5.25 21h13.5A2.25 2.25 0 0021 18.75V6.75A2.25 
                                                2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75v12A2.25 
                                                2.25 0 005.25 21z"
                                        />
                                    </svg>
                                )}

                                </div>

                                {showDatePicker && (
                                    <div className={`absolute z-50 bg-white rounded-md border border-gray-300 shadow-xl transition-all duration-200 ease-in-out ${showAbove ? 'bottom-full translate-y-5' : 'top-full mt-2'}`}>
                                        <DateRange
                                            editableDateInputs={true}
                                            onChange={item => setDateRange([item.selection])}
                                            moveRangeOnFirstSelection={false}
                                            ranges={dateRange}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="col-span-2 text-left">
                                <label className="block text-sm font-medium text-gray-700 invisible mb-1">Thống kê</label>
                                <Button
                                    text='Thống kê'
                                    textColor='text-white'
                                    bgColor='bg-green-600'
                                    hover='hover:bg-green-700'
                                    fullWidth={true}
                                    onClick={handleStatisticBtnClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>  
                { hasStatistic && (
                <div className="flex justify-center gap-12">
                    <CountBoxList
                        items={[
                            { title: 'Tổng số vé đã đặt', amount: chartData?.[0]?.tickets ?? 0, bgColor: 'bg-blue-500' },
                            { title: 'Tổng doanh thu', amount: chartData?.[0]?.revenue?.toLocaleString?.() ?? '0', bgColor: 'bg-green-500' },
                        ]}
                        width="w-80"
                    />
                </div>
                )}
                {hasStatistic && chartData?.length > 0 && (
                <div className="flex justify-center items-center mt-8">
                    <BarChart
                        width={850}
                        height={450}
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap="20%"
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis 
                            yAxisId="left" 
                            tickCount={7}
                        />
                        <YAxis 
                            yAxisId="right" 
                            orientation="right" 
                            domain={[0,(chartData?.[0]?.tickets)+5]} 
                        />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="revenue" fill="#795" name="Doanh thu" />
                        <Bar yAxisId="right" dataKey="tickets" fill="#8884d8" name="Vé đã bán" />
                    </BarChart>
                </div>
                )}
            </ContainerBox>
        </div>
    )
}

export default Statistics
