createCategory = async(body,params)=>{
    try {
        const { name } = body;
        if (!name) {
          return res
            .status(400)
            .json({
              error: "Category name is required",
              status: "Failed",
              statusCode: 400,
            });
        }
        const newCategory = {
          id: categories.length + 1,
          name,
          products: [],
        };
        return newCategory
    } catch (error) {
        
    }
}

module.exports = createCategory