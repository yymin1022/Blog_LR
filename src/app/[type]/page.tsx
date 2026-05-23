import React from "react";
import PostCard from "@/app/[type]/_component/PostCard/PostCard";
import { getFBPostList, PostData } from "@/utils/FirebaseUtil";
import { redirect } from "next/navigation";

export default async function PostListPage({
    params,
}: {
    params: Promise<{ type: string }>;
}) {
    const { type } = await params;
    if (type === "about") {
        redirect("/about/Useful");
    }
    const result = await getFBPostList(type);
    const postList: PostData[] = result.RESULT_CODE === 200 ? result.RESULT_DATA.PostList : [];

    const pinnedPosts = postList.filter((post) => post.postIsPinned);
    const unpinnedPosts = postList.filter((post) => !post.postIsPinned);

    return (
        <div className="w-full max-w-[1000px] flex flex-col items-center mx-auto px-[20px] py-[30px] lg:my-[50px] animate-fade-in-up select-none">
            {/* Pinned Posts */}
            <div className="w-full flex flex-row flex-wrap justify-center min-[1400px]:justify-between">
                {pinnedPosts.map((post) => (
                    <PostCard key={post.postID} post={post} postType={type} />
                ))}
            </div>

            {/* Divider */}
            {pinnedPosts.length > 0 && unpinnedPosts.length > 0 && (
                <hr className="w-full min-[1400px]:w-[990px] border-0 bg-gradient-to-r from-transparent via-[#DDDDDD] to-transparent h-[1px] my-[20px]" />
            )}

            {/* Unpinned Posts */}
            <div className="w-full flex flex-row flex-wrap justify-center min-[1400px]:justify-between">
                {unpinnedPosts.map((post) => (
                    <PostCard key={post.postID} post={post} postType={type} />
                ))}
            </div>
        </div>
    );
}
