"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import {Button} from "@/components/ui/button";
import {ThumbsDown, ThumbsUpIcon} from "lucide-react";

export default function SupportTopicPage() {
    // Get the current path, e.g. "/support/foo"
    const pathname = usePathname();

    // Split on slashes and pick the last segment
    const segments = pathname.split("/").filter(Boolean);
    const topicId = segments[segments.length - 1];
    // (If your route is guaranteed to be `/support/[topicId]`,
    //   this is typically at index 1.
    //   But grabbing the last segment is more robust in case you nest deeper later.)

    // Mock article data (in a real app, you'd fetch by topicId)
    const [article, setArticle] = useState({
        title: "Placeholder Title",
        shortDescription: "This is a brief summary of the article.",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    });

    // Like/Dislike counters
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    // Example effect: fetch or load data by topicId
    useEffect(() => {
        if (topicId) {
            // e.g. fetch(`/api/support/${topicId}`)
            // .then((res) => res.json())
            // .then((data) => setArticle(data));
        }
    }, [topicId]);

    const handleLike = () => setLikes((prev) => prev + 1);
    const handleDislike = () => setDislikes((prev) => prev + 1);

    return (
        <>
            {/* If you're using a layout, you can remove this Header */}
            <Header />

            <div className="bg-slate-50 min-h-screen py-8 px-44">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl tracking-tighter font-bold mb-2">{article.title}</h1>
                    <p className="text-gray-600 mb-4 italic">{article.shortDescription}</p>

                    <p className="text-gray-800 whitespace-pre-line">{article.body}</p>

                    <div className="mt-5">
                        <span className="text-center text-lg font-bold">Was it useful?</span>
                        <div className="mt-2 flex gap-3">
                            <Button
                                onClick={handleLike}
                                className="px-4 py-2 items-center text-green-700 justify-center w-full"
                                variant="outline"
                            >
                                <ThumbsUpIcon />
                                {likes}
                            </Button>
                            <Button
                                onClick={handleDislike}
                                className="px-4 py-2 items-center text-red-600 justify-center w-full"
                                variant="outline"
                            >
                                <ThumbsDown />
                                {dislikes}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
