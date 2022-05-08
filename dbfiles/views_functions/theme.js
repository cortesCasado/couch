// Posts number per theme

// Minified function
e => { "theme" === e.type ? emit(e.title, 0) : "post" === e.type && emit(e.theme, 1) };

// Basic function
const theme = doc => {
    if ("theme" === doc.type) emit(doc.title, 0);
    else if ("post" === doc.type) emit(doc.theme, 1);
}