const PostalCodeModel = require("../models/postalCodeModel")
const Client = require("../middleware/redis")
const getPostalCode = async (req, res, next) => {
    try {
        let client = await Client.get('PostalCode:getPostalCode');
        let PostalCode;
        if (client == null) {
            PostalCode = await PostalCodeModel.find();
            await Client.set('PostalCode:getPostalCode', JSON.stringify(PostalCode));
        }
        else {
            PostalCode = JSON.parse(client);
        }
        // const PostalCode = await PostalCodeModel.find()
        res.data = PostalCode
        res.status_Code = "200"
        next()
    } catch (error) {
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const getPostalCodeByCityId = async (req, res, next) => {
    try {
        const { city_id } = req.params; // Assuming city_id is passed as a URL parameter

        let client = await Client.get(`PostalCode:getPostalCode:${city_id}`);
        let postalCodes;

        if (client == null) {
            postalCodes = await PostalCodeModel.find({ city_id: city_id });
            await Client.set(`PostalCode:getPostalCode:${city_id}`, JSON.stringify(postalCodes));
        } else {
            postalCodes = JSON.parse(client);
        }

        res.data = postalCodes;
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

const getPostalCodeByCityText = async (req, res, next) => {
    try {
        const { text } = req.params
        postalCodes = await PostalCodeModel.find({ 
            $and: [
                {
                    postalCode: {
                        $regex: text,
                        $options: "i",
                    }
                },
            ]
         }).limit(10).populate(['country_id', 'city_id', 'state_id']);

         res.data = postalCodes;
        res.status_Code = "200";
        next();
    }
    catch {
        res.error = true;
        res.status_Code = "403";
        res.message = error.message;
        res.data = {};
        next();
    }
}


const getCityByStateSearch = async (req, res, next) => {
    try {
        const { text } = req.params;
        //  cities = await CityModel.find({ text }).populate('state_id').sort({ city_name: 1 }).exec();

        cities = await CityModel.find({
            $and: [
                {
                    city_name: {
                        $regex: text,
                        $options: "i",
                    }
                },
            ],
        }).limit(10).populate({
            path: 'state_id',
            populate: {
                path: 'country_id'
            }
        }).sort({ city_name: 1 }).exec();



        // for (const city of cities) {
        //     if (city.state_id) {
        //       city.country_name = city.state_id.country_id.country_name; // Assuming "country_name" in Country model
        //     }
        //   }


        res.data = cities;
        res.status_Code = "200";
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = "403";
        res.message = error.message;
        res.data = {};
        next();
    }
}

const getPostalCodeById = async (req, res, next) => {
    try {
        const PostalCode = await PostalCodeModel.findById(req.params.id);
        res.data = PostalCode
        res.status_Code = "200"
        next()
    } catch (error) {
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const addPostalCode = async (req, res, next) => {
    try {
        // console.log(req.body);
        // const PostalCode = await PostalCodeModel.create(req.body);
        const PostalCode = await PostalCodeModel.create(req.body);
        let allKeys = await Client.keys("PostalCode:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = PostalCode
        res.status_Code = "200"
        next()
    } catch (error) {
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const updatePostalCode = async (req, res, next) => {
    try {
        const PostalCode = await PostalCodeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        let allKeys = await Client.keys("PostalCode:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = PostalCode
        res.status_Code = "200"
        next()
    } catch (error) {
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const deletePostalCode = async (req, res, next) => {
    try {
        const PostalCode = await PostalCodeModel.findByIdAndDelete(req.params.id);
        let allKeys = await Client.keys("PostalCode:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = PostalCode
        res.status_Code = "200"
        next()
    } catch (error) {
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const deleteAllPostalCode = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deletedPostalCode = await PostalCodeModel.deleteMany({ _id: { $in: idToDelete } });
        res.data = deletedPostalCode;
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

module.exports = { getPostalCode, getPostalCodeById, addPostalCode, updatePostalCode, deletePostalCode, deleteAllPostalCode, getPostalCodeByCityId, getPostalCodeByCityText }
