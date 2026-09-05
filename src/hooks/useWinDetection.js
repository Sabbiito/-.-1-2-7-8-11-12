import { useCallback } from 'react';

/**
 * Хук для перевірки умови перемоги на ігровій дошці "Чотири в ряд".
 *
 * Алгоритм перевіряє лише клітинку останнього ходу (а не всю дошку), що
 * робить перевірку O(winCondition) замість O(rows × cols) — оптимізація,
 * можлива завдяки тому, що переможну лінію може утворити лише щойно
 * поставлена фішка.
 *
 * Для кожного з 4 напрямків (горизонталь, вертикаль, дві діагоналі)
 * рахується кількість однакових фішок в обидва боки від точки останнього
 * ходу. Якщо сумарна довжина лінії (з урахуванням самої останньої фішки)
 * досягає `winCondition`, гра вважається виграною.
 *
 * @param {number} winCondition — мінімальна довжина лінії для перемоги
 *   (наприклад, 4 для класичних правил "4 в ряд").
 * @returns {{checkWinner: function(Array.<Array.<(number|null)>>, number, number, number): boolean}}
 *   `checkWinner` повертає `true`, якщо хід у клітинку `(row, col)`
 *   гравцем `player` утворив переможну лінію на переданій дошці `board`.
 */
export const useWinDetection = (winCondition) => {
    const checkWinner = useCallback((board, row, col, player) => {

        const directions = [
            { dr: 0, dc: 1 },
            { dr: 1, dc: 0 },
            { dr: 1, dc: 1 },
            { dr: 1, dc: -1 }
        ];

        const countInDirection = (r, c, dr, dc) => {
            let count = 0;
            let nr = r + dr;
            let nc = c + dc;

            while (
                nr >= 0 && nr < board.length &&
                nc >= 0 && nc < board[0].length &&
                board[nr][nc] === player
                ) {
                count++;
                nr += dr;
                nc += dc;
            }
            return count;
        };

        for (let { dr, dc } of directions) {
            let count = 1; // сама клітинка останнього ходу
            count += countInDirection(row, col, dr, dc);
            count += countInDirection(row, col, -dr, -dc);

            if (count >= winCondition) return true;
        }
        return false;
    }, [winCondition]);

    return { checkWinner };
};