/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require("joi")

module.exports = {
  
    async create(req,res)
    {

        var date = new Date();
        var name = req.body.name;
        var surname = req.body.surname;
        var email =req.body.email;
        var password = req.body.password;
        var username = req.body.username;


        // joi library denemek amacıyla yazılmıştır validate işlemlerinde güzel iş çıkarır.
        const schema = Joi.object({
        username: Joi.string().min(4).required().messages({"string.base" : "String gir la"}),
        email: Joi.string().min(6).required().email().messages({"any.required": "Email gir la", "string.min": "en az 6 hane!"}),
        password: Joi.string().min(6).required().messages({"any.required": "sifre gir la", "string.min": "en az 6 hane"}),
        name: Joi.required().messages({"any.required" : 'name gir la'}),
        surname : Joi.required().messages({"any.required" : 'surname gir la'}),
        })

        

        const { error } = schema.validate(req.body)
        if (error) return res.status(400).send({hata : error.details[0].message})


        if(!password || password.length < 5) {
            return res.json(
                {
                    error : "Gecerli bir sifre girin"
                }
            )
        }

   
        try {
            var control = await User.findOne(
                {
                    or : [
                        {email : email},
                        {username : username}
                    ]
                }
            );
     
               if(control) {
                return res.json(
                    {
                        hata : "Kullanici adi veya email kullanimda"
                    }
                )
               }
               
               return bcrypt.hash(password,12)
               .then((password) => {
                var user= User.create(
                    {
                        name : name,
                        surname : surname,
                        email : email,
                        password : password,
                        username : username,
                        createdAt : date.getTime(),
                        updatedAt : date.getTime()
                    }
        
                ).fetch();
                return user
                .then((user) => {

                    var userToken = jwt.sign({
                        muuid: user.muuid,
                        memail: user.memail,
                        cid: user.cid
                    }, 
                    'secret_key',
                    {
                        expiresIn :"20m"
                    }
                    )
                    var token = Token.create(
                        {
                            user_id : user.id,
                            is_admin : 0,
                            token : userToken,
                            createdAt : date.getTime(),
                            updatedAt : date.getTime()
                        }
                    ).fetch();
                    return token
                    .then((token) => {
                        return res.json(
                            {
                                user : user,
                                token : token.token
                            }
                        )
                    })
                    
                })
        
                
               }).catch((err) => {
                return res.json(
                    {
                        error : err
                    }
                )
               })  
        }

       catch(err) {
           return res.json(
               {
                   error : err
               }
           )
       }

    },

    async login(req,res) {

        var login = req.body.login;
        var password = req.body.password;
        var date = new Date();

        if(!login || !password){
            return res.json({
                error : "Alanlar doldurulmalidir"
            })
        }

        try {
            var user = await User.findOne({
                or : [
                    {email : login},
                    {username : login}
                ]
            })

            if(!user){
                return res.json({
                    error : "Kullanici bulunamadi"
                })
            }

            bcrypt.compare(password,user.password)
            .then((success) => {
               if(!success) {
                   return res.json(
                       {
                           error : "Hatali sifre"
                       }
                   )
               }
            })

            var  userToken = await Token.findOne({
                user_id : user.id
            })

            var token = jwt.sign({
                muuid: user.muuid,
                memail: user.memail,
                cid: user.cid
            }, 
            'secret_key',
            {
                expiresIn :"10m"
            }
            )

            console.log(userToken);

            if(userToken) {
             
                var updatedToken = await Token.updateOne({
                        user_id : user.id
                    })
                    .set({
                        token : token,
                        updatedAt : date.getTime()
                    })
        
                    user = {user, tokenI : {token:  updatedToken.token, admin : updatedToken.is_admin, tokenUpdate : updatedToken.updatedAt}}

                    return res.json({
                        user : user,
                        update : "bu update"
                    })
              
            }
          
           
                var createdToken = await Token.create(
                    {
                        user_id : user.id,
                        is_admin : 0,
                        token : token,
                        createdAt : date.getTime(),
                        updatedAt : date.getTime()
                    }
                ).fetch();
                console.log(user);
                console.log(createdToken);
                user = {user, tokenI : {token:  createdToken.token, admin : createdToken.is_admin, tokenUpdate : createdToken.updatedAt}}
                console.log(user);
                return res.json({
                    user : user,
                    create : 'bu create'
                })   

        }

        catch(err) {
            return res.json({
                error :err
            })
        }
       

        

    },

    async find(req,res)
    {
        var users = await User.find();

        var usersProduct = await UsersProduct.find()
        .populate('product_id');

        var all = [];
        
        for(let i=0;i<users.length;i++){
            var product = [];
            for(let j=0;j<usersProduct.length;j++){
                if(users[i].id == usersProduct[j].user_id){
                    
                    product.push(usersProduct[j]);

                }
            }

            all[i] = 
                   {
                    user : users[i],
                    products : product
                   }        
        }

        return res.json(
            {
                userdata : all
              
            }
        )

    },

    async logout(req,res){

        var token = await Token.destroyOne(
            {
                token : req.headers.authorization
            }
        );

        return res.json(
            {
                token : token
            }
        )

    },

    async update(req,res)
    {

        var date = new Date();
        
        if (req.body.username || req.body.email){
            return res.json({
                error : "Kullanici adi veya email adresinde degisiklik yapilamaz"
            })
        }

        try {
            var updatedUser = await User.updateOne(
                {
                    id : req.params.id
                }
            )
            .set(
                {
                    name : req.body.name,
                    surname : req.body.surname,
                    updatedAt : date.getTime()
                }   
    
            )
    
            if(updatedUser){

                if(req.body.password){

                    return bcrypt.hash(req.body.password,12)
                    .then((password) => {
                        User.updateOne({id : req.params.id})
                        .set({
                            password : password,
                            updatedAt : date.getTime()

                        })
                        .then((user) => {
                            return res.json({
                                user : user
                            })
                        })
                        
                    })

                }

                return res.json(
                    {
                        user : updatedUser
                    }
                )
    
            }
            else {
                return res.json(
                    {
                        error : "Hata meydana geldi"
                    }
                )
            }
        }

        catch(err) {

            return res.json({
                error :err
            })
        }


    },

    async destroy(req,res)
    {
        try {
            deleteUser = await User.destroyOne({id : req.params.id})
    
            if(deleteUser){
                return res.json(
                    {
                        user : deleteUser
                    }
                )
            }
            return res.json(
                {
                    error : "hata meydana geldi"
                }
            )
        }
       
      catch(err) {
            return res.json(

                {
                    error : err
                }
            )
      }  
        
    },
    async getUser(req,res)
    {

        try {
            var user = await User.findOne(
                {
                    id : req.params.id
                }
            )
    
            var card = await UsersProduct.find(
                {
                    user_id : req.params.id
                }
            )
            .populate('product_id')

            var clearCard = [];
            card.forEach(element => {

                clearCard.push({
                    count : element.count,
                    name : element.product_id.name,
                    qty : element.product_id.qty
                });

            });

            var data = [{
                user : user, card : clearCard
            }]

            return res.json(
                {
                    user : data
                }
            )
        
        }
        catch(err) {
            return res.json({
                error :  err
            })
        }
    },
};