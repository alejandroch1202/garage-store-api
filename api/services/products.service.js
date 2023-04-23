const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('./../libs/sequelize');

class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      where: {},
    };

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { categoryId } = query;
    if (categoryId) {
      options.where.categoryId = categoryId;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    let product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    changes = { id, ...changes };
    await models.Product.update(changes, {
      where: { id },
    });
    return changes;
  }

  async delete(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    await models.Product.destroy({ where: { id } });
    return { id };
  }
}

module.exports = ProductsService;
