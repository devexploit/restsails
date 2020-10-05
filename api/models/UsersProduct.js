/**
 * UsersProduct.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id : {type: 'number', autoIncrement : true, columnType: 'BIGSERIAL'},


  user_id : {
    model:'User'  },

  product_id : {
    model:'Product'
    },
    count : {
      type : 'number'
    }

  },

};

