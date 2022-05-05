function noName(newDoc, oldDoc, userCtx, secObj) {
    function require(field, message) {
        message = message || 'Document must have a ' + field;
        if (!newDoc[field]) throw ({ forbidden: message });
    };

    if (newDoc.type === 'post') {
        require('title');
        require('body');
        require('publication_date');
        require('username');

        if (typeof newDoc.title !== 'string') {
            throw ({ forbidden: 'Title must be a string' })
        }

        if (newDoc.title.length > 40) {
            throw ({ forbidden: 'Title must be under 40 characters' })
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

        if (typeof newDoc.publication_date !== 'string' && isNaN(new Date(newDoc.publication_date))) {
            throw ({ forbidden: 'Publication date must be a date representative string' })
        }



    }
}