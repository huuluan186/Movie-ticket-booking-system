import * as service from '../services/cinema.js';

//chain controller
export const createCinemaChainController = async (req, res) => {
    try {
        const { chain_name, logo } = req.body;
        if(!chain_name){
            return res.status(400).json({
                err: 1,
                msg: 'Missing required fields: chain_name'
            });
        }

        const response = await service.createCinemaChainService({ chain_name, logo });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at create a cinema chain controller: '+ error
        })
    }
}

export const getAllCinemaChainsController = async (req, res) => {
    try {
        const response = await service.getAllCinemaChainsService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at get all cinema chains controller: '+ error
        })
    }
}

export const getCinemaChainByIdController = async (req, res) => {
    try {
        const { chain_id } = req.params;
        const response = await service.getCinemaChainByIdService(chain_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at get cinema chain by id controller: '+ error
        })
    }
}

export const updateCinemaChainController = async (req, res) => {
    try {
        const { chain_id } = req.params;
        const { chain_name, logo } = req.body;
        const response = await service.updateCinemaChainService(chain_id, { chain_name, logo });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at update cinema chain controller: '+ error
        })
    }
}

export const deleteCinemaChainController = async (req, res) => {
    try {
        const { chain_id } = req.params;
        const response = await service.deleteCinemaChainService(chain_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at delete cinema chain controller: '+ error
        })
    }
}

//cluster controller
export const createCinemaClusterController = async (req, res)=>{
    try {
        const { cluster_name, address, city, chain_id } = req.body;
        if(!cluster_name || !chain_id){
            return res.status(400).json({
                err: 1,
                msg: 'Missing required fields: cluster_name or chain_id'
            });
        }

        const response = await service.createCinemaClusterService({  cluster_name, address, city, chain_id });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at create a cinema cluster controller: '+ error
        })
    }
}

export const getAllCinemaClustersController = async (req, res) => {
    try {
        const {chain_id}=req.query
        const response = await service.getAllCinemaClustersService(chain_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at get all cinema clusters controller: '+ error
        })
    }
}

export const getCinemaClusterByIdController = async (req, res) => {
    try {
        const {cluster_id} = req.params;
        const response = await service.getCinemaClusterByIdService(cluster_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at get a cinema clusters controller: '+ error
        })
    }
}

export const updateCinemaClusterController = async (req, res) => {
    try {
        const {cluster_id} = req.params;
        const {cluster_name, address, chain_id} = req.body;
        const response = await service.updateCinemaClusterService(cluster_id,{cluster_name, address, chain_id});
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at update a cinema clusters controller: '+ error
        })
    }
}

export const deleteCinemaClusterController = async (req, res) => {
    try {
        const { cluster_id } = req.params;
        const response = await service.deleteCinemaClusterService(cluster_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at delete cinema clusters controller: '+ error
        })
    }
} 

//cinema controller
export const createCinemaController = async (req, res)=>{
    try {
        const { cinema_name, cluster_id, rowCount, columnCount} = req.body;
        if(!cinema_name || !cluster_id || !rowCount || !columnCount){
            return res.status(400).json({
                err: 1,
                msg: 'Missing one of required fields (cinema_name, cluster_id, rowCount, columnCount)'
            });
        }

        const response = await service.createCinemaService({  cinema_name, cluster_id, rowCount, columnCount });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at create a cinema controller: '+ error
        })
    }
}

export const getAllCinemasController = async (req, res) => {
    try {
        const {cluster_id} = req.query
        const response = await service.getAllCinemasService(cluster_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at get all cinemas controller: '+ error
        })
    }
}

export const getCinemaByIdController = async (req, res) => {
    try {
        const {cinema_id} = req.params;
        const response = await service.getCinemaByIdService(cinema_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at get a cinema by ID controller: '+ error
        })
    }
}

export const updateCinemaController = async (req, res) => {
    try {
        const {cinema_id} = req.params;
        const {cinema_name, cluster_id, rowCount, columnCount} = req.body;
        const response = await service.updateCinemaService(cinema_id,{cinema_name, cluster_id, rowCount, columnCount});
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at update a cinema by ID controller: '+ error
        })
    }
}

export const deleteCinemaController = async (req, res) => {
    try {
        const {cinema_id} = req.params;
        const response = await service.deleteCinemaService(cinema_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at delete a cinema by ID controller: '+ error
        })
    }
}