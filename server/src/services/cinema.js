import db from '../models'
import {nanoid} from 'nanoid'
import {compareVietnameseUsername} from '../utils/generateCode'
import { Op } from 'sequelize';


//api chains
export const createCinemaChainService = ({chain_name, logo}) => new Promise(async (resolve, reject) => {  
    try {
        const existingChains = await db.CinemaChain.findAll({ attributes: ['chain_name'] });
        const isDuplicate = existingChains.some(chain => 
            compareVietnameseUsername(chain.chain_name, chain_name)
        );

        if (isDuplicate) {
            return resolve({
                err: 1,
                msg: 'Chuỗi rạp đã tồn tại!',
            });
        }

        // Tạo mới chuỗi rạp
        const newChain = await db.CinemaChain.create({
            chain_id: nanoid(),
            chain_name,
            logo
        });

        resolve({
            err: newChain ? 0 : 1,
            msg: newChain ? 'Tạo chuỗi rạp thành công!' : 'Tạo chuỗi rạp thất bại!',
            response: newChain
        });
    } catch (error) {
        reject(error);
    }
});

export const getAllCinemaChainsService = () => new Promise(async (resolve, reject) => {
    try {
        const chains = await db.CinemaChain.findAndCountAll({
            attributes: ['chain_id', 'chain_name', 'logo'],
            raw: true,
            nest: true,
        });

        resolve({
            err: chains ? 0 : 1,
            msg: chains ? 'Lấy danh sách chuỗi rạp thành công!' : 'Lấy danh sách chuỗi rạp thất bại!',
            response: chains
        });
    } catch (error) {
        reject(error);
    }
});

export const getCinemaChainByIdService = (chain_id) => new Promise(async (resolve, reject) => {
    try {
        const chain = await db.CinemaChain.findOne({
            where: { chain_id },
            raw: true,
            nested: true,
            attributes: ['chain_id','chain_name', 'logo'],
        });

        resolve({
            err: chain ? 0 : 1,
            msg: chain ? `Lấy thông tin chuỗi rạp: ${chain_id} thành công!` : 'Lấy thông tin chuỗi rạp thất bại!',
            response: chain
        });
    } catch (error) {
        reject(error);
    }
});

export const updateCinemaChainService = (chain_id, { chain_name, logo }) => new Promise(async (resolve, reject) => {
    try {
        const currentChain = await db.CinemaChain.findOne({ where: { chain_id }, raw: true });
        if (!currentChain) {
            return resolve({
                err: 1,
                msg: 'Chuỗi rạp không tồn tại!',
            });
        }

        // Kiểm tra trùng tên nếu chain_name thay đổi
        if (chain_name && !compareVietnameseUsername(chain_name, currentChain.chain_name)) {
            const existingChains = await db.CinemaChain.findAll({
                attributes: ['chain_name'],
                where: {
                    chain_id: { [Op.ne]: chain_id }
                }
            });

            const isDuplicate = existingChains.some(existingChain =>
                compareVietnameseUsername(existingChain.chain_name, chain_name)
            );

            if (isDuplicate) {
                return resolve({
                    err: 1,
                    msg: 'Chuỗi rạp đã tồn tại!',
                    response: null
                });
            }
        }

        // Chuẩn bị dữ liệu cập nhật
        const updatedFields = {};
        if (chain_name && chain_name !== currentChain.chain_name) updatedFields.chain_name = chain_name;
        if (logo && logo !== currentChain.logo) updatedFields.logo = logo;

        if (Object.keys(updatedFields).length === 0) {
            return resolve({
                err: 0,
                msg: 'Không có thay đổi nào để cập nhật.',
            });
        }

        const response = await db.CinemaChain.update(
            updatedFields,
            { where: { chain_id } }
        );

        resolve({
            err: response ? 0 : 1,
            msg: response ? `Cập nhật chuỗi rạp (id: ${chain_id}) thành công!` : "Cập nhật chuỗi rạp thất bại",
        });
    } catch (error) {
        reject(error);
    }
});


