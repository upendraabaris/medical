const BlockModel = require("../models/blockModel")
const Client = require("../middleware/redis")
const getBlock = async(req,res,next)=>{
    try{
        let client = await Client.get('Block:getBlock');
        let Block;
        if(client == null) {
            Block = await BlockModel.find();
            await Client.set('Block:getBlock', JSON.stringify(Block));
        }
        else {
            Block = JSON.parse(client);
        }
        // const Block = await BlockModel.find()
        res.data = Block
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const getBlockByCityId = async (req, res, next) => {
    try {
        const { city_id } = req.params; // Assuming city_id is passed as a URL parameter

        let client = await Client.get(`Block:getBlock:${city_id}`);
        let Blocks;

        if (client == null) {
            Blocks = await BlockModel.find({ city_id: city_id }).populate('postal_code_id');
            await Client.set(`Block:getBlock:${city_id}`, JSON.stringify(Blocks));
        } else {
            Blocks = JSON.parse(client);
        }

        res.data = Blocks;
        res.status_Code = 200;
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = 403;
        res.message = error.message;
        res.data = {};
        next();
    }
}

const getBlockByPostalCodeId = async (req, res, next) => {
    try {
        const { postal_code_id } = req.params; // Assuming postal_code_id is passed as a URL parameter

        let client = await Client.get(`Block:getBlock:${postal_code_id}`);
        let blocks;

        if (client == null) {
            blocks = await BlockModel.find({ postal_code_id: postal_code_id }).populate('postal_code_id');
            await Client.set(`Block:getBlock:${postal_code_id}`, JSON.stringify(blocks));
        } else {
            blocks = JSON.parse(client);
        }

        res.data = blocks;
        res.status_Code = 200;
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = 403;
        res.message = error.message;
        res.data = {};
        next();
    }
}




const getBlockById = async(req,res,next)=>{
    try{
        const Block = await BlockModel.findById(req.params.id);
        res.data = Block
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const addBlock = async(req,res,next)=>{
    try{
        // console.log(req.body);
        // const Block = await BlockModel.create(req.body);
        const Block = await BlockModel.create(req.body);
        let allKeys = await Client.keys("Block:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = Block
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const updateBlock = async(req,res,next)=>{
    try{
        const Block = await BlockModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        let allKeys = await Client.keys("Block:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = Block
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const deleteBlock = async(req,res,next)=>{
    try{
        const Block = await BlockModel.findByIdAndDelete(req.params.id);
        let allKeys = await Client.keys("Block:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = Block
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const deleteAllBlock = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deletedBlock = await BlockModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deletedBlock;
        res.status_Code = 200;
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = 403;
        res.message = error.message;
        res.data = {};
        next();
    }
}

module.exports = {getBlock, getBlockById, addBlock, updateBlock, deleteBlock, deleteAllBlock, getBlockByCityId, getBlockByPostalCodeId}
