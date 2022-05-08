// Update comments

//Minified function 
(t, e) => { return 'post' === t.type ? (t.comments.push(JSON.parse(e.body)), [t, 'Post updated']) : [null, 'Nothing updated'] };

// Basic function
function updateComments(doc, req) {
    if (doc['type'] === 'post') {
        doc['comments'].push(JSON.parse(req.body));
        return [doc, 'Post updated'];
    }
    return [null, 'Nothing updated'];
}