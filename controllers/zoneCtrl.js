const ZoneModel = require("../models/zoneModel")
const Client = require("../middleware/redis")
const getZone = async(req,res,next)=>{
    try{
        // const Zone = await ZoneModel.find().populate('cities').exec();
        let client = await Client.get('zone:getZone');
        let Zone;
        if(client == null) {
            Zone = await ZoneModel.find().populate('cities').sort({ name: 1 }).exec();
            await Client.set('zone:getZone', JSON.stringify(Zone));
        }
        else {
            Zone = JSON.parse(client);
        }
        res.data = Zone
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

const getZoneById = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.findById(req.params.id).populate('cities').exec();
        res.data = Zone
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

const addZone = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.create(req.body);
        let allKeys = await Client.keys("zone:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = Zone
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

const updateZone = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        let allKeys = await Client.keys("zone:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = Zone
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

const deleteZone = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.findByIdAndDelete(req.params.id);
        let allKeys = await Client.keys("zone:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = Zone
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

const deleteAllZone = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteZone = await ZoneModel.deleteMany({_id: { $in: idToDelete}});
        let allKeys = await Client.keys("zone:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = deleteZone;
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

const getZoneByStateId = async (req, res, next) => {
    try {
        const stateId = req.params.state_id;

        // Check if the state_id is provided
        if (!stateId) {
            throw new Error("State ID is required.");
        }

        let client = await Client.get(`zone:getZone:${stateId}`);
        let Zone;

        if (client == null) {
            // Assuming ZoneModel has a field called 'state' which holds the state_id
            Zone = await ZoneModel.find({ state_id: stateId }).sort({ name: 1 }).exec();
            await Client.set(`zone:getZone:${stateId}`, JSON.stringify(Zone));
        } else {
            Zone = JSON.parse(client);
        }

        res.data = Zone;
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


const getZoneCityMapping = async(req,res,next)=>{
    try{
        // const City = await CityModel.find().populate('state_id').exec();
        const City = await ZoneModel.aggregate([
            {
                $lookup:{
                    from: "cities",
                    localField: "cities",//kya krna h
                    foreignField: "_id",
                    as: "cityinfo"
                }
            },
            {
                    $unwind:"$cityinfo"
            },
            {
                $lookup: {
                    from: "states",
                    localField: "cityinfo.state_id",
                    foreignField: "_id", // Assuming _id is the ObjectId field in State model
                    as: "stateInfo"
                }
            },
            {
                $lookup: {
                    from: "countries",
                    localField: "stateInfo.country_id",
                    foreignField: "_id", // Assuming _id is the ObjectId field in State model
                    as: "countryInfo"
                }
            },
            {
                $project:{
                    _id:0,
                    name:1,
                    "city_name": "$cityinfo.city_name",
                    // "state_id": "$cityinfo.state_id",
                    stateName: { $arrayElemAt: ["$stateInfo.state_name", 0] },
                    // "country_id": "$stateInfo.country_id",
                    countryName: { $arrayElemAt: ["$countryInfo.country_name", 0] }
                }
            }
        ]);
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


const express = require("express")
const app = express()

const http = require("http")
const { Server } = require("socket.io")

const server = http.createServer(app)
const io = new Server(server, {
  // cors: true,
  cors: {
    origin: ['https://apiuphealback.upheals.store', 'http://localhost:3300','http://localhost:3000'], // Replace with your client domain
      methods: ['GET', 'POST'],
      credentials: true
    // origin: true, // Replace with your Next.js app origin
    // methods: ['GET', 'POST']
  }
});

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
      console.log('Socket is already attached');
      return res.end();
    }
  
    
    io.on("connection", (socket) => {
      console.log(`User Connected :${  socket.id}`);
    
      // Triggered when a peer hits the join room button.
      socket.on("join", (roomName) => {
        const {rooms} = io.sockets.adapter;
        const room = rooms.get(roomName);
    
        // room == undefined when no such room exists.
        if (room === undefined) {
          socket.join(roomName);
          socket.emit("created");
        } else if (room.size === 1) {
          // room.size == 1 when one person is inside the room.
          socket.join(roomName);
          socket.emit("joined");
        } else {
          // when there are already two people inside the room.
          socket.emit("full");
        }
        console.log(rooms);
      });
    
      // Triggered when the person who joined the room is ready to communicate.
      socket.on("ready", (roomName) => {
        socket.broadcast.to(roomName).emit("ready"); // Informs the other peer in the room.
      });
    
      // Triggered when server gets an icecandidate from a peer in the room.
    //   socket.on("ice-candidate", (candidate: RTCIceCandidate, roomName: string) => {
    //     console.log(candidate);
    //     socket.broadcast.to(roomName).emit("ice-candidate", candidate); // Sends Candidate to the other peer in the room.
    //   });
    
      // Triggered when server gets an offer from a peer in the room.
      socket.on("offer", (offer, roomName) => {
        socket.broadcast.to(roomName).emit("offer", offer); // Sends Offer to the other peer in the room.
      });
    
      // Triggered when server gets an answer from a peer in the room.
      socket.on("answer", (answer, roomName) => {
        socket.broadcast.to(roomName).emit("answer", answer); // Sends Answer to the other peer in the room.
      });
  
      socket.on("leave", (roomName) => {
        socket.leave(roomName);
        socket.broadcast.to(roomName).emit("leave");
      });
  
    });
    return res.end();
  };
  


module.exports = {getZone, getZoneById, addZone, updateZone, deleteZone, deleteAllZone, getZoneCityMapping, getZoneByStateId, SocketHandler}