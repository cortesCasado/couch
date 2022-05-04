import { useRouter } from "next/router";

export default function SearchForm() {
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        router.push(`/search?q=${event.target.q.value}`);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" id="q" name="q" placeholder="Consulta en formato Lucene" />
                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}