/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  //Product
  'POST /products' : 'ProductController.create',
  'GET /products' : 'ProductController.find',   
  'PUT /product/:id' : 'ProductController.update',
  'DELETE /:product/:id' : 'ProductController.destroy',
  'GET /product/:id' : 'ProductController.getProduct',

  //User
  'POST /register' : 'UserController.create',
  'GET /users' : 'UserController.find', 
  'PUT /user/:id' : 'UserController.update',
  'DELETE /user/:id' : 'UserController.destroy',
  'GET /user/:id' : 'UserController.getUser',
  'POST /login' : 'UserController.login',
  'GET /logout' : 'UserController.logout',
  
  //add product
  'POST /addproduct' : 'UsersProduct.addCard',
  'DELETE /deletecard/:id' : 'UsersProduct.deleteCard'
  } 



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


