const Joi = require('joi');

const LISTING_CATEGORIES = [
  'trending', 'rooms', 'cities', 'castles', 'mountains',
  'arctic', 'camping', 'farmhouse', 'villa', 'boats',
];

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    category: Joi.string()
      .valid(...LISTING_CATEGORIES)
      .allow('', null)
      .optional(),
    image: Joi.object({
      url: Joi.string().allow('', null),
    }).optional(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
