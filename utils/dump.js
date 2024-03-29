const addFamilyMember = async (req, res, next) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
      }
      const verifytoken = jwt.verify(token.replace('Bearer ', ''), "shicsdfhaljkvfjckds")?.user
      // console.log(verifytoken)
      const parentUser = await UserModel.findById(verifytoken);
      if (!parentUser) {
        return res.status(404).json({ message: 'Parent user not found' });
      }
  
      const { mobile, email, relation_type_id  } = req.body
      const existingFamilyMember = await UserModel.findOne({
        parent_user_id: verifytoken,
        $or: [{ mobile }, { email }]
      });
  
      if (existingFamilyMember) {
        // Family member with the same mobile number or email already exists
        res.data = "member already exist with same email or mobile";
        res.status_Code = "200";
        next();
        return;
      }
      // const existingFamilyMember = await UserModel.findOne({
      //   parent_user_id: verifytoken,
      //   /* Add other conditions to check if the family member already exists */
      // });
      // if (existingFamilyMember) {
      //   return res.status(409).json({ message: 'Family member already exists for the parent user' });
      // }
  
      const familyMember = await UserModel.create({
        ...req.body,
        relation_type_id,
        parent_user_id: verifytoken
      });
      res.data = familyMember
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
  
  
  const getFamilyMembers = async (req, res, next) => {
    try {
      // Extract the parent user's ID from the request parameters
      const parentId = req.params.parentId;
      console.log(parentId)
  
      // const token = req.headers.authorization;
      // if (!token) {
      //   return res.status(401).json({ message: 'Token not provided' });
      // }
      // const verifytoken = jwt.verify(token.replace('Bearer ', ''), "shicsdfhaljkvfjckds")?.user;
  
  
      // Find the parent user
      const parentUser = await UserModel.findById(parentId);
      if (!parentUser) {
        return res.status(404).json({ message: 'Parent user not found' });
      }
  
      // Find all family members belonging to the parent user
      const familyMembers = await UserModel.find({ parent_user_id: parentId });
  
      // Construct the response object containing parent user data and family member data
      const responseData = {
        parentUser: parentUser,
        familyMembers: familyMembers
      };
  
      // Send the response
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  const deleteFamilyMember = async (req, res, next) => {
    try {
      // Extract the family member's ID from the request parameters
      const memberId = req.params.memberId;
  
      // Find the family member by ID
      const familyMember = await UserModel.findById(memberId);
      if (!familyMember) {
        return res.status(404).json({ message: 'Family member not found' });
      }
  
      // Delete the family member
      await UserModel.findByIdAndDelete(memberId);
  
      // Send success response
      res.status(200).json({ message: 'Family member deleted successfully' });
      next()
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
      next()
    }
}