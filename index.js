
const ChangesStream = require("@npmcorp/changes-stream");
const fetch = require('node-fetch');

const changes = new ChangesStream({
  db: 'https://replicate.npmjs.com/registry',
  include_docs: true,
  since: 'now'
});

changes.on('data', async function(change) {
  if(change.doc.name){
    var url = `https://index.foragepm.com/packages/import?platform=Npm&name=${change.doc.name}&api_key=${process.env.IMPORT_API_KEY}`
    var res = await fetch(url, {method: 'POST'});
    console.log(change.doc.name, res.status)
  }
})

changes.on('error', function(error){
  console.error("Failed to connect to the changes feed")
})
