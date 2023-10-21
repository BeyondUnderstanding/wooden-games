'use client';

import { constVoid } from 'fp-ts/lib/function';
import { Button } from './ui-kit/button/button.component';

export default function Home() {
    return (
        <main>
            <Button
                enabled={true}
                label={'123'}
                onClick={constVoid}
                size="small"
            />
        </main>
    );
}