export const deleteCinemaChainService = (chain_id) => new Promise(async (resolve, reject) => {
    try {
        const chain = await db.CinemaChain.findOne({ where: { chain_id }, raw: true });
        if (!chain) {
            return resolve({
                err: 1,
                msg: 'Chuỗi rạp không tồn tại!',
            });
        }
        const response = await db.CinemaChain.destroy({ where: { chain_id } });
        resolve({
            err: response ? 0 : 1,
            msg: response ? `Xóa chuỗi rạp (id: ${chain_id}) thành công!` : 'Xóa chuỗi rạp thất bại!',
        });
    } catch (error) {
        reject(error);
    }
});

//api cluster
export const createCinemaClusterService = ({cluster_name, address, city, chain_id}) => new Promise(async (resolve, reject) => {  
    try {
        // Kiểm tra xem chuỗi rạp có tồn tại không
        const chain = await db.CinemaChain.findOne({ where: { chain_id } });
        if (!chain) {
            return resolve({
                err: 1,
                msg: 'Chuỗi rạp không tồn tại!',
            });
        }

        // Kiểm tra trùng tên cluster trong cùng một chain
        const existingClusters = await db.CinemaCluster.findAll({
            where: { chain_id },
            attributes: ['cluster_name']
        });
        const isDuplicate = existingClusters.some(c =>
            compareVietnameseUsername(c.cluster_name, cluster_name)
        );
        if (isDuplicate) {
            return resolve({
                err: 1,
                msg: 'Cụm rạp đã tồn tại trong chuỗi này!',
            });
        }

        // Tạo cụm rạp mới
        const newCluster = await db.CinemaCluster.create({
            cluster_id: nanoid(),
            cluster_name,
            address,
            city,
            chain_id
        });
        
        resolve({
            err: newCluster ? 0 : 1,
            msg: newCluster ? 'Tạo cụm rạp thành công!' : 'Tạo cụm rạp thất bại',
            response: newCluster
        });
    } catch (error) {
        reject(error);
    }
});

export const getAllCinemaClustersService = (chain_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.CinemaCluster.findAndCountAll({
            raw: true,
            nest: true,
            attributes: ['cluster_id', 'cluster_name', 'address'],
            where: chain_id && { chain_id },
            include: [{
                model: db.CinemaChain,
                as: 'cinema_chain',
                attributes: ['chain_id','chain_name'],
            }],
        })

        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Lấy danh sách cụm rạp thành công!' : 'Lấy danh sách cụm rạp thất bại!',
            response: response 
        })
    } catch (error) {
        reject(error)
    }
})

export const getCinemaClusterByIdService = (cluster_id) => new Promise(async (resolve, reject) => {
    try {
        const cluster = await db.CinemaCluster.findOne({
            where: { cluster_id },
            raw: true,
            nested: true,
            attributes: ['cluster_id','cluster_name', 'address'],
            include: [{
                model: db.CinemaChain,
                as: 'cinema_chain',
                attributes: ['chain_id','chain_name'],
            }], 
        });

        resolve({
            err: cluster ? 0 : 1,
            msg: cluster ? `Lấy thông tin cụm rạp: ${cluster_id} thành công!` : 'Lấy thông tin cụm rạp thất bại!',
            response: cluster
        });
    } catch (error) {
        reject(error);
    }
});

export const updateCinemaClusterService = (cluster_id, { cluster_name, address, chain_id }) => new Promise(async (resolve, reject) => {
    try {
        const currentCluster = await db.CinemaCluster.findOne({ where: { cluster_id }, raw: true });
        if (!currentCluster) {
            return resolve({
                err: 1,
                msg: 'Cụm rạp không tồn tại!',
            });
        }

        // Kiểm tra chain_id nếu được truyền và khác giá trị cũ
        if (chain_id && chain_id !== currentCluster.chain_id) {
            const chain = await db.CinemaChain.findOne({ where: { chain_id }, raw: true });
            if (!chain) {
                return resolve({
                    err: 1,
                    msg: 'Chuỗi rạp không tồn tại!',
                });
            }
        }

        // Kiểm tra trùng tên nếu cluster_name thay đổi
        if (cluster_name && !compareVietnameseUsername(cluster_name, currentCluster.cluster_name)) {
            const existingClusters = await db.CinemaCluster.findAll({
                attributes: ['cluster_name'],
                where: {
                    cluster_id: { [Op.ne]: cluster_id }
                }
            });

            const isDuplicate = existingClusters.some(existingCluster =>
                compareVietnameseUsername(existingCluster.cluster_name, cluster_name)
            );

            if (isDuplicate) {
                return resolve({
                    err: 1,
                    msg: 'Tên cụm rạp đã tồn tại!',
                });
            }
        }

        // Chuẩn bị dữ liệu cập nhật
        const updatedFields = {};
        if (cluster_name && cluster_name !== currentCluster.cluster_name) updatedFields.cluster_name = cluster_name;
        if (address && address !== currentCluster.address) updatedFields.address = address;
        if (chain_id && chain_id !== currentCluster.chain_id) updatedFields.chain_id = chain_id;

        if (Object.keys(updatedFields).length === 0) {
            return resolve({
                err: 0,
                msg: 'Không có thay đổi nào để cập nhật.',
            });
        }

        const response = await db.CinemaCluster.update(
            updatedFields,
            { where: { cluster_id } }
        );

        resolve({
            err: response ? 0 : 1,
            msg: response ? `Cập nhật cụm rạp (id: ${cluster_id}) thành công!` : "Cập nhật cụm rạp thất bại",
        });
    } catch (error) {
        reject(error);
    }
});


