(t, e) => 'theme' === t.type ? (t.postsCount++, [t, 'Post number updated']) : [null, 'Post number not updated'];