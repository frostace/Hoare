/*
procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 inclusive do
            // if this pair is out of order 
            if A[i-1] > A[i] then
                // swap them and remember something changed
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
    until not swapped
end procedure
*/

export default function(nums) {
    let animationNums = [];
    let length = nums.length;

    let swapped = true;

    while (swapped) {
        swapped = false;
        for (let i = 0; i < length; i++) {
            if (nums[i - 1] > nums[i]) {
                [nums[i - 1], nums[i]] = [nums[i], nums[i - 1]];
                swapped = true;

                animationNums.push({
                    nums: nums.slice(),
                    pointers: { [i - 1]: true, [i]: true }
                });
            }
        }
    }

    return animationNums;
}
