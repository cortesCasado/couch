function noName(doc,req) {
  if (doc['type'] === 'post') {
    doc['comments'].push(JSON.parse(req.body));
    return [doc, 'Post updated'];
  }
  return [null, 'Nothing updated']; 
}