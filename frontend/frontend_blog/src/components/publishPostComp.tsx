import { useState } from "react";

export default function PublishPost() {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [create_at, setCreate_at] = useState<number>();
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const newPhone = {
            title: title,
            content: content,
            create_at: create_at
        }
        try {
            const response = await fetch('http://localhost:3000/bejegyzesek', {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPhone)
            })
            if (!response.ok){
                const errorData = await response.json();
                setError(errorData.error)
                throw new Error(`Hiba történt: ${response.status}`)
            }

            setSuccess(true);
            setTitle(''); setContent(''); 
        } catch (err: any) {
            setError(err.message)
        } finally {

        }
    }
    return <>
        <h2>Telefon felvétel</h2>
        <a href="/bejegyzesek">Vissza a listához</a><br />
        <a href="/bejegyzesfelvetele">Új bejegyzes felvétele</a><br />
        <a href="/bejegyzestorles">Bejegyzés törlése</a><br />
        <form onSubmit={handleSubmit}>
            <label>
                <p>Brand:</p>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {title}
            </label>
            <label>
                <p>Model:</p>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {content}
            </label>
            
            <button type="submit">Bejegyués felvétele</button>
            { error && <p>{ error }</p> }
            { success && <p>Sikeresen megtörtént a bejegyzés felvétele.</p> }
        </form>
    </>
}