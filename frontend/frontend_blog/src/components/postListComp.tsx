import { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
    content: string;
    create_at: number;
}

export default function PostList(){

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [errorServer,setErrorServer] = useState("");
    
    useEffect(() => {

        fetch('http://localhost:3000/bejegyzesek')
            .then((response) => {
                if (response.status === 404) {
                    setErrorServer("Resource not found (404)")
                    //throw new Error('Resource not found (404)');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`)
                    //throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);


    if(errorServer)
    {
        return <p>Hiba történt a szerver oldalon, keresd a rendszergazdát!</p>
    }


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


    return <>
        <div>
            <h2>Posts</h2>
            <a href="/bejegyzesfelvetele">Új post felvétele</a><br />
            <a href="/bejegyzestorles">Post törlése</a>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {post.title} - {post.content} - {post.create_at} Ft
                        <a href={`/bejegyzesek/${post.id}`} style={{marginLeft: "5px", cursor:"pointer"}}>Reszletek</a>
                    </li>
                ))}
            </ul>
        </div>
    </>
}