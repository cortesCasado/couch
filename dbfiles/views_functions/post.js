// Posts by date

// Minified function
t => { 'post' === t.type && emit(t.publication_date, { title: t.title, username: t.username }) };

// Basic function
const by_date = doc => {
    if ("post" === doc.type) {
        emit(doc.publication_date, {
            title: doc.title,
            username: doc.username,
        });
    }
}

// Posts by theme

// Minified function
t => { 'post' === t.type && emit(t.theme, { _id: t._id, title: t.title, publication_date: t.publication_date, username: t.username }) };

// Basic function
const by_theme = doc => {
    if ("post" === doc.type) {
        emit(doc.theme, {
            _id: doc._id,
            title: doc.title,
            publication_date: doc.publication_date,
            username: doc.username,
        });
    }
}