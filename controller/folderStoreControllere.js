const { folderStore_Schema } = require('../collection');

const createFolder = async (req, response) => {
    const { folderName, description } = req.body;

    let userId = req.user._id;

    const folderStore = new folderStore_Schema({ userId, folderName, description });
    await folderStore.save();
    return response.status(200).send({ success: true, result: folderStore });
}

const getMyFolders = async (req, response) => {
    try {
        const userId = req?.user?._id;

        let allPost = await folderStore_Schema.find()


        let myFolders = allPost.filter(
            (item) => item?.userId?.toString() == userId?.toString()
        );

        if (myFolders.length > 0) {
            return response.status(200).send({
                success: true,
                result: myFolders,
            });
        } else {
            response.status(400).send({
                success: false,
                message: "No Folder found",
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