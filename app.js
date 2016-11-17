
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/exampleDb", (err, db) => {
  if(err) { return console.dir(err); }

  let collection = db.collection('test');
  const doc = {mykey:1, fieldtoupdate:1};

  collection.insert(doc, {w:1},(err, result) => {
    collection.update({mykey:1}, {$set:{fieldtoupdate:2}}, {w:1},(err, result)=> {
      let stream = collection.find({mykey:{$ne:2}}).stream();
      stream.on("data", function(item) {console.log(item);});
      stream.on("end", function() {
        console.log("done streaming")
        collection.remove({mykey:1}, (err, result) => console.log("removed the thing!"))
      });
    })
  })
})
