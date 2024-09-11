import mongoose, {Schema, model, models} from 'mongoose';




const UserSchema = new Schema({
    userId: {
        type:String,
        unique: [true, 'Id already exists!'],
        required: [true, 'Id is required!']
    }, 
    username: {
        type:String,
        required: [true, 'username is required!'],
    },
    refCode: {
        type:String,
        default: 'no',
    },
    point:{
        type:Number,
    },
    energy: {
        type:Number,
        default: 2000,
    },
    timestamp: {
        type:Date,
        default:Date.now()
    },
    availableTurbo: {
        type:Number,
        default: 3,
    },
    availableEnergyRefill: {
        type:Number,
        default: 3,
    },
    multitapLevel: {
        type:String,
        default: '1',
    },
    energyLimitLevel: {
        type:String,
        default: '1',
    },
    RechargingSpeedLevel: {
        type:String,
        default: '3',
    },
    gameLevel: {
        type:String,
        default: '1',
    },
    exchange: {
        type:String,
        default: '',
    },
    referals: [
        {
            userid:{
                type: String, 
                ref: 'User'
            },
            username: {
                type:String
            },
            point: {
                type:Number,
                default: 0,
            },
        },
    ],

});


const User = models.User || model("User", UserSchema);

export default User;