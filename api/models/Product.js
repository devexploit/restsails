/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // name : {
    //   type:'string'
    // },
    // qty : {
    //   type : 'integer'
    // },
    // createdAt: { type: 'string', columnType: 'datetime', autoCreatedAt: true, },
    // updatedAt: { type: 'string', columnType: 'datetime', autoUpdatedAt: true, }

    id : {type: 'number', autoIncrement : true, columnType: 'BIGSERIAL'},
  name : {
      type:'string'
    },
    qty : {
      type : 'number'
    },


    createdAt: { type: 'string', columnType: 'text'},
    updatedAt: { type: 'string', columnType: 'text'}

  
  },

  // customToJSON: function() {
  //   return _.omit(this, ['name', 'qty'])
  // }

};

