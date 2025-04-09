const { folderStore_Schema } = require('../collection');

const createFolder = async (req, response) => {
    const { folderName, description } = req.body;

    let userId = req.user._id;

    const passwordStore = new folderStore_Schema({ userId, folderName, description });
    await passwordStore.save();
    return response.status(200).send({ success: true, result: passwordStore });
}

const getMyFolders = async (req, response) => {
    try {
        const userId = req?.user?._id;

        let allPost = await folderStore_Schema.find()


        let myFolders = allPost.filter(
            (item) => item?.userId?.toString() == userId?.toString()
        );

        console.log(myFolders);


        if (myFolders.length > 0) {
            return response.status(200).send({
                success: true,
                result: myFolders,
            });
        } else {
            response.status(400).send({
                success: false,
                message: "No post found",
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error?.message,
        });
    }
}

module.exports = {
    createFolder,
    getMyFolders,
};