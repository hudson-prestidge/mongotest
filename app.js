
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(err) { return console.dir(err); }

  var collection = db.collection('test');
  var doc = {mykey:1, fieldtoupdate:1};

  collection.insert(doc, {w:1},(err, result) => {
    collection.update({mykey:1}, {$set:{fieldtoupdate:2}}, {w:1},(err, result)=> {
      collection.remove({mykey:1}, (err, result) => console.log("removed the thing!"))
     })
   })
})
