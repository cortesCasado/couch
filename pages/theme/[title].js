import { useRouter } from 'next/router'
import useSWR from "swr";
import ShortPost from "@/components/MainPage/ShortPost";

export default function Theme() {
    const router = useRouter();
    const { title } = router.query;

    const { data, error } = useSWR(`/api/theme/Noticias`);

    if (error) <div>{error.message}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>{data.key}</h1>

            {data.value.map((post) => (
                <ShortPost
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    username={post.username}
                    date={post.key}
                />
            ))}
        </div>
    );
};

