import {Button} from './index';
import icons from '../utils/icon';
import { isImageUrl } from '../utils/helpers';

const {CiCirclePlus} = icons;
const ManagementTable = ({columns, data, onAdd, onView, onEdit, onDelete }) => {
    return (
        <div className='mb-3'>
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
            <div className="overflow-x-auto">
                <table className="w-full text-center">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            {columns.map((col, idx) => (
                                <th key={idx} className="px-4 py-2 border">{col}</th>
                            ))}
                            <th className="px-4 py-2 border">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-300">
                            {row.map((value, i) => (
                                <td key={i} className="px-4 py-2 border">
                                    { isImageUrl(value)
                                        ? (
                                            <div className="flex items-center justify-center h-full"><img src={value} alt="logo" className="h-20 w-auto object-contain border border-gray-600 rounded-full text-center" /></div>
                                        )
                                        : value
                                    }
                                </td>
                            ))}
                                <td className="px-3 py-2 border">
                                    <div className="flex items-center justify-center gap-1">
                                        <Button
                                            text="👁"
                                            textSize="text-sm"
                                            textColor="text-white"
                                            bgColor="bg-blue-500"
                                            hover="hover:bg-blue-600"
                                            onClick={() => onView(row)}
                                        />
                                        <Button
                                            text="✏"
                                            textSize="text-sm"
                                            textColor="text-white"
                                            bgColor="bg-green-500"
                                            hover="hover:bg-green-600"
                                            onClick={() => onEdit(row)}
                                            
                                        />
                                        <Button
                                            text="🗑"
                                            textSize="text-sm"
                                            textColor="text-white"
                                            bgColor="bg-red-500"
                                            hover="hover:bg-red-600"
                                            onClick={() => onDelete(row)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagementTable;
