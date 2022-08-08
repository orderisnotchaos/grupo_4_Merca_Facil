const express = require ('express');

const router = express.Router();
const adminController = require ('../controllers/adminController');

router.get ('/dashboardUsers', adminController.dashboardUsers);
router.get ('/editUser', adminController.editUser);
router.get ('/panel', adminController.panel);

module.exports = router;