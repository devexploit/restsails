/**
 * UsersProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
     async addCard(req,res){
        try {

            var userToken = req.headers.authorization;

        token = await Token.findOne({token : userToken})
  
        var card = await UsersProduct.findOne(
            {
                product_id : req.body.productId,
                user_id : token.user_id
            }
        )
        if(card){

            cardUpdate = await UsersProduct.updateOne(
                {
                    product_id : req.body.productId,
                    user_id : token.user_id
                }
            )
            .set(
                {
                    count : card.count+1
                }
            )
            

            return res.json(
                {
                    card : cardUpdate
                }
            )
        }
        
    
        var cardCreate = await UsersProduct.create(
            {
                user_id : token.user_id,
                product_id : req.body.productId,
                count : 1
            }
        )
        .fetch();

        return res.json({
            card : cardCreate,
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

    async deleteCard (req,res){

        
        try {
            var userToken = req.headers.authorization;

        token = await Token.findOne({token : userToken})

        var card = await UsersProduct.findOne(
            {   
                and : [
                    {user_id : token.user_id},
                    {product_id : req.params.id}
                ]
            }
        )

        if(card.count > 1){
            var updatedCard = await UsersProduct.update(
                {   
                    and : [
                        {user_id : token.user_id},
                        {product_id : req.params.id}
                    ]
                }
            )
            .set(
                {
                    count : card.count -1
                }
            ).fetch();
            return res.json(
                {
                    card : updatedCard
                }
            )


        }

        var deleteCard = await UsersProduct.destroyOne(
            {
                and : [
                    {user_id : token.user_id},
                    {product_id : req.params.id}
                ]
            }
        )

        return res.json(
            {
                card : deleteCard
            }
        )

        }

        catch(err) {
            return res.json(
                {
                    error : "No product"
                }
            )
        }

    }

    
    

};

