import React from 'react';
import Button from './Button';

export default {
    title: 'Common/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        children: {
            control: 'text',
            description: 'Вміст кнопки (текст або емодзі-іконка з текстом).',
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success'],
            description:
                'Візуальний варіант: `primary` (синій, основна дія), ' +
                '`secondary` (сірий, другорядна дія), `success` (зелений, ' +
                'підтверджувальна дія).',
            table: { defaultValue: { summary: 'primary' } },
        },
        disabled: {
            control: 'boolean',
            description: 'Чи вимкнена кнопка (напівпрозора, курсор not-allowed, клік ігнорується).',
            table: { defaultValue: { summary: 'false' } },
        },
        onClick: { action: 'clicked' },
    },
    args: {
        children: 'Натисни мене',
        variant: 'primary',
        disabled: false,
    },
};

export const Primary = {
    args: {
        variant: 'primary',
        children: 'Почати гру',
    },
};

export const AllVariants = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
        </div>
    ),
    parameters: {
        controls: { disable: true },
    },
};

export const Disabled = {
    args: {
        variant: 'primary',
        disabled: true,
        children: 'Недоступно',
    },
};
