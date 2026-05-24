import React from "react";

interface SkeletonProps {
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
    return (
        <div 
            className={`animate-pulse bg-gray-100 dark:bg-gray-800 rounded ${className}`}
        />
    );
};

export default Skeleton;
