export default function(nums, l, r) {
    var animationNums = [];
    // l, r inclusive
    var mergesortHelper = function(nums, l, r) {
        // base case
        if (l >= r) return;

        // divide into 2
        let mid = l + Math.floor((r - l + 1) / 2);

        mergesortHelper(nums, l, mid - 1);
        mergesortHelper(nums, mid, r);

        // re-arrange 2 ordered subarrays
        merge(nums, l, mid - 1, r);
    };

    var merge = function(arr, l, mid, r) {
        let pointer1 = l;
        let pointer2 = mid + 1;
        // base case
        if (arr[mid] <= arr[pointer2]) return;

        while (pointer1 <= mid && pointer2 <= r) {
            if (arr[pointer1] <= arr[pointer2]) {
                animationNums.push({
                    nums: arr.slice(),
                    pointers: { [pointer1]: true },
                });
                pointer1++;
            } else {
                let value = arr[pointer2];
                let i = pointer2;

                // right shift each element, and insert value to the beginning
                while (i !== pointer1) {
                    arr[i] = arr[i - 1];
                    animationNums.push({
                        nums: arr.slice(),
                        pointers: { [i]: true },
                    });
                    i--;
                }
                arr[pointer1] = value;
                animationNums.push({
                    nums: arr.slice(),
                    pointers: { [pointer1]: true },
                });

                pointer1++;
                mid++;
                pointer2++;
            }
        }
    };

    mergesortHelper(nums, l, r);
    return animationNums;
}
