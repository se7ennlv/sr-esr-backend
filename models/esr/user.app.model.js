const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    app: {
        name: { type: String },
        icon: { type: String },
        routerLink: { type: String }
    },
    created_at: { type: Date, default: Date.now }
}, {
    timestamps: false,
    collection: 'esr_user_apps'
});

const app = mongoose.model('UserApp', schema);

module.exports = app;

