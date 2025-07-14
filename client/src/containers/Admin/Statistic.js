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
import icons from '../../utils/icon'

const {FaCalendarAlt, AiOutlineCloseCircle} = icons

const Statistic = () => {
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
    const [chartData, setChartData] = useState(null);
    const [hasStatistic, setHasStatistic] = useState(false);
    const [showDateAbove, setShowDateAbove] = useState(false);

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

    useClickMouseOutside([dateRef, chainRef, clusterRef, movieRef], () => {
        setOpenDropdown(null);
        setShowDatePicker(false); // Đóng lịch
    });

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

    const handleOpenDropdownForDate = () => {
        const isCurrentlyOpen = openDropdown === 'date' && showDatePicker;

        if (isCurrentlyOpen) {
            setOpenDropdown(null);
            setShowDatePicker(false);
        } else {
            // Tính toán khoảng trống để quyết định hiển thị lên hay xuống
            const rect = dateRef.current.getBoundingClientRect();
            const estimatedHeight = 380;
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const shouldShowAbove = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;

            setShowDateAbove(shouldShowAbove);
            setOpenDropdown('date');
            setShowDatePicker(true);
        }
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
        //setShowDatePicker(false);      // tắt lịch
        //setOpenDropdown(null);
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
                                            setOpenDropdown={setOpenDropdown}
                                            setShowDatePicker={setShowDatePicker}
                                            emptyMessage="Chưa có chuỗi rạp trong hệ thống"
                                            offsetY={'translate-y-5'}
                                            marginAboveLabel='mt-1'
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
                                            setOpenDropdown={setOpenDropdown}
                                            emptyMessage="Chưa có cụm rạp cho chuỗi này"
                                            setShowDatePicker={setShowDatePicker}
                                            disabled={!selectedChain.id}
                                            offsetY={'translate-y-5'}
                                            marginAboveLabel='mt-1'
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
                                        setOpenDropdown={setOpenDropdown}
                                        setShowDatePicker={setShowDatePicker}
                                        emptyMessage="Không có phim nào"
                                        offsetY={'translate-y-5'}
                                        marginAboveLabel='mt-1'
                                    />
                                </div>
                            )}
                            <div className="col-span-4 text-left relative" ref={dateRef}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Khoảng thời gian</label>
                                <div
                                    onClick={() => handleOpenDropdownForDate()}
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
                                    //Hiện icon "X" để reset ngày
                                    <div className='text-xl text-red-600' onClick={handleResetDate}>
                                        <AiOutlineCloseCircle/>
                                    </div>
                                ) : (
                                    // Icon lịch như bình thường
                                    <FaCalendarAlt />
                                )}

                                </div>

                                {showDatePicker && (
                                    <div className={`absolute z-50 bg-white rounded-md border border-gray-300 shadow-xl transition-all duration-200 ease-in-out ${showDateAbove ? 'bottom-full translate-y-5' : 'top-full mt-1'}`}>
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

export default Statistic