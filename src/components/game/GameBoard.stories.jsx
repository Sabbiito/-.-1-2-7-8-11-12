import React from 'react';
import GameBoard from './GameBoard';

const emptyBoard = (rows, cols) =>
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));

export default {
    title: 'Game/GameBoard',
    component: GameBoard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Розмір дошки визначається автоматично з переданого масиву `board` ' +
                    '— окремо передавати кількість рядків/колонок не потрібно. ' +
                    'Пропс `isColumnFull` приймається, але наразі не впливає на ' +
                    'рендер (див. JSDoc компонента) — це видно в стори `AlmostFull`, ' +
                    'де заповнена колонка виглядає так само клікабельною, як і решта.',
            },
        },
    },
    argTypes: {
        boardColor: {
            control: 'select',
            options: ['blue', 'green', 'purple'],
            description: 'Колір фону дошки.',
            table: { defaultValue: { summary: 'blue' } },
        },
        onColumnClick: { action: 'column-clicked' },
        board: { control: false },
        lastMove: { control: false },
    },
};

export const EmptyBoard = {
    args: {
        board: emptyBoard(6, 7),
        lastMove: null,
        boardColor: 'blue',
    },
};

export const InProgress = {
    args: {
        board: [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, 2, null, null, null],
            [null, null, 2, 1, null, null, null],
            [null, 1, 1, 2, null, null, null],
            [null, 1, 2, 1, 1, null, null],
        ],
        lastMove: { row: 2, col: 3 },
        boardColor: 'green',
    },
};

export const AlmostFull = {
    args: {
        board: [
            [null, null, null, null, null, null, null],
            [1, null, null, null, null, null, null],
            [2, null, null, 1, null, null, null],
            [1, null, 1, 2, null, null, null],
            [2, null, 2, 1, 2, null, null],
            [1, 2, 1, 2, 1, 2, 1],
        ],
        lastMove: { row: 1, col: 0 },
        boardColor: 'purple',
    },
};
