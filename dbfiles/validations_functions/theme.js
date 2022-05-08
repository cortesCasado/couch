// Minified function
(newDoc, oldDoc, userCtx, secObj) => { function n(e, i) { if (i = i || 'Document must have a ' + e, !newDoc[e]) throw { forbidden: i } } if ('theme' === newDoc.type) { if (n('title'), n('description'), !newDoc.description) throw { forbidden: 'Theme must have a description' }; if ('string' != typeof newDoc.title) throw { forbidden: 'Title must be a string' }; if (newDoc.title.length > 40) throw { forbidden: 'Title must be under 40 characters' }; if ('string' != typeof newDoc.description) throw { forbidden: 'Description must be a string' }; if (newDoc.description.length > 150) throw { forbidden: 'Description must be under 150 characters' } } }

// Basic function
function validateTheme(newDoc, oldDoc, userCtx, secObj) {
    function require(field, message) {
        message = message || 'Document must have a ' + field;
        if (!newDoc[field]) throw ({ forbidden: message });
    };

    if (newDoc.type === 'theme') {
        require('title');
        require('description');

        if (!newDoc.description) {
            throw ({ forbidden: 'Theme must have a description' });
        }

        if (typeof newDoc.title !== 'string') {
            throw ({ forbidden: 'Title must be a string' })
        }

        if (newDoc.title.length > 40) {
            throw ({ forbidden: 'Title must be under 40 characters' })
        }

        if (typeof newDoc.description !== 'string') {
            throw ({ forbidden: 'Description must be a string' })
        }

        if (newDoc.description.length > 150) {
            throw ({ forbidden: 'Description must be under 150 characters' })
        }
    }
}