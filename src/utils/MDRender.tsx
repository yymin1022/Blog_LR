import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MDRendererComponents {
    a: React.FC<any>;
    code: React.FC<any>;
    img: React.FC<any>;
    strong: React.FC<any>;
    ul: React.FC<any>;
    p: React.FC<any>;
}

const MDRenderer = (postURL: string, postType: string): Partial<MDRendererComponents> => {
    return {
        a: ({ children, href, ...props }: any) => {
            if (postType !== "about") {
                return (
                    <a target="_blank" href={href} rel="noopener noreferrer" className="block my-[15px]" {...props}>
                        <div className="h-[100px] w-full max-w-[450px] mx-auto flex flex-col items-center justify-center border border-[#EEEEEE] rounded-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-shadow duration-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] px-[15px]">
                            <p className="text-primary-blog_blue text-[17px] font-black m-0 max-w-[90%] overflow-hidden no-underline whitespace-nowrap text-ellipsis">
                                {children}
                            </p>
                            <p className="text-[#777777] text-[15px] font-medium m-0 mt-[5px] max-w-[90%] overflow-hidden no-underline whitespace-nowrap text-ellipsis">
                                {href}
                            </p>
                        </div>
                    </a>
                );
            } else {
                return (
                    <a
                        target="_blank"
                        href={href}
                        rel="noopener noreferrer"
                        className="text-primary-blog_blue font-black no-underline transition-colors duration-300 hover:text-[#0b2b5e]"
                        {...props}
                    >
                        {children}
                    </a>
                );
            }
        },

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
                    className="bg-[#EEEEEE] text-[#E01E5A] px-[6px] py-[3px] rounded-[4px] font-mono text-[14px]"
                    {...props}
                >
                    {children}
                </code>
            );
        },

        img: ({ src, width, ...props }: any) => {
            const imageSrc = `/api/getPostImage?postType=${postType}&postID=${postURL}&srcID=${src}`;
            return (
                <div className="flex justify-center my-[20px]">
                    <img
                        src={imageSrc}
                        width={width}
                        alt="Post Image"
                        className="max-w-full h-auto rounded-[8px]"
                        {...props}
                    />
                </div>
            );
        },

        strong: ({ children, ...props }: any) => (
            <strong className="bg-[#EEEEEE] text-primary-blog_blue font-medium px-[6px] py-[3px] rounded-[4px]" {...props}>
                {children}
            </strong>
        ),

        ul: ({ children, ...props }: any) => (
            <ul className="mx-auto text-left w-[500px] max-[1400px]:w-full list-disc pl-[20px] my-[15px] space-y-[5px]" {...props}>
                {children}
            </ul>
        ),

        p: ({ children, ...props }: any) => (
            <p className="my-[15px] leading-[26px] text-primary-blog_black text-[16px] font-nanum-r text-justify max-w-[800px] mx-auto" {...props}>
                {children}
            </p>
        )
    };
};

export default MDRenderer;
