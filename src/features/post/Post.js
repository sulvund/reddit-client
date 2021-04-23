import { useParams } from 'react-router-dom';

export const Post = () => {
    let { r, subreddit, type, id, title_id } = useParams();

    return (
        <>
        <p>{r}</p>
        <p>{subreddit}</p>
        <p>{type}</p>
        <p>{id}</p>
        </>
    )
}