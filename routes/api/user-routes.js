const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router.route('/')
        .get(getAllUser)
        .post(addUser);

router.route('/:userId')
        .get(getUserById)
        .put(updateUser)
        .delete(deleteUser);

router.route('/:userId/friends/:friendId')
        .post(addFriend)
        .delete(deleteFriend);




// get all 
// get by _id, plus thought and friend data
// post new user
// put to update by _id
// delete by _id




module.exports = router;