export const deleteCinemaClusterService = (cluster_id) => new Promise(async (resolve, reject) => {
    try {
        const cluster = await db.CinemaCluster.findOne({ where: { cluster_id }, raw: true });
        if (!cluster) {
            return resolve({
                err: 1,
                msg: 'Cụm rạp không tồn tại!',
            });
        }
        const response = await db.CinemaCluster.destroy({ where: { cluster_id } });
        resolve({
            err: response ? 0 : 1,
            msg: response ? `Xóa cụm rạp (id: ${cluster_id}) thành công!` : 'Xóa cụm rạp thất bại!',
        });
    } catch (error) {
        reject(error);
    }
});

//api cinema
export const createCinemaService = ({cinema_name, cluster_id, rowCount, columnCount}) => new Promise(async (resolve, reject) => {  
    try {
        // Kiểm tra xem cụm rạp có tồn tại không
        const cluster = await db.CinemaCluster.findOne({ where: { cluster_id } });
        if (!cluster) {
            return resolve({
                err: 1,
                msg: 'Cụm rạp không tồn tại!',
            });
        }

        // Kiểm tra trùng tên rạp trong cùng một cụm
        const existingCinemas = await db.Cinema.findAll({
            where: { cluster_id },
            attributes: ['cinema_name']
        });
        const isDuplicate = existingCinemas.some(c =>
            compareVietnameseUsername(c.cinema_name, cinema_name)
        );
        if (isDuplicate) {
            return resolve({
                err: 1,
                msg: 'Rạp đã tồn tại trong cụm rạp này!',
            });
        }

        // Kiểm tra dữ liệu hợp lệ
        if (!rowCount || !columnCount || rowCount < 1 || columnCount < 1) {
            return resolve({
                err: 1,
                msg: 'rowCount và columnCount phải > 0',
            });
        }

        // Tạo rạp mới
        const newCinema = await db.Cinema.create({
            cinema_id: nanoid(),
            cinema_name,
            cluster_id,
            rowCount,
            columnCount,
        });
        
        resolve({
            err: newCinema ? 0 : 1,
            msg: newCinema ? 'Tạo rạp phim thành công!' : 'Tạo rạp phim thất bại',
            response: newCinema
        });
    } catch (error) {
        reject(error);
    }
});

export const getAllCinemasService = (cluster_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Cinema.findAndCountAll({
            raw: true,
            nest: true,
            attributes: ['cinema_id', 'cinema_name', 'rowCount', 'columnCount'],
            where: cluster_id && {cluster_id},
            include: [{
                model: db.CinemaCluster,
                as: 'cinema_cluster',
                attributes: ['cluster_id','cluster_name'],
                include:[{
                    model:db.CinemaChain,
                    as: 'cinema_chain',
                    attributes: ['chain_id','chain_name']
                }]
            }],
        })

        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Lấy danh sách rạp phim thành công!' : 'Lấy danh sách rạp phim thất bại!',
            response: response 
        })
    } catch (error) {
        reject(error)
    }
})

