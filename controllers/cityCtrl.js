const CityModel = require("../models/cityModel")
const Client = require("../middleware/redis")
const getCity = async(req,res,next)=>{
    try{
        // const City = await CityModel.find().populate('state_id').exec();
        let client = await Client.get('city:getCity');
        let City;
        if(client == null) {
            City = await CityModel.find().populate('state_id').sort({ city_name: 1 }).exec();
            await Client.set('city:getCity', JSON.stringify(City));
        }
        else {
            City = JSON.parse(client);
        }
        res.data = City
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

const getCityById = async(req,res,next)=>{
    try{
        const City = await CityModel.findById(req.params.id).populate('state_id').exec();
        res.data = City
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

const addCity = async(req,res,next)=>{
    try{
        const City = await CityModel.create(req.body);
        let allKeys = await Client.keys("city:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = City
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

const updateCity = async(req,res,next)=>{
    try{
        const City = await CityModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        let allKeys = await Client.keys("city:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = City
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

const deleteCity = async(req,res,next)=>{
    try{
        const City = await CityModel.findByIdAndDelete(req.params.id);
        let allKeys = await Client.keys("city:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = City
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

const deleteAllCity = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteCity = await CityModel.deleteMany({_id: { $in: idToDelete}});
        let allKeys = await Client.keys("city:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = deleteCity;
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

const getCityByState = async (req, res, next) => {
    try {
        const { state_id } = req.params; 

        let client = await Client.get(`city:getCity:${state_id}`);
        let cities;
        if (client == null) {
            cities = await CityModel.find({ state_id }).populate('state_id').sort({ city_name: 1 }).exec();
            await Client.set(`city:getCity:${state_id}`, JSON.stringify(cities));
        } else {
            cities = JSON.parse(client);
        }

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

const getCityByStateSearch = async (req, res, next)=>{
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
        }).limit(10).populate({path:'state_id' ,
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


module.exports = {getCity, getCityById, addCity, updateCity, deleteCity, deleteAllCity, getCityByState, getCityByStateSearch}