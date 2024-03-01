export default function PostList(
    { params }: { params: { type: string } }
) {
    return (
        <div>
            {
                `${params.type} PostList Page`
            }
        </div>
    );
}
