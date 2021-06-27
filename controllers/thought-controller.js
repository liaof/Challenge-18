const { User, Thought} = require('../models');

const thoughtController = {
    getAllThought( req,res ){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },
    getThoughtById({ params }, res) {     
        Thought.findOne({ _id: params.thoughtId })
            .populate({ path: 'reactions'})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: _id }},
              { new: true }
            );
          })
          .then(dbThoughtData => {
            console.log(dbThoughtData);
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No user found' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body} },
          { new: true }
        )
          .then(dbThoughtData => {
            console.log(body.reactionBody);
            console.log(dbThoughtData.reactions);
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },
    deleteThought({ params, body }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedComment => {
            if (!deletedComment) {
              return res.status(404).json({ message: 'No thought found' });
            }
            return User.findOneAndUpdate(// remove deleted thought from user's subarray
              { _id: body.userId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No user found' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { _id: params.reactionId } } },
          { new: true }
        )
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));

          
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, { thoughtText: body.thoughtBody })
          .then(dbThoughtData => {
            console.log(body.thoughtText);
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought found' });
            }
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No user found' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    }
};

module.exports = thoughtController;