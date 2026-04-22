import Image from "next/image";
import { Author } from "@/lib/cms/interface";

interface AuthorBioProps {
    author: Author;
}

function AuthorInitials({ name }: { name: string }) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    const isEditorial = name === "WealthLogik Editorial";

    return (
        <div className={`flex h-full w-full items-center justify-center font-bold ${isEditorial ? 'bg-foreground text-background font-serif text-2xl tracking-widest' : 'bg-primary/10 text-lg text-primary'}`}>
            {isEditorial ? 'WL' : initials}
        </div>
    );
}

export default function AuthorBio({ author }: AuthorBioProps) {
    const isEditorial = author.name === "WealthLogik Editorial";
    const hasAvatar = author.avatar && !author.avatar.includes("placeholder") && !isEditorial;

    return (
        <div className="rounded-lg border border-border bg-card p-8 md:p-10">
            <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-border">
                    {hasAvatar ? (
                        <Image
                            src={author.avatar}
                            alt={author.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <AuthorInitials name={author.name} />
                    )}
                </div>
                <div className="flex-1 space-y-3">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold font-serif">
                            Written by {author.name}
                        </h3>
                        {(author.socialLinks?.twitter || author.socialLinks?.linkedin) && (
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
                        )}
                    </div>
                    {author.bio && (
                        <p className="text-base text-muted-foreground leading-relaxed">
                            {author.bio}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
