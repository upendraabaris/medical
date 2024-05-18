const MedicalOrder = require("../../models/ecommerce/pickupPoint_OrderModel")
const Vital = require("../../models/patientVitalInfoModel")
const Seller = require("../../models/ecommerce/sellersModel")
const Order = require("../../models/ecommerce/orderModel")
const Transaction = require("../../models/walletTransactionModel")
const Razorpay = require("razorpay");
const addMedicalOrder = async(req,res,next)=>{
    const sellers = [];
    let total = 0
    req.body.sellerlist.forEach((items)=>{
        sellers.push(Seller.findById(items))
    })
    const sellerList = await Promise.all(sellers)
    sellerList.forEach((item)=>{
        if(item == null){
            throw new Error("seller not found")
        }
        total += item.doctor_fee_IND
    })
    const  order =  new Order({grandTotal: total, total, user_id: req.user})

    const transaction = await Transaction.create({trans_category: 'Medical Consultancy Booking', amount: total, orderId: order._id, user_id: req.user });
    const orders = []
    sellerList.forEach((items)=>{
        orders.push(new MedicalOrder({grandTotal: items.doctor_fee_IND, total: items.doctor_fee_IND, parent_id: order._id, vitals: req.body.vitals, questions: req.body.questions, seller_id: items._id, user_id: req.user, order_type: 'Medical Consultancy', chief_complaint: req.body.chief_complaint}))
    })                      
    console.log(sellerList)
    const saveData = []
    orders.forEach((items)=>{
        saveData.push(items.save())
    })
    saveData.push(order.save())
    await Promise.all(saveData)

    var options = {
        amount: total * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: transaction.order_id,
      };
      var instance = new Razorpay({
        key_id: process.env.RAZOR_KEY,
        key_secret: process.env.RAZOR_SECRET,
      });

      instance.orders.create(options, async function (err, order) {
        if (err != null) {
          throw new Error(err.message)
        } else {
          await Transaction.findByIdAndUpdate(transaction._id, {
            reciept: order.id,
          });
        //   res.json(order);
          res.data = order;
          res.status_Code = "200";
          next();
        }
      });

    // res.json(orders)
    // const { sellerlist } = req.body;
    // for (const itemId of sellerlist) {
    //     const seller = await Seller.findById(itemId);
    //     if (seller) {
    //         sellers.push(seller);
    //     } else {
    //         throw new Error(`Seller not found for item ID: ${itemId}`);
    //     }
    // }
    // Do something with the sellers array

}

const addMedicalOrderByAdmin = async(req,res,next)=>{
  const sellers = [];
  let total = 0
  req.body.sellerlist.forEach((items)=>{
      sellers.push(Seller.findById(items))
  })
  const sellerList = await Promise.all(sellers)
  sellerList.forEach((item)=>{
      if(item == null){
          throw new Error("seller not found")
      }
      total += item.doctor_fee_IND
  })
  const  order =  new Order({grandTotal: total, total, user_id: req.body.user_id})

  // const transaction = await Transaction.create({trans_category: 'Medical Consultancy Booking', amount: total, orderId: order._id, user_id: req.user });
  const orders = []
  sellerList.forEach((items)=>{
      orders.push(new MedicalOrder({grandTotal: items.doctor_fee_IND, total: items.doctor_fee_IND, parent_id: order._id, vitals: req.body.vitals, questions: req.body.questions, seller_id: items._id, user_id: req.body.user_id, order_type: 'Medical Consultancy', chief_complaint: req.body.chief_complaint}))
  })                      
  console.log(sellerList)
  const saveData = []
  orders.forEach((items)=>{
      saveData.push(items.save())
  })
  saveData.push(order.save())
  await Promise.all(saveData)

  // var options = {
  //     amount: total * 100, // amount in the smallest currency unit
  //     currency: "INR",
  //     // receipt: transaction.order_id,
  //   };
  //   var instance = new Razorpay({
  //     key_id: process.env.RAZOR_KEY,
  //     key_secret: process.env.RAZOR_SECRET,
  //   });

  //   instance.orders.create(options, async function (err, order) {
  //     if (err != null) {
  //       throw new Error(err.message)
  //     } else {
  //       await Transaction.findByIdAndUpdate(transaction._id, {
  //         reciept: order.id,
  //       });
  //     //   res.json(order);
  //       res.data = order;
  //       res.status_Code = "200";
  //       next();
  //     }
  //   });
  res.json({message: "success"})
  // res.json(orders)
  // const { sellerlist } = req.body;
  // for (const itemId of sellerlist) {
  //     const seller = await Seller.findById(itemId);
  //     if (seller) {
  //         sellers.push(seller);
  //     } else {
  //         throw new Error(`Seller not found for item ID: ${itemId}`);
  //     }
  // }
  // Do something with the sellers array

}



const getMedicalOrders = async (req, res, next) => {
    // try {
        
    //     const medicalOrders = await MedicalOrder

    //     res.data = medicalOrders;
    //     res.status_Code = 200;
    //     next();
    // } catch (error) {
    //     res.error = true;
    //     res.status_Code = 403;
    //     res.message = error.message;
    //     res.data = {};
    //     next();
    // }
};
const mongoose = require("mongoose")
// const totalExpenses = async(req,res)=>{
//   try {
//     // Calculate total expenses
//     // const userId = req.params.id;
//     const userId = req.user;
//     const totalExpenses = await MedicalOrder.aggregate([
//       {
//         $match: { user_id: new mongoose.Types.ObjectId(userId) }
//     },
//         {
//             $group: {
//               _id: "$order_type",
//                 total: { $sum: "$grandTotal" }
//             }
//         }
//     ]);
//     // Format the response
//     const formattedExpenses = totalExpenses.reduce((result, expense) => {
//       result[expense._id] = expense.total;
//       return result;
//     }, {});

//     res.json({ totalExpenses: formattedExpenses });
// } catch (error) {
//     res.status(500).json({ error: error.message });
// }
// }
const totalExpenses = async (req, res) => {
  try {
    const userId = req.user;
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    const expenses = await MedicalOrder.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(userId),
          $or: [
            { createdAt: { $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`), $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`) } },
            { createdAt: { $gte: new Date(`${lastYear}-01-01T00:00:00.000Z`), $lt: new Date(`${currentYear}-01-01T00:00:00.000Z`) } }
          ]
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $group: {
          _id: { order_type: "$order_type", year: { $year: "$createdAt" } },
          total: { $sum: "$grandTotal" },
          firstName: { $first: "$user.first_name" },
          lastName: { $first: "$user.last_name" }
        }
      },
      {
        $project: {
          order_type: { $ifNull: ["$_id.order_type", "Unknown"] },
          year: "$_id.year",
          total: 1,
          firstName: { $ifNull: ["$firstName", "Unknown"] },
          lastName: { $ifNull: ["$lastName", "Unknown"] }
        }
      }
    ]);

    const formattedExpenses = expenses.map(expense => ({
      order_type: expense.order_type,
      year: expense.year,
      total: expense.total,
      firstName: expense.firstName,
      lastName: expense.lastName
    }));

    res.json({ totalExpenses: formattedExpenses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





module.exports = { addMedicalOrder, addMedicalOrderByAdmin, totalExpenses }