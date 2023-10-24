const Joi = require('@hapi/joi');
const FoodsConstant = require('../foods.constant');

const CreateFoodValidationSchema = Joi.object().keys({
  group: Joi.valid([FoodsConstant.GROUP.DRINK, FoodsConstant.GROUP.DRY, FoodsConstant.GROUP.RICE, FoodsConstant.GROUP.SOUP, FoodsConstant.GROUP.MIXED_FOOD, FoodsConstant.GROUP.CAKE]).required(),
  description: Joi.string().required(),
  price:Joi.number().min(1).required(),
  name: Joi.string().required()  
});

module.exports = {
  CreateFoodValidationSchema
};
