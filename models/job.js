const mongoose = require("mongoose");
const slugify = require("slugify");
// const marked = require("marked");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        default: "Terrasol Geranium Cuttings",
    },
    location: {
        type: String,
        default: "Nairobi,Kenya",
    },
    type: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
});

jobSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        });
    }
    next()
});

module.exports = mongoose.model("Job", jobSchema);