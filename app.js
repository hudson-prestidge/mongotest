
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/exampleDb", (err, db) => {
  if(err) { return console.dir(err); }

  let collection = db.collection('test');
  const doc = {mykey:1, fieldtoupdate:1};

  collection.insert(doc, {w:1},(err, result) => {
    console.log("added the thing!");

    collection.update({mykey:1}, {$set:{fieldtoupdate:2}}, {w:1},(err, result)=> {
      console.log("updated the thing!");
      collection.insert({mykey: 2, fieldtoupdate: 4})
      collection.insert({mykey: 3, fieldtoupdate: 6})
      collection.insert({mykey: 4, fieldtoupdate: 8})
      let stream = collection.find({mykey:{$ne:2}}).stream();
      stream.on("data", function(item) {console.log(item);});
      stream.on("end", function() {
        console.log("done streaming")
        collection.remove({mykey:1}, (err, result) => console.log("removed the thing!"))
      });
    })
  })
})
