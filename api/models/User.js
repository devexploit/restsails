/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */



module.exports = {

  attributes: {

    id : {type: 'number', autoIncrement : true, columnType: 'BIGSERIAL'},
  name : {
      type:'string' , columnType: 'text', required : true
    },
    surname : {
      type : 'string', columnType: 'text' ,  required : true
    },
    username : {
      type : 'string', columnType: 'text',  required : true
    },
    email : {
      type :  'string', columnType: 'text',  required : true
    },

    password : {
      type : 'string', columnType: 'text',  required : true
    },

    createdAt: { type: 'string', columnType: 'text'},
    updatedAt: { type: 'string', columnType: 'text'}

  },

  //engelleme
  // customToJSON: function() {
  //   return _.omit(this, ['name', 'surname','phone'])
  // }

};

