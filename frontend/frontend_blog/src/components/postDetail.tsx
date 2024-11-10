import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Post {
    id: number;
    title: string;
    content: string;
    create_at: number;
}

export default function PostDetail() {

    const [posts, setPosts] = useState<Post>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [errorServer, setErrorServer] = useState("");
    const { bejegyzesId } = useParams<{ bejegyzesId: string }>()

    useEffect(() => {

        fetch(`http://localhost:3000/bejegyzesek/${bejegyzesId}`)
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
                console.log(data)
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);


    if (errorServer) {
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
        
            <a href="/bejegyzesek">Vissza a listához</a><br />
        <a href="/bejegyzesfelvetele">Új bejegyzes felvétele</a><br />
        <a href="/bejegyzestorles">Bejegyzés törlése</a><br />
            {posts ? (
                <div>
                    <h2>{posts.title}:</h2>
                     {posts.content} - {posts.create_at} 
                </div>
            ) : (
                <p>No post data avaiable</p>
            )}
        </div>
    </>
}