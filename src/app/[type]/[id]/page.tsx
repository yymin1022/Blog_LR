export default function PostList(
    { params }: { params: { type: string, id: string } }
) {
    return (
        <div>
            {
                `${params.type} ${params.id} PostView Page`
            }
        </div>
    );
}
