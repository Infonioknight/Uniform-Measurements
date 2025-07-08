const fabricSchema = require('../../model/fabricModel')
const sizeChartSchema = require('../../model/sizeChartModel');



//get route for add new item to update the inputes fileds.
async function addNewItem(req, res) {
    
    try {
        let brand = req.query.brand;
        let dbBrand = await fabricSchema.find({SellerId:req.user._id,Brand:{$eq:brand}});
        if (dbBrand.length > 0) {
          let data = {
                sizes: dbBrand[0].sizes,
                color: dbBrand[0].Color,
                gender: dbBrand[0].gender,
                category: dbBrand[0].Category,
                price : dbBrand[0].Price
            };
            return res.status(200).json({
                sizeChart: data,
                massage: "Brand store in DB"
            });
        }else{
            return res.status(200).json({
                sizeChart:null,
                massage:"Brand not store in DB"
            })
        }

    }
    catch (err) {
        console.error("Add New Item Page", err);
        return res.status(500).json({ error: "Brand in not in our Database" });

    }

}

// sending all brand already stored in DB
async function sellerBrandsInDB (req,res) {
    try{
        let seller = await fabricSchema.find({SellerId:req.user._id});
        let brandInDB = [];
        for(let i = 0; i < seller.length; i++){
            if(!brandInDB.includes(seller[i].Brand)){
                brandInDB.push(seller[i].Brand)
            }  
        }
        return res.status(200).json({
            brand : brandInDB,
            massage : 'All Brand already stored in DB'
        })

    }
    catch(e){
        console.error("Add New Item Page", e);
        return res.status(500).json({ error: "Brand in not in our Database" });

    }
}


module.exports = {
    addNewItem,
    sellerBrandsInDB
}