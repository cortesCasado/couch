import { useRouter } from "next/router";
import { Button } from "@/components/Button";
import { FieldTextBox } from "@/components/Forms";

export default function SearchForm() {
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const q = event.target.q.value;
        if (q.trim().length >= 2) {
            router.push(`/search?q=${q}`);
        }
    }

    return (
        <div className="opacity-85">
            <form onSubmit={handleSubmit}>
                <div className="flex w-[400px]">
                    {/* Search bar */}
                    <input type="text" name="Search" placeholder="Lucene query" className="bg-gray-50 opacity-90 appearance-none border-2 border-gray-200 rounded w-11/12 h-[40px] mt-2 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-bondi" id="q"></input>
                    {/* Search button */}
                    <Button type="submit">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </Button>
                </div>
            </form>
        </div>
    );
}


