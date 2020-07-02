module.exports = {
    post: (req, res) =>{
        const sess = req.session;
        if (sess.username){
            res.session.destroy(err=>{
                if(err){
                    console.log(err);
                } else {
                    res.redirect('/')
                }
            })
        } else {
            res.redirect('/')
        }
    }
};