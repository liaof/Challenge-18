 const { Schema, model } = require('mongoose');

 const ThoughtSchema = new Schema(
     {
         thoughtText: {
             type: String,
             required: true,
             minLength: 1,
             maxLength: 180
         },
         createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
         },
         username: {
             type: String,
             required: true
         },
         reactions: [ReactionSchema]
     },
 )

const ReactionSchema = new Schema(
     {
         reactionID: {

         },
         reactionBody: {

         },
         username: {

         },
         createdAt: {

         }
     }
)