export const getCinemaByIdService = (cinema_id) => new Promise(async (resolve, reject) => {
    try {
        const cinema = await db.Cinema.findOne({
            where: { cinema_id },
            raw: true,
            nested: true,
            attributes: ['cinema_id','cinema_name', 'rowCount', 'columnCount'],
            include: [{
                model: db.CinemaCluster,
                as: 'cinema_cluster',
                attributes: ['cluster_id','cluster_name'],
                include:[{
                    model:db.CinemaChain,
                    as: 'cinema_chain',
                    attributes: ['chain_id','chain_name']
                }]
            }],
        });

        resolve({
            err: cinema ? 0 : 1,
            msg: cinema ? `Lấy thông tin rạp: ${cinema_id} thành công!` : 'Lấy thông tin rạp thất bại!',
            response: cinema
        });
    } catch (error) {
        reject(error);
    }
});

export const updateCinemaService = (cinema_id, { cinema_name, cluster_id, rowCount, columnCount }) => new Promise(async (resolve, reject) => {
    try {
        // Lấy dữ liệu rạp hiện tại
        const oldCinema = await db.Cinema.findOne({ where: { cinema_id }, raw: true });
        if (!oldCinema) {
            return resolve({
                err: 1,
                msg: 'Rạp không tồn tại!',
            });
        }

        const updatedFields = {};

        // Kiểm tra thay đổi tên rạp
        if (cinema_name && cinema_name.trim() !== '' && cinema_name.trim() !== oldCinema.cinema_name.trim()) {
            // Xác định cluster đang xét (dùng cluster_id mới nếu có, còn không thì dùng cũ)
            const clusterCheck = cluster_id || oldCinema.cluster_id;

            // Lấy danh sách rạp trong cùng cụm
            const existingCinemas = await db.Cinema.findAll({
                attributes: ['cinema_name'],
                where: {
                    cinema_id: {
                        [Op.ne]: cinema_id
                    },
                    cluster_id: clusterCheck
                }
            });

            const isDuplicate = existingCinemas.some(existingCinema =>
                compareVietnameseUsername(existingCinema.cinema_name, cinema_name)
            );

            if (isDuplicate) {
                return resolve({
                    err: 1,
                    msg: 'Tên rạp đã tồn tại trong cụm rạp!',
                });
            }

            updatedFields.cinema_name = cinema_name;
        }

        // Kiểm tra thay đổi cụm rạp
        if (cluster_id && cluster_id !== oldCinema.cluster_id) {
            const cluster = await db.CinemaCluster.findOne({ where: { cluster_id }, raw: true });
            if (!cluster) {
                return resolve({
                    err: 1,
                    msg: 'Cụm rạp không tồn tại!',
                });
            }

            updatedFields.cluster_id = cluster_id;
        }

       if (rowCount && rowCount !== oldCinema.rowCount) {
            if (rowCount > 0) {
                updatedFields.rowCount = rowCount;
            } else {
                return resolve({
                    err: 1,
                    msg: 'Số hàng phải là số nguyên dương và >0.',
                });
            }
        }
            
        if (columnCount && columnCount !== oldCinema.columnCount) {
            if (columnCount > 0) {
                updatedFields.columnCount = columnCount;
            } else {
                return resolve({
                    err: 1,
                    msg: 'Số cột phải là số nguyên dương và >0.',
                });
            }
        }

        // Nếu không có trường nào thay đổi
        if (Object.keys(updatedFields).length === 0) {
            return resolve({
                err: 0,
                msg: 'Không có thay đổi nào được thực hiện.',
            });
        }

        // Cập nhật
        await db.Cinema.update(updatedFields, { where: { cinema_id } });

        resolve({
            err: 0,
            msg: `Cập nhật rạp (id: ${cinema_id}) thành công!`,
        });

    } catch (error) {
        reject(error);
    }
});


export const deleteCinemaService = (cinema_id) => new Promise(async (resolve, reject) => {
    try {
        const cinema = await db.Cinema.findOne({ where: { cinema_id }, raw: true });
        if (!cinema) {
            return resolve({
                err: 1,
                msg: 'Rạp không tồn tại!',
            });
        }
        const response = await db.Cinema.destroy({ where: { cinema_id } });
        resolve({
            err: response ? 0 : 1,
            msg: response ? `Xóa rạp (id: ${cinema_id}) thành công!` : 'Xóa rạp thất bại!',
        });
    } catch (error) {
        reject(error);
    }
});