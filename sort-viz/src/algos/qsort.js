export default function(nums, l, r) {
    var animationNums = [];
    var qsortHelper = function(nums, l, r) {
        // base case
        if (l >= r) return;

        // console.log(l, r, nums);
        let pivotIdx = partition(nums, l, r);

        qsortHelper(nums, l, pivotIdx - 1);
        qsortHelper(nums, pivotIdx + 1, r);
    };

    var partition = function(nums, l, r) {
        let anchor = l - 1;
        let pivot = nums[r];

        for (let i = l; i < r; i++) {
            if (nums[i] < pivot) {
                anchor++;
                [nums[anchor], nums[i]] = [nums[i], nums[anchor]];
                animationNums.push({
                    nums: nums.slice(),
                    swap: { [anchor]: true, [i]: true },
                });
            }
        }

        // swap val @ anchor + 1 and r
        [nums[anchor + 1], nums[r]] = [nums[r], nums[anchor + 1]];
        animationNums.push({
            nums: nums.slice(),
            swap: { [anchor + 1]: true, [r]: true },
        });

        return anchor + 1;
    };

    qsortHelper(nums, l, r);
    return animationNums;
}
