const Joi = require('@hapi/joi');
const FoodsConstant = require('../foods.constant');

const UpdateFoodValidationSchema = Joi.object().keys({
  foodId: Joi.number().min(1).required(),
  group: Joi.valid([FoodsConstant.GROUP.DRINK, FoodsConstant.GROUP.DRY, FoodsConstant.GROUP.RICE, FoodsConstant.GROUP.SOUP, FoodsConstant.GROUP.MIXED_FOOD, FoodsConstant.GROUP.CAKE]),
  description: Joi.string(),
  price:Joi.number().min(1),
  name: Joi.string()
});

module.exports = {
  UpdateFoodValidationSchema
};
