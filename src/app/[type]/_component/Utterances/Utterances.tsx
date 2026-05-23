"use client";

import React, { useRef, useEffect } from "react";

const Utterances = () => {
    const utterancesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (utterancesRef.current) {
            const utterances = document.createElement("script");
            utterances.setAttribute("src", "https://utteranc.es/client.js");
            utterances.setAttribute("async", "true");
            utterances.setAttribute("crossorigin", "anonymous");
            utterances.setAttribute("repo", "yymin1022/Blog_LR_Comments");
            utterances.setAttribute("theme", "github-light");
            utterances.setAttribute("issue-term", "pathname");
            utterancesRef.current.appendChild(utterances);
        }
    }, []);

    return <div ref={utterancesRef} className="w-full"></div>;
};

export default Utterances;
