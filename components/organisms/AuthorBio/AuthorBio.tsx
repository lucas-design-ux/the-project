import Image from "next/image";
import Link from "next/link";
import { Author } from "@/lib/cms/interface";

interface AuthorBioProps {
    author: Author;
}

export default function AuthorBio({ author }: AuthorBioProps) {
    return (
        <div className="my-24 rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold">Written by {author.name}</h3>
                        <div className="flex items-center gap-4">
                            {author.socialLinks?.twitter && (
                                <a
                                    href={author.socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary"
                                    aria-label="Twitter"
                                >
                                    Twitter
                                </a>
                            )}
                            {author.socialLinks?.linkedin && (
                                <a
                                    href={author.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary"
                                    aria-label="LinkedIn"
                                >
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    </div>
                    {author.bio && <p className="text-sm text-muted-foreground leading-relaxed">{author.bio}</p>}
                </div>
            </div>
        </div>
    );
}
