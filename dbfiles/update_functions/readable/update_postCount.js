(doc, req) => {
    if (doc.type === 'theme') {
        doc['postsCount']++;
        return [doc, 'Post number updated'];
    }
    return [null, 'Post number not updated'];
}