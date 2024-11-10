import { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
    content: string;
    create_at: number;
}

export default function DeletePost(){

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [errorServer,setErrorServer] = useState("");

    const handleDeletePost = async (bejegyzesId: string) =>{
        let answer = confirm("Bitrosan törölni akarod-e a készletből a telefont?")
        console.log(bejegyzesId)
        if(answer)
        {
        try{
            const response = await fetch('http://localhost:3000/bejegyzesek/' + bejegyzesId, {
                method: "DELETE"
            
            })
          
            if(!response.ok)
            {
                setErrorServer("Resource not found (404)")
            }
            setPosts(posts.filter((p)=> p.id !== parseInt(bejegyzesId)  ))
        }
        catch(err){
            alert("Hiba" + err)
        }
    }
    }
    
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


    


    return <>
        <div>
            <h2>Bejegyzesek</h2>
            <a href="/bejegyzesek">Vissza a listához</a><br />
            <a href="/bejegyzesfelvetele">Új post felvétele</a><br />
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {post.title} - {post.content} - {post.create_at}
                        <span style={{cursor: "pointer", marginLeft: "5px"}}  onClick = {()=> handleDeletePost(post.id.toString())} >Törlés</span>
                       
                    </li>
                ))}
            </ul>
        </div>
    </>
}