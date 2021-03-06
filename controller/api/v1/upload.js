const upload = require("../../../middleware/upload");

const multipleUpload = async (req, res, next) => {
  try {
    await upload(req, res);
    // console.log(req.files);

    // if (req.files.length <= 0) {
    //   return res.send(`You must select at least 1 file.`);
    // }

    // return res.send(`Files has been uploaded.`);
    next()
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(422).json(
        {
          message: `Too many files to upload.`
        }
      );
    }
    return res.status(422).json(
      {
        message: `Error when trying upload many files: ${error}`
      }
    );
  }
};

module.exports = {
  multipleUpload: multipleUpload
};
