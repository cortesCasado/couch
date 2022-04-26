export default function CreatePost() {
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            publication_date: new Date().toISOString(),
            type: "post",
            theme: event.target.theme.value,
            username: event.target.username.value,
            title: event.target.title.value,
            body: event.target.body.value,
            likes: 0,
            comments: [],
        }


        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/post/'

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)

        const result = await response.json()
        alert(`${result.message}`)
    }
    return (
        // We pass the event to the handleSubmit() function on submit.
        <form onSubmit={handleSubmit}>
            <label htmlFor="theme">Temática</label>
            <input type="text" id="theme" name="theme" required />

            <label htmlFor="username">Nickname</label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="title">Título</label>
            <input type="text" id="title" name="title" required />

            <label htmlFor="body">Cuerpo</label>
            <input type="text" id="body" name="body" required />

            <button type="submit">Publicar</button>
        </form>
    )
}