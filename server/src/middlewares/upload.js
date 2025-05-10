import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'src/public/images/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        if (!file.originalname) {
            return cb(new Error('File name is undefined'));
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

export const uploadImages = (fields = []) => {
    const uploader = fields.length ? upload.fields(fields.map(field => ({ name: field, maxCount: 1 }))) : upload.any();
    return (req, res, next) => {
        uploader(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    err: 1,
                    msg: 'File upload failed: ' + err.message
                });
            }
            //console.log('req.body before:', req.body);
            next();
        });
    };
};

export const attachImagePaths = (fields = []) => {
    return (req, res, next) => {
        if (!fields.length && req.files) {
            req.files.forEach(file => {
                req.body[file.fieldname] = `/images/${file.filename}`;
            });
        } else if (req.files) {
            fields.forEach(field => {
                if (req.files[field]) {
                    req.body[field] = `/images/${req.files[field][0].filename}`;
                }
            });
        }
        //console.log('req.body after:', req.body);
        next();
    };
};