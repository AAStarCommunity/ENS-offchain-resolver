import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EnsData = new Schema({
    node: String,
    address: {},
    text: {
        avatar: String,
        description: String,
        email: String,
        phone: String,
        url: String,
    },
    contenthash: String,
})

export const EnsDataModel = mongoose.model('EnsData', EnsData);

export const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/gateway');
        console.log('Connected to MongoDB');

    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}
