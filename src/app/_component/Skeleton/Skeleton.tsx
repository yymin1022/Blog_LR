import React from "react";

interface SkeletonProps {
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
    return (
        <div 
            className={`animate-pulse bg-[#EEF2FF] dark:bg-blue-950/40 rounded ${className}`}
        />
    );
};

export default Skeleton;
