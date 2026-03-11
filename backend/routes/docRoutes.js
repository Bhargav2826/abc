const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
    uploadText, 
    uploadPdf, 
    getDocuments, 
    getDocumentById, 
    deleteDocument 
} = require('../controllers/docController');
const { protect } = require('../middleware/auth');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.use(protect);

router.post('/upload-text', uploadText);
router.post('/upload-pdf', upload.single('pdf'), uploadPdf);
router.get('/', getDocuments);
router.get('/:id', getDocumentById);
router.delete('/:id', deleteDocument);

module.exports = router;
