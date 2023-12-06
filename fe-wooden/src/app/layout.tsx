import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Wooden Games',
    keywords: [
        'party games rent',
        'corporate party',
        'corporate event',
        'corporative',
        'party',
        'board games',
        'celebration',
        'festival',
        'fest',
        'fiesta',
        'wedding weddings',
        'bachelorette party',
        'bridal',
        'marriage',
        'fort boyard',
        'openings',
        'opening',
        'event',
        'activity',
        'promotion',
        'welcome',
        'social',
        'funny',
        'clever',
        'convention',
        'conference',
        'seminar',
        'forum',
        'workshop',
        'conf',
        'concept',
        'coffee break',
        'lunch',
        'table games',
        'birthday',
        'birthdays',
        'birthday party',
        'anniversary',
        'meeting',
        'team building',
        'meet up',
        'business',
        'organizer',
        'host',
        'promoter',
        'event agencies',
        'agencies',
        'official event',
    ],
    description:
        'Renting games for your party is a great way to create a fun and interactive atmosphere. Keep your guests entertained and engaged without resorting to smartphones. Learn more about how to make your coffee break a memorable and enjoyable experience with these games',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
