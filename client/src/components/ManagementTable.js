import { Button } from './index';
import icons from '../utils/icon';
import { isImageUrl } from '../utils/helpers';

const { CiCirclePlus } = icons;

const ManagementTable = ({
    columns,
    data,
    onAdd,
    onView,
    onEdit,
    onDelete,
    imageOptions = {}, //tùy chỉnh ảnh
    actionOptions = {}, //tùy chọn thao tác. merger sau
}) => {
    const defaultImageOptions = { rounded: true, height: 80}; //px
    const mergedImageOptions = { ...defaultImageOptions, ...imageOptions };
    const defaultActionOptions = { vertical: false, showView: true, showEdit: true, showDelete: true };
    const mergedActionOptions = { ...defaultActionOptions, ...actionOptions };
    return (
        <div className='mb-3'>
            {onAdd && (
                <div className="flex justify-end items-center mb-4">
                    <Button
                        text="THÊM"
                        textColor="text-white"
                        bgColor="bg-blue-500"
                        hover="hover:bg-blue-600"
                        IcBefore={CiCirclePlus}
                        onClick={onAdd}
                    />
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className='text-center'>
                        <tr className="bg-blue-500 text-white">
                            {columns.map((col, idx) => (
                                <th key={idx} className="px-4 py-2 border">{col}</th>
                            ))}
                            {(mergedActionOptions.showView || mergedActionOptions.showEdit || mergedActionOptions.showDelete) && (
                                <th className="px-4 py-2 border">Thao tác</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className='text-left'>
                        {data?.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-300">
                                {row.map((value, i) => (
                                    <td key={i} className="px-4 py-2 border">
                                        {isImageUrl(value)
                                            ? (
                                                <div className="flex items-center justify-center h-full">
                                                    <img
                                                        src={value}
                                                        alt="logo"
                                                         className={`object-cover max-w-[100px] h-[${mergedImageOptions.height}px] ${mergedImageOptions.rounded ? 'rounded-full' : 'rounded-md'}`}
                                                   />
                                                </div>
                                            )
                                            : value
                                        }
                                    </td>
                                ))}
                                {(mergedActionOptions.showView || mergedActionOptions.showEdit || mergedActionOptions.showDelete) && (
                                    <td className="px-3 py-2 border">
                                        <div className={`flex items-center justify-center gap-1 ${mergedActionOptions.vertical ? 'flex-col' : 'flex-row'}`}>
                                            {mergedActionOptions.showView && (
                                                <Button
                                                    text="👁"
                                                    textSize="text-sm"
                                                    textColor="text-white"
                                                    bgColor="bg-blue-500"
                                                    hover="hover:bg-blue-600"
                                                    onClick={() => onView?.(row)}
                                                />
                                            )}
                                            {mergedActionOptions.showEdit && (
                                                <Button
                                                    text="✏"
                                                    textSize="text-sm"
                                                    textColor="text-white"
                                                    bgColor="bg-green-500"
                                                    hover="hover:bg-green-600"
                                                    onClick={() => onEdit?.(row)}
                                                />
                                            )}
                                            {mergedActionOptions.showDelete && (
                                                <Button
                                                    text="🗑"
                                                    textSize="text-sm"
                                                    textColor="text-white"
                                                    bgColor="bg-red-500"
                                                    hover="hover:bg-red-600"
                                                    onClick={() => onDelete?.(row)}
                                                />
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagementTable;
