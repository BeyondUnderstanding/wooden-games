/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { Page, SidePopup, SidePopupProps } from './side-popup.component';
import { useState } from 'react';
import { useMergeState } from '../../../utils/hooks';

const meta: Meta<typeof SidePopup> = {
    component: SidePopup,
};

export default meta;
type Story = StoryObj<SidePopupProps>;

export const SidePopupStory: Story = {
    name: 'SidePopup',
    args: {
        isOpen: true,
        // page: { url: 'empty' },
    },
    render: ({ ...args }) => {
        const [page, setPage] = useMergeState<Page>(args.page);
        const [isOpen, onClose] = useState(args.isOpen);

        return (
            <SidePopup
                {...args}
                page={page}
                setNewPage={(page) => setPage(page)}
                isOpen={isOpen}
                onClose={() => onClose(false)}
            />
        );
    },
};
