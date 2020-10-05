/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
    //post
    async create(req,res){
        console.log("girdim");
        var date = new Date();
        var now = date.getTime();
        var product = await Product.create({
            name : req.body.name,
            qty : req.body.qty,
            createdAt : now,
            updatedAt : now
        }).fetch()

        console.log(product.createdAt);

        return res.json(
            {
                data : product
            }
        )
       
    },

    //get
    find(req,res){

        Product.find()
        .then((products) => {
            return res.json(
                {
                    data : products
                }
            )
        })

    },

    //delete
    async destroy(req,res){

        var product = await Product.destroy({
            id : req.params.id
        })
        .fetch()

        return res.json(
            {data : product}
        )

    },

    //update
    async update(req,res){

        date = new Date();
        now = date.getTime()
        name = req.body.name;
        qty = req.body.qty;

        if (name && qty){
            var updatedProduct = await Product.updateOne({id : req.params.id})
            .set({
                name : name,
                qty : qty,
                updatedAt : now
            })
        

            if (updatedProduct) {
                return res.json({
                    data : updatedProduct
                })
              }
              else {
                return res.json(
                    {
                        error : "guncelleme basarisiz"
                    }
                )
              }

        }

        return res.json(
            {
                error : 'Eksik data'
            }
        )


       


    },

    getProduct(req,res)
    {
        Product.find({id : req.params.id})
        .then((product) => {
            return res.json(
                {
                    data : product
                }
            )
        })
    }

};