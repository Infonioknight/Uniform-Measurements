const bodyMeasurementSchema = require("../model/bodyMeasurementsModel");
const fabricSchema = require("../model/fabricModel.js");
const sizeChartModel = require("../model/sizeChartModel.js");
const fabricCategorySchema = require("../model/sellerFabricCategory.js");

const getFilteredProductsbyMeasurements = async (req, res) => {
  const { userId, sellerId } = req.params;
  try {
    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID is required" });
    }

    const existingMeasurement = await bodyMeasurementSchema.findOne({ userId });

    if (!existingMeasurement) {
      const products = await fabricSchema.find({ SellerId: sellerId });
      const categories = await fabricCategorySchema.find({ SellerId: sellerId });

      if (!products.length) {
        return res.status(404).json({ message: "No fabric stocks found" });
      }

      return res.status(200).json({ products, categories });
    }

    let brandSizes = [];
    const { chest, shoulder, waist, upperbodyWearSize, lowerbodyWearSize } = existingMeasurement;

    if (chest && shoulder) {
      const upperBodySizes = await sizeChartModel.find({
        chest: { $gte: chest, $lte: chest + 2 },
        shoulder: { $gte: shoulder, $lte: shoulder + 2 },
        SellerId: sellerId,
      });
      brandSizes.push(...upperBodySizes);

      if (waist) {
        const lowerBodySizes = await sizeChartModel.find({
          waist: { $gte: waist, $lte: waist + 1 },
          SellerId: sellerId,
        });
        brandSizes.push(...lowerBodySizes);
      }
    }

    // Fallback to upperbodyWearSize and lowerbodyWearSize if brandSizes not found
    if (!brandSizes.length && upperbodyWearSize && lowerbodyWearSize) {
      const sizesToCheck = [upperbodyWearSize, lowerbodyWearSize];
      const sizeProductPromises = sizesToCheck.map(async (size) => {
        const products = await fabricSchema.find({
          Size: {
            $elemMatch: {
              size: { $regex: new RegExp(`^${size}$`, "i") },
              stock: { $gt: 0 },
            },
          },
          SellerId: sellerId,
        });

        return products.map((product) => {
          const matchedSize = product.Size.find(
            (s) => new RegExp(`^${size}$`, "i").test(s.size) && s.stock > 0
          );

          return {
            ...product.toObject(),
            matchedSize: matchedSize?.size,
            matchedStock: matchedSize?.stock,
          };
        });
      });

      const flatMatchingProducts = (await Promise.all(sizeProductPromises)).flat();

      if (!flatMatchingProducts.length) {
        return res.status(200).json({ message: "No products found" });
      }

      const categories = await fabricCategorySchema.find({ SellerId: sellerId });
      return res.status(200).json({ products: flatMatchingProducts, categories });
    }

    if (!brandSizes.length) {
      return res.status(400).json({ error: "No matching brand sizes found" });
    }

    const brandProductPromises = brandSizes.map(async (size) => {
      const products = await fabricSchema.find({
        Size: {
          $elemMatch: {
            size: { $regex: new RegExp(`^${size.brandSize}$`, "i") },
            stock: { $gt: 0 },
          },
        },
        Brand: { $regex: new RegExp(size.brandName, "i") },
        SellerId: sellerId,
      });

      return products.map((product) => {
        const matchedSize = product.Size.find(
          (s) => new RegExp(`^${size.brandSize}$`, "i").test(s.size) && s.stock > 0
        );

        return {
          ...product.toObject(),
          matchedSize: matchedSize?.size,
          matchedStock: matchedSize?.stock,
        };
      });
    });

    const flatMatchingProducts = (await Promise.all(brandProductPromises)).flat();

    if (!flatMatchingProducts.length) {
      return res.status(200).json({ message: "No products found" });
    }

    const categories = await fabricCategorySchema.find({ SellerId: sellerId });
    return res.status(200).json({ products: flatMatchingProducts, categories });
  } catch (error) {
    console.error("Error filtering products by measurements:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBrandSizechart = async (req, res) => {
  const { brandName, category, sellerId } = req.params;

  try {
    const brandSizechart = await sizeChartModel.find({
      brandName: { $regex: new RegExp(brandName, "i") },
      category: { $regex: new RegExp(category, "i") },
      SellerId: sellerId,
    });

    return res.status(200).json({ brandSizechart });
  } catch (error) {
    console.error("Error fetching brand size chart:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getFilteredProductsbyMeasurements, getBrandSizechart };
