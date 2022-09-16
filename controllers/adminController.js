const res = require ('express/lib/response');
const path = require ('path');

const controladorAdmin = {

    dashboardUsers: (req, res) =>{
        res.render (path.join(__dirname,"../views/dashboardUsers.ejs"), {user:req.session.user});
    },

    editUser: (req, res) =>{
        res.render (path.join(__dirname,"../views/editUser.ejs"), {user:req.session.user});
    },

    panel: (req, res) =>{
        res.render (path.join(__dirname,"../views/panelAdmin.ejs"), {user:req.session.user});
    }

};

function dataUsers (){
    fetch('../data/users.json')
    .then ( res => respuesta.json())
    .then ( res => console.log(res))
}

module.exports = controladorAdmin;