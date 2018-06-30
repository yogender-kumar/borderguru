module.exports =  app => {
    app.route('/orders').get((req, res) => {
        res.send('/orders route works fine');
    });
};