export default function(nums) {
    let animationNums = [];
    let qsortHelper = function(nums, l, r) {
        // base case
        if (l >= r) return;

        // console.log(l, r, nums);
        let pivotIdx = partition(nums, l, r);

        qsortHelper(nums, l, pivotIdx - 1);
        qsortHelper(nums, pivotIdx + 1, r);
    };

    let partition = function(nums, l, r) {
        let anchor = l - 1;
        let pivot = nums[r];

        for (let i = l; i < r; i++) {
            if (nums[i] < pivot) {
                anchor++;
                [nums[anchor], nums[i]] = [nums[i], nums[anchor]];
                animationNums.push({
                    nums: nums.slice(),
                    pointers: { [anchor]: true, [i]: true }
                });
            }
            // animationNums.push({
            //     nums: nums.slice(),
            //     pointers: { [i]: true }
            // });
        }

        // swap val @ anchor + 1 and r
        [nums[anchor + 1], nums[r]] = [nums[r], nums[anchor + 1]];
        animationNums.push({
            nums: nums.slice(),
            pointers: { [anchor + 1]: true, [r]: true }
        });

        return anchor + 1;
    };

    let l = 0,
        r = nums.length - 1;
    if (l === r) return [{ nums: nums }];
    qsortHelper(nums, l, r);
    return animationNums;
}
