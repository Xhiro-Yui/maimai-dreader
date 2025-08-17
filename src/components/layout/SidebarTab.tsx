import React from 'react';

interface TabProps {
    name: string;
    onClick: () => void;
    active: boolean;
    icon?: React.ReactElement;
}

interface SidebarTabsProps {
    tab: TabProps;
}

const SidebarTabs: React.FC<SidebarTabsProps> = ({ tab }) => {
    return (
        <button
            onClick={tab.onClick}
            className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors space-x-2 ${
                tab.active
                    ? "bg-[var(--color-hover-bg)] font-semibold"
                    : "hover:bg-[var(--color-hover-bg)]"
            }`}
        >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            <span>{tab.name}</span>
        </button>
    );
};

export default SidebarTabs;
