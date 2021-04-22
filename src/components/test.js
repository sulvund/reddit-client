import { useParams } from 'react-router-dom';

export const Test = () => {
    let { id } = useParams();

    return (
        <p>{id}</p>
    )
}