import React from 'react';
import { AppContent } from '@/components/app-content';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { props } = usePage<SharedData>();
    const isOpen = props.sidebarOpen ?? true;

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppSidebar />
            <SidebarInset>
                <AppContent>
                    {children}
                </AppContent>
            </SidebarInset>
        </SidebarProvider>
    );
}