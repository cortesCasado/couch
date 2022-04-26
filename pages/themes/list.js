import Link from "next/link";
import useSWR from "swr";


export default function List() {
    const { data, error } = useSWR(`/api/themes/`);

    if (error) return <div> failed to load </div>
    if (!data) return <div> loading... </div>

    return (
        <div>
            <ul className="list">
                {data.map(theme => (
                    <li key={theme._id}>
                        <Link href="/themes/[id]" as={`/themes/${theme._id}`}>
                            <a>{theme.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}