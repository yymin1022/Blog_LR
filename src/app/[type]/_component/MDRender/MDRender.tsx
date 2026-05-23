import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MDRenderProps {
    content: string;
    postURL: string;
    postType: string;
}

const MDRender: React.FC<MDRenderProps> = ({ content, postURL, postType }) => {
    const components = {
        // Headings
        h1: ({ children, ...props }: any) => (
            <h1 className="text-[26px] min-[1400px]:text-[32px] font-black text-primary-blog_blue mt-[40px] mb-[20px] pb-[10px] border-b border-primary-blog_lightgray_3 text-left w-full max-w-[800px] mx-auto leading-tight font-nanum-b" {...props}>
                {children}
            </h1>
        ),
        h2: ({ children, ...props }: any) => (
            <h2 className="text-[22px] min-[1400px]:text-[28px] font-black text-[#1F2937] mt-[30px] mb-[15px] text-left w-full max-w-[800px] mx-auto leading-snug font-nanum-b" {...props}>
                {children}
            </h2>
        ),
        h3: ({ children, ...props }: any) => (
            <h3 className="text-[18px] min-[1400px]:text-[22px] font-black text-[#374151] mt-[25px] mb-[12px] text-left w-full max-w-[800px] mx-auto leading-snug font-nanum-b" {...props}>
                {children}
            </h3>
        ),
        h4: ({ children, ...props }: any) => (
            <h4 className="text-[16px] min-[1400px]:text-[18px] font-black text-[#4B5563] mt-[20px] mb-[10px] text-left w-full max-w-[800px] mx-auto font-nanum-b" {...props}>
                {children}
            </h4>
        ),
        h5: ({ children, ...props }: any) => (
            <h5 className="text-[15px] font-black text-[#6B7280] mt-[15px] mb-[8px] text-left w-full max-w-[800px] mx-auto font-nanum-b" {...props}>
                {children}
            </h5>
        ),
        h6: ({ children, ...props }: any) => (
            <h6 className="text-[14px] font-black text-[#9CA3AF] mt-[15px] mb-[8px] text-left w-full max-w-[800px] mx-auto font-nanum-b" {...props}>
                {children}
            </h6>
        ),

        // Paragraph
        p: ({ children, ...props }: any) => (
            <div className="my-[15px] leading-[28px] text-primary-blog_black text-[16px] font-nanum-r text-justify max-w-[800px] mx-auto break-words" {...props}>
                {children}
            </div>
        ),

        // Blockquote
        blockquote: ({ children, ...props }: any) => (
            <blockquote className="border-l-4 border-primary-blog_blue bg-[#F3F4F6] text-[#4B5563] pl-[20px] pr-[10px] py-[12px] my-[20px] max-w-[800px] mx-auto rounded-r-[6px] italic text-left" {...props}>
                {children}
            </blockquote>
        ),

        // Lists
        ul: ({ children, ...props }: any) => (
            <ul className="mx-auto text-left w-full max-w-[800px] list-disc pl-[25px] my-[15px] space-y-[8px] font-nanum-r text-[16px] text-primary-blog_black" {...props}>
                {children}
            </ul>
        ),
        ol: ({ children, ...props }: any) => (
            <ol className="mx-auto text-left w-full max-w-[800px] list-decimal pl-[25px] my-[15px] space-y-[8px] font-nanum-r text-[16px] text-primary-blog_black" {...props}>
                {children}
            </ol>
        ),
        li: ({ children, ...props }: any) => (
            <li className="leading-[26px]" {...props}>
                {children}
            </li>
        ),

        // Table
        table: ({ children, ...props }: any) => (
            <div className="w-full max-w-[800px] mx-auto my-[25px] overflow-x-auto rounded-[8px] border border-primary-blog_lightgray_3">
                <table className="w-full border-collapse text-[15px] text-left" {...props}>
                    {children}
                </table>
            </div>
        ),
        thead: ({ children, ...props }: any) => (
            <thead className="bg-[#F3F4F6] text-primary-blog_black font-bold border-b border-primary-blog_lightgray_3 font-nanum-b" {...props}>
                {children}
            </thead>
        ),
        tbody: ({ children, ...props }: any) => (
            <tbody className="bg-primary-blog_white divide-y divide-[#E5E7EB] font-nanum-r" {...props}>
                {children}
            </tbody>
        ),
        tr: ({ children, ...props }: any) => (
            <tr className="hover:bg-[#F9FAFB] transition-colors" {...props}>
                {children}
            </tr>
        ),
        th: ({ children, ...props }: any) => (
            <th className="px-[16px] py-[12px] font-bold border-r border-[#E5E7EB] last:border-r-0" {...props}>
                {children}
            </th>
        ),
        td: ({ children, ...props }: any) => (
            <td className="px-[16px] py-[12px] border-r border-[#E5E7EB] last:border-r-0" {...props}>
                {children}
            </td>
        ),

        // Code / Codeblocks
        code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            const inline = !match;
            return !inline ? (
                <div className="w-full max-w-[800px] mx-auto my-[15px] text-left rounded-[8px] overflow-hidden text-[14px]">
                    <SyntaxHighlighter
                        style={darcula}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                    >
                        {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                </div>
            ) : (
                <code
                    className="bg-[#F3F4F6] text-[#E01E5A] px-[6px] py-[3px] rounded-[4px] font-mono text-[14px] border border-[#E5E7EB] break-words"
                    {...props}
                >
                    {children}
                </code>
            );
        },

        // Links
        a: ({ children, href, ...props }: any) => {
            if (postType !== "about") {
                return (
                    <a target="_blank" href={href} rel="noopener noreferrer" className="block my-[15px]" {...props}>
                        <span className="h-[100px] w-full max-w-[450px] mx-auto flex flex-col items-center justify-center border border-[#EEEEEE] rounded-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-shadow duration-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] px-[15px] block">
                            <span className="text-primary-blog_blue text-[17px] font-black m-0 max-w-[90%] overflow-hidden no-underline whitespace-nowrap text-ellipsis block font-nanum-b">
                                {children}
                            </span>
                            <span className="text-[#777777] text-[15px] font-medium m-0 mt-[5px] max-w-[90%] overflow-hidden no-underline whitespace-nowrap text-ellipsis block font-nanum-r">
                                {href}
                            </span>
                        </span>
                    </a>
                );
            } else {
                return (
                    <a
                        target="_blank"
                        href={href}
                        rel="noopener noreferrer"
                        className="text-primary-blog_blue font-black no-underline transition-colors duration-300 hover:text-[#0b2b5e] hover:underline font-nanum-b"
                        {...props}
                    >
                        {children}
                    </a>
                );
            }
        },

        // Images
        img: ({ src, width, ...props }: any) => {
            const imageSrc = `/api/getPostImage?postType=${postType}&postID=${postURL}&srcID=${src}`;
            return (
                <div className="flex justify-center my-[20px]">
                    <img
                        src={imageSrc}
                        width={width}
                        alt="Post Image"
                        className="max-w-full h-auto rounded-[8px] shadow-sm"
                        {...props}
                    />
                </div>
            );
        },

        // HR
        hr: ({ ...props }: any) => (
            <hr className="w-full max-w-[800px] border-0 bg-primary-blog_lightgray_3 h-[1px] my-[30px] mx-auto" {...props} />
        ),

        // Bold
        strong: ({ children, ...props }: any) => (
            <strong className="text-primary-blog_blue font-black font-nanum-b" {...props}>
                {children}
            </strong>
        ),

        // Italic
        em: ({ children, ...props }: any) => (
            <em className="italic text-primary-blog_gray font-nanum-r" {...props}>
                {children}
            </em>
        ),

        // Deleted text
        del: ({ children, ...props }: any) => (
            <del className="line-through text-primary-blog_lightgray_1 font-nanum-r" {...props}>
                {children}
            </del>
        )
    };

    return (
        <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={components}
        >
            {content}
        </ReactMarkdown>
    );
};

export default MDRender;
