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

        // const ensDataModel = new EnsDataModel({
        //     node: 'test.eth',
        //     address: {
        //         "60": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        //         "0": "0xa914b48297bff5dadecc5f36145cec6a5f20d57c8f9b87"
        //     },
        //     text: { "email": "wildcard@example.com" },
        //     contenthash: "0xe301017012204edd2984eeaf3ddf50bac238ec95c5713fb40b5e428b508fdbe55d3b9f155ffe"
        // })

        // const res = await ensDataModel.save();
        // console.log(res);
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

const connect = mongoose.connection;

connect.once('open', async () => {
    console.log('mongodb connected --- ---');
    // const datas = await EnsDataModel.find({})
    // console.log(datas);
    // await EnsDataModel.updateOne({ text: { email: 'wildcard@example.com' } }, { $set: { node: "*.test.eth" } })
    const res = await EnsDataModel.find({ node: 'ethpaymaster.eth' }, 'address')
    console.log(res);

});

connect.on('error', (error) => {
    console.log('mongodb error --- ---', error);
})

dbConnect();
