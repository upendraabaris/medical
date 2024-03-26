const StateModel = require("../models/stateModel")
const CityModel = require("../models/cityModel")

const getState = async (req, res, next) => {
    try {
        const State = await StateModel.find().populate({path: 'country_id', select: "country_name -_id"}).exec();
        res.data = State
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

const getStateById = async (req, res, next) => {
    try {
        const State = await StateModel.findById(req.params.id).populate('country_id').exec();
        res.data = State
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

const addState = async (req, res, next) => {
    try {
        const State = await StateModel.create(req.body);
        res.data = State
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

const updateState = async (req, res, next) => {
    try {
        const State = await StateModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.data = State
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

const deleteState = async (req, res, next) => {
    try {
        const State = await StateModel.findByIdAndDelete(req.params.id);
        res.data = State
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

const addData = async (req, res, next) => {
    try {
        // const State = await StateModel.findByIdAndDelete(req.params.id);
        // res.data = State
        let list = req.body

        var states = []
        var cities = []

        list.forEach((state) => {
            let stateId = states.find((sta) => { if (state.State == sta.state_name) { return sta } });
            if (stateId == undefined) {
                console.log(stateId, "faile")
                states.push(new StateModel({ state_name: state.State, country_id: "65e06aa4a7d40263a7a926ec" }))
            }
        });
        let saveStates = [];
        states.forEach((state) => {
            saveStates.push(state.save());
        })
        states = await Promise.all(saveStates);
        list.forEach((state) => {
            if (!cities.includes({ city_name: state.City })) {
                let stateId = states.find((sta) => { if (state.State === sta.state_name) { return sta } });
                cities.push(new CityModel({ state_id: stateId?._id, s_no: state.s_no, city_name: state.City }))
            }
        });
        let saveCity = []
        cities.forEach((state) => {
            saveCity.push(state.save());
        })

        cities = await Promise.all(saveCity)


        res.data = { cities, states }
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

const deleteAllState = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteState = await StateModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteState;
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

module.exports = { getState, getStateById, addState, updateState, deleteState, addData, deleteAllState }