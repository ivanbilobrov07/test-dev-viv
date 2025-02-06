import { Navigate, useParams } from "react-router-dom";
import { TreeDetails } from "../components";

const TreeDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <Navigate to={'/'}/>
    }

    const treeId = parseInt(id, 10);

    if (isNaN(treeId)) {
        return <Navigate to={'/'}/>
    }

    return <TreeDetails treeId={treeId} />
}

export default TreeDetailsPage