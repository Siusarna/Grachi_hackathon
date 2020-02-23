const adv_rate = require('../../controllers/api/crup_adviser&rate/index');
module.exports = (app) => {
    app.post('/api/advise/create', adv_rate.Create_Adv);
    app.post('/api/advise/read', adv_rate.Read_Adv);
    app.post('/api/rate/init', adv_rate.init_rate);
    app.post('/api/rate/update', adv_rate.update_rate);
    app.post('/api/rate/check', adv_rate.check_rate);
    app.post('/api/rate/show_one', adv_rate.show_rate);
    app.post('/api/rate/show_all', adv_rate.show_rates);
}