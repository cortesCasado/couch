// Minified function
(e, t, n, r) => { function i(t, n) { if (n = n || 'Document must have a ' + t, !e[t]) throw { forbidden: n } } if ('post' === e.type) { if (i('title'), i('theme'), i('body'), i('publication_date'), i('username'), i('comments'), 'string' != typeof e.title) throw { forbidden: 'Title must be a string' }; if (e.title.length > 40) throw { forbidden: 'Title must be under 40 characters' }; if ('string' != typeof e.theme) throw { forbidden: 'Theme must be a string' }; if ('string' != typeof e.body) throw { forbidden: 'Body must be a string' }; if (e.body.length > 500) throw { forbidden: 'Body must be under 500 characters' }; if ('string' != typeof e.username) throw { forbidden: 'Username must be a string' }; if (e.username.length > 40) throw { forbidden: 'Username must be under 40 characters' }; if ('string' != typeof e.publication_date && isNaN(new Date(e.publication_date)) || !0 !== /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(e.publication_date)) throw { forbidden: 'Publication date must be a date representative string in ISO format' }; if (!Array.isArray(e.comments)) throw { forbidden: 'Comments must be an array' }; for (let t of e.comments) { if (!t.username) throw { forbidden: 'All comments must have username' }; if (!t.publication_date) throw { forbidden: 'All comments must have publication date' }; if (!t.comment) throw { forbidden: 'All comments must have an text' }; if ('string' != typeof t.username) throw { forbidden: 'Username for a comment must be a string' }; if (t.username.length > 40) throw { forbidden: 'Username for a comment must be under 40 characters' }; if ('string' != typeof t.comment) throw { forbidden: 'All comments must be strings' }; if (t.comment.length > 500) throw { forbidden: 'All comments must be under 500 characters' }; if ('string' != typeof t.publication_date && isNaN(new Date(t.publication_date)) || !0 !== /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(t.publication_date)) throw { forbidden: 'Publication date of comments must be a date representative string in ISO format' } } } }

// Basic function
function validatePost(newDoc, oldDoc, userCtx, secObj) {
    function require(field, message) {
        message = message || 'Document must have a ' + field;
        if (!newDoc[field]) throw ({ forbidden: message });
    };

    if (newDoc.type === 'post') {
        require('title');
        require('theme');
        require('body');
        require('publication_date');
        require('username');
        require('comments')

        if (typeof newDoc.title !== 'string') {
            throw ({ forbidden: 'Title must be a string' })
        }

        if (newDoc.title.length > 40) {
            throw ({ forbidden: 'Title must be under 40 characters' })
        }

        if (typeof newDoc.theme !== 'string') {
            throw ({ forbidden: 'Theme must be a string' })
        }

        if (typeof newDoc.body !== 'string') {
            throw ({ forbidden: 'Body must be a string' })
        }

        if (newDoc.body.length > 500) {
            throw ({ forbidden: 'Body must be under 500 characters' })
        }

        if (typeof newDoc.username !== 'string') {
            throw ({ forbidden: 'Username must be a string' })
        }

        if (newDoc.username.length > 40) {
            throw ({ forbidden: 'Username must be under 40 characters' })
        }

        if ((typeof newDoc.publication_date !== 'string' && isNaN(new Date(newDoc.publication_date)) || /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(newDoc.publication_date) !== true)) {
            throw ({ forbidden: 'Publication date must be a date representative string in ISO format' })
        }

        if (!Array.isArray(newDoc.comments)) {
            throw ({ forbidden: 'Comments must be an array' })
        }

        for (let comment of newDoc.comments) {

            if (!comment['username']) {
                throw ({ forbidden: 'All comments must have username' })
            }

            if (!comment['publication_date']) {
                throw ({ forbidden: 'All comments must have publication date' })
            }

            if (!comment['comment']) {
                throw ({ forbidden: 'All comments must have an text' })
            }

            if (typeof comment.username !== 'string') {
                throw ({ forbidden: 'Username for a comment must be a string' })
            }

            if (comment.username.length > 40) {
                throw ({ forbidden: 'Username for a comment must be under 40 characters' })
            }

            if (typeof comment.comment !== 'string') {
                throw ({ forbidden: 'All comments must be strings' })
            }

            if (comment.comment.length > 500) {
                throw ({ forbidden: 'All comments must be under 500 characters' })
            }

            if ((typeof comment.publication_date !== 'string' && isNaN(new Date(comment.publication_date)) || /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(comment.publication_date) !== true)) {
                throw ({ forbidden: 'Publication date of comments must be a date representative string in ISO format' })
            }
        }
    }
}