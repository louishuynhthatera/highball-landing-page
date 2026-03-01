'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function StoragePage() {
    return (
        <div style={{ padding: '40px', background: '#0b0c0c', minHeight: '100vh', color: 'white' }}>
            <h1>Storage Page</h1>
            <p>This is the archive/storage page for more posts.</p>
            <Link href="/HighBaller" style={{ color: '#f5c842' }}>Back to HighBaller</Link>
        </div>
    );
}
