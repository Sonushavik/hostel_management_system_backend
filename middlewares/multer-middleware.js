const multer = require('multer')
const storage = multer.diskStorage({
        destination: function(req,file,cb){
                cb(null, './public/temp')
        },
        filename: function(req, file, cb){
                cb(null, file.originalname)
        }
})

const upload = multer({storage}).fields([
        { name: 'photo', maxCount: 1 }, 
        { name: 'idProof', maxCount: 1 }, 
        { name: 'signature', maxCount: 1 },
        { name: 'cast', maxCount: 1 }, 
        { name: 'matriculationMarksheet', maxCount: 1 }, 
        { name: 'intermediateMarksheet', maxCount: 1 }, 
        { name: 'graduationMarksheet', maxCount: 1 }, 
        { name: 'extraCertificate1', maxCount: 1 }, 
        { name: 'extraCertificate2', maxCount: 1 },
        { name: 'extraCertificate3', maxCount: 1 },
])
module.exports = upload;