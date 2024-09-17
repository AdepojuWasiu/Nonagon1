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
    },
    point:{
        type:Number,
    },
    lastPointsUpdatedTime: {
        type: Date,
    },
    energy: {
        type:Number,
    },
    lastEnergyUpdatedTime: {
        type: Date,
    },
    tapValue: {
        type: Number,
    },
    energyLimit: {
        type: Number,
    },
    energyIncrease: {
        type: Number,
    },
    timestamp: {
        type:Date,
    },
    availableTurbo: {
        type:Number,
    },
    availableEnergyRefill: {
        type:Number,
    },
    multitapLevel: {
        type:Number
    },
    energyLimitLevel: {
        type:Number,
    },
    RechargingSpeedLevel: {
        type: Number,

    },
    gameLevel: {
        type:Number,
    },
    exchange: {
        type:String,
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
                type:Number
            },
            gameLevel: {
                type:Number,
            },
        },
    ],

});


const User = models.User || model("User", UserSchema);

export default User;