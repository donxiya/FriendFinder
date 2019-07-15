var friends = require("../data/friends");
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    var user = req.body;

    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    var bestFriendIndex = 0;
    var minDifference = 40;
// loop of friend list
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      // loop of friend attr
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }
      if(totalDifference < minDifference) {
        bestFriendIndex = i;
        minDifference = totalDifference;
      }
    }

    res.json(friends[bestFriendIndex]);
  });
};