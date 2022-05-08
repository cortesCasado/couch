// Search Index

// Minified function
t => { index('default', t._id), 'post' === t.type && (index('title', t.title, { store: !0 }), index('body', t.body, { store: !0 }), index('username', t.username, { store: !0 }), index('publication_date', t.publication_date, { store: !0 })) };

// Basic function
const searchIndex = doc => {
    index("default", t._id);
    if ("post" === doc.type) {
        index("title", t.title, { store: true });
        index("body", t.body);
        index("username", t.username, { store: true });
        index("publication_date", t.publication_date, { store: true });
    }
}