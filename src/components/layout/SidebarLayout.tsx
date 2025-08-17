import React, {type ReactNode, useState} from "react";
import SidebarTabs from "./SidebarTab.tsx";

interface TabProps {
    name: string;
    icon?: React.ReactElement;
    active: boolean;
    onClick: () => void;
}

interface SidebarLayoutProps {
    title?: string;
    titleImageUrl?: string;
    controls?: ReactNode;
    sidebarTabs?: TabProps[];
    children: ReactNode;
}

export default function SidebarLayout({
                                          title,
                                          titleImageUrl,
                                          controls,
                                          sidebarTabs,
                                          children,
                                      }: SidebarLayoutProps) {
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <div className="flex h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
            {/* Sidebar */}
            <aside
                className="w-60 flex-shrink-0 bg-[var(--color-sidebar-bg)] text-[var(--color-sidebar-text)] shadow-md">
                <div className="p-4 space-y-4">
                    {/* Title */}
                    {(title || titleImageUrl) && (
                        <>
                            {titleImageUrl && !imageFailed ? (
                                <img
                                    src={titleImageUrl}
                                    alt={title}
                                    className="w-full h-auto object-contain"
                                    onError={() => setImageFailed(true)}
                                />
                            ) : (
                                <h1 className="text-lg font-bold">{title}</h1>
                            )}
                            <hr className="border-[var(--color-divider)]"/>
                        </>
                    )}

                    {/* Controls */}
                    {controls && (
                        <>
                            <div className="flex flex-col gap-2">{controls}</div>
                            <hr className="border-[var(--color-divider)]"/>
                        </>
                    )}

                    {/* Tabs */}
                    {sidebarTabs && (
                        <div className="space-y-1">
                            {sidebarTabs.map((tab) => (
                                <SidebarTabs key={tab.name} tab={tab}/>
                            ))}
                        </div>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    );
}
