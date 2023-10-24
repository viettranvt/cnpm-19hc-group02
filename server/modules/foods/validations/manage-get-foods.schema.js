const Joi = require('@hapi/joi');
const FoodsConstant = require('../foods.constant');

const GetFoodsValidationSchema = Joi.object().keys({
  group: Joi.valid([FoodsConstant.GROUP.DRINK, FoodsConstant.GROUP.DRY, FoodsConstant.GROUP.RICE, FoodsConstant.GROUP.SOUP, FoodsConstant.GROUP.MIXED_FOOD, FoodsConstant.GROUP.CAKE])
});

module.exports = {
  GetFoodsValidationSchema
};
