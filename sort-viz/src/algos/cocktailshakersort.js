/*
function A = cocktailShakerSort(A)
% `beginIdx` and `endIdx` marks the first and last index to check
beginIdx = 1;
endIdx = length(A) - 1;
while beginIdx <= endIdx
    newBeginIdx = endIdx;
    newEndIdx = beginIdx;
    for i = beginIdx:endIdx
        if A(i) > A(i + 1)
            [A(i+1), A(i)] = deal(A(i), A(i+1));
            newEndIdx = i;
        end
    end

    % decreases `endIdx` because the elements after `newEndIdx` are in correct order
    endIdx = newEndIdx - 1;

    for i = endIdx:-1:beginIdx
        if A(i) > A(i + 1)
            [A(i+1), A(i)] = deal(A(i), A(i+1));
            newBeginIdx = i;
        end
    end
    % increases `beginIdx` because the elements before `newBeginIdx` are in correct order
    beginIdx = newBeginIdx + 1;
end
end
*/

export default function(nums) {
    let animationNums = [];
    let length = nums.length;

    let beginIdx = 0;
    let endIdx = length - 2;
    while (beginIdx <= endIdx) {
        let newBeginIdx = endIdx;
        let newEndIdx = beginIdx;
        for (let i = beginIdx; i <= endIdx; i += 1) {
            if (nums[i] > nums[i + 1]) {
                [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
                newEndIdx = i;

                animationNums.push({
                    nums: nums.slice(),
                    pointers: { [i]: true, [i + 1]: true }
                });
            }
        }

        endIdx = newEndIdx - 1;

        for (let i = endIdx; i >= beginIdx; i -= 1) {
            if (nums[i] > nums[i + 1]) {
                [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
                newBeginIdx = i;

                animationNums.push({
                    nums: nums.slice(),
                    pointers: { [i]: true, [i + 1]: true }
                });
            }
        }

        beginIdx = newBeginIdx + 1;
    }

    return animationNums;
}
