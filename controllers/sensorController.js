module.exports = function (app) {

    
    app.get('/', function(req, res){
        //index route
        res.render('index');
    });
    

}