const Document = require('../models/Document');
const fs = require('fs');
const path = require('path');

// @desc    Upload text content
// @route   POST /api/docs/upload-text
const uploadText = async (req, res) => {
    const { title, textContent } = req.body;

    if (!title || !textContent) {
        return res.status(400).json({ message: 'Please provide title and content' });
    }

    try {
        const document = await Document.create({
            title,
            type: 'text',
            textContent,
            uploadedBy: req.user._id
        });

        res.status(201).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Upload PDF content
// @route   POST /api/docs/upload-pdf
const uploadPdf = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Please provide a title' });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    try {
        const document = await Document.create({
            title,
            type: 'pdf',
            fileUrl: `/uploads/${req.file.filename}`,
            uploadedBy: req.user._id
        });

        res.status(201).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all user documents
// @route   GET /api/docs
const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ uploadedBy: req.user._id }).sort({ createdAt: -1 });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get document by ID
// @route   GET /api/docs/:id
const getDocumentById = async (req, res) => {
    try {
        const document = await Document.findOne({ _id: req.params.id, uploadedBy: req.user._id });

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete document
// @route   DELETE /api/docs/:id
const deleteDocument = async (req, res) => {
    try {
        const document = await Document.findOne({ _id: req.params.id, uploadedBy: req.user._id });

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // If it's a PDF, delete the file from storage
        if (document.type === 'pdf' && document.fileUrl) {
            const filePath = path.join(__dirname, '..', document.fileUrl);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Document.deleteOne({ _id: req.params.id });

        res.json({ message: 'Document removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadText,
    uploadPdf,
    getDocuments,
    getDocumentById,
    deleteDocument
};
