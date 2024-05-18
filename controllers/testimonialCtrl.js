const TestimonialModel = require("../models/testimonialModel")

const getTestimonial = async (req, res, next) => {
    try {
        // let client = await Client.get('Testimonial');
        // let Testimonial;
        // if(client == null) {
        //     Testimonial = await TestimonialModel.find()
        //     await Client.set(`Testimonial`, JSON.stringify(Testimonial));
        // }
        // else {
        //     Testimonial = JSON.parse(client);
        // }
        const Testimonial = await TestimonialModel.find()
            .populate({ path: 'user_id', select: 'first_name last_name' })
            .populate({ path: 'serviceProvider', select: 'firstname lastname' })
            .lean();

        res.data = Testimonial
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

const getTestimonialById = async (req, res, next) => {
    try {
        const Testimonial = await TestimonialModel.findById(req.params.id).populate({ path: 'user_id', select: 'first_name last_name' })
            .populate({ path: 'serviceProvider', select: 'firstname lastname' })
            .exec();
        res.data = Testimonial
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

const addTestimonial = async (req, res, next) => {
    try {
        const Testimonial = await TestimonialModel.create(req.body);
        res.data = Testimonial
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

const updateTestimonial = async (req, res, next) => {
    try {
        const Testimonial = await TestimonialModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.data = Testimonial
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

const deleteTestimonial = async (req, res, next) => {
    try {
        const Testimonial = await TestimonialModel.findByIdAndDelete(req.params.id);
        res.data = Testimonial
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

// const getTestimonialBySellerId = async (req, res, next) => {
//     try {
//         const sellerId = req.params.id; // Assuming the seller ID is passed in the URL parameters
//         // console.log(sellerId)
//         const photoGalleries = await TestimonialModel.find({ seller_id: sellerId }).populate({ path: 'seller_id', select: 'firstname lastname' });
//         res.data = photoGalleries;
//         res.status_Code = "200";
//         next();
//     } catch (error) {
//         res.error = true;
//         res.status_Code = "403";
//         res.message = error.message;
//         res.data = {};
//         next();
//     }
// }


const getTestimonialByUserId = async (req, res, next) => {
    try {
        const  user_id  = req.params.id; // Assuming user_id is provided as a URL parameter
        console.log(user_id)
        const Testimonial = await TestimonialModel.find({ user_id })
            .populate({ path: 'user_id', select: 'first_name last_name' })
            .populate({ path: 'serviceProvider', select: 'firstname lastname' })
            .lean();

        res.data = Testimonial
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


module.exports = { getTestimonial, getTestimonialById, addTestimonial, updateTestimonial, deleteTestimonial, getTestimonialByUserId }
