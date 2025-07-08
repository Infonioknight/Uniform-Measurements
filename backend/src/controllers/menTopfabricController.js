const xlsx = require("xlsx");
const userSchema = require("../model/userModel.js");
const sizeChartModel = require("../model/sizeChartModel.js")


function findBestFitSize(user, tshirtData) {
  let bestFitSize = {};
  let minDifference = Number.MAX_VALUE;

  for (const tshirt of tshirtData) {

    let difference;
    const chestSize = tshirt.chest_inch - user["Chest size in Inch"];
    const ShoulderSize = tshirt.shoulder_inch - user["Shoulder size in Inch"];
    const frontLenght = tshirt.front_Length_inch - user["Front Length in Inch"];
    if (chestSize < 0 || ShoulderSize < 0 || frontLenght < 0) {
      continue;
    }
    difference = chestSize + ShoulderSize + frontLenght;
    if (difference < minDifference) {
      minDifference = difference;
      bestFitSize = tshirt;
      // bestFitSize.percentage = (100 - difference).toFixed(2) + " %"
    }
  }

  return bestFitSize;
}

const getFabricListQuantity = async (req, res) => {
  // console.log(req.files);
  try {
    if (!req.files) {
      return res.status(400).json({ error: "No file uploaded" });
    }
  
 
    const userFileBuffer = req.files["userFile"][0].buffer;
    const tshirtFileBuffer = req.files['tshirtFile'][0].buffer;
    // console.log(userFileBuffer);

    // Process the Excel sheets (e.g., parse, validate, save to database, etc.)
  
    const userData = xlsx.read(userFileBuffer, { type: "buffer" });
    const userSheet = userData.SheetNames[0];
    const userJsonData = xlsx.utils.sheet_to_json(userData.Sheets[userSheet]);

    const tshirtData = xlsx.read(tshirtFileBuffer, { type: 'buffer' });
    const tshirtSheet = tshirtData.SheetNames[0];
    const tshirtJsonData = xlsx.utils.sheet_to_json(tshirtData.Sheets[tshirtSheet]);


    const brandSizeData = tshirtJsonData.map(tshirt => ({
      brand_Name: tshirt.Name,
      brand_Size: tshirt.Size,
      chest_inch: tshirt["Chest size in Inch"],
      shoulder_inch: tshirt["Shoulder Length in Inch"],
      front_Length_inch: tshirt["Front Size in Inch"]
    }));


    console.log("Brand Size Data:", brandSizeData);
    console.log("user Size Data:", userJsonData);
   
      let userSizeData = [];
      
      for (const user of userJsonData  ) {
        const bestFitSize = findBestFitSize(user, brandSizeData);

        bestFitSize.name = user.Name;
        userSizeData.push(bestFitSize);
      }


      const fabricQuantity = {};
 

      for (let i = 0; i < userSizeData.length; i++) {
        let fabricSize = userSizeData[i];
        if (fabricQuantity[fabricSize.brand_Size]) {
          fabricQuantity[fabricSize.brand_Size] += 1;
        } else {
          fabricQuantity[fabricSize.brand_Size] = 1;
        }
      }

 

    console.log("user :",fabricQuantity)
    return res.status(200).json({ "fabric size Quantity": fabricQuantity } );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const getTshirtQuantity = async (req, res) => {
  try {
    const { comapnyName } = req.params;
    const userList = await userSchema.find({ company: comapnyName });
    if (!userList.length) {
      return res.status(400).json({ message: "No Employee Found" });
    }
    const brandSizeData = await sizeChartModel.find({
      brand_Name: { $regex: new RegExp('^' + 'allen Solly' + '$', 'i') },
      category: { $regex: new RegExp('^' + 'T-Shirt' + '$', 'i') },
    });

    let userSizeData = [];
    for (const user of userList) {
      let bestFitSize = {};
      let minDifference = Number.MAX_VALUE;
      if (
        user.chest_inch == undefined ||
        user.shoulder_inch == undefined ||
        user.front_Length_inch == undefined
      ) {
        continue;
      }
      for (const tshirt of brandSizeData) {
        let difference;
        const chestSize = tshirt.chest_inch - user["chest_inch"];
        const ShoulderSize = tshirt.shoulder_inch - user["shoulder_inch"];
        const frontLenght =
          tshirt.front_Length_inch - user["front_Length_inch"];
        if (chestSize < 0 || ShoulderSize < 0 || frontLenght < 0) {
          continue;
        }
        difference = chestSize + ShoulderSize + frontLenght;
        if (difference < minDifference) {
          minDifference = difference;
          bestFitSize = tshirt;
          // bestFitSize.percentage = (100 - difference).toFixed(2) + " %"
        }
        
      }
      userSizeData.push(bestFitSize);
    }
    const fabricQuantity = {};
    for (let i = 0; i < userSizeData.length; i++) {
      let fabricSize = userSizeData[i];
      if (fabricQuantity[fabricSize.brand_Size]) {
        fabricQuantity[fabricSize.brand_Size] += 1;
      } else {
        fabricQuantity[fabricSize.brand_Size] = 1;
      }
    }
    return res.status(200).json({ "fabric size Quantity": fabricQuantity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getFabricListQuantity,
  getTshirtQuantity,
};
