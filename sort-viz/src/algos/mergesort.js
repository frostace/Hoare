// merge sort in place version, without auxiliary space
// export default function(nums, l, r) {
//     var animationNums = [];
//     // l, r inclusive
//     var mergesortHelper = function(nums, l, r) {
//         // base case
//         if (l >= r) return;

//         // divide into 2
//         let mid = l + Math.floor((r - l + 1) / 2);

//         mergesortHelper(nums, l, mid - 1);
//         mergesortHelper(nums, mid, r);

//         // re-arrange 2 ordered subarrays
//         merge(nums, l, mid - 1, r);
//     };

//     var merge = function(arr, l, mid, r) {
//         let pointer1 = l;
//         let pointer2 = mid + 1;
//         // base case
//         if (arr[mid] <= arr[pointer2]) return;

//         while (pointer1 <= mid && pointer2 <= r) {
//             if (arr[pointer1] <= arr[pointer2]) {
//                 animationNums.push({
//                     nums: arr.slice(),
//                     pointers: { [pointer1]: true },
//                 });
//                 pointer1++;
//             } else {
//                 let value = arr[pointer2];
//                 let i = pointer2;

//                 // right shift each element, and insert value to the beginning
//                 while (i !== pointer1) {
//                     arr[i] = arr[i - 1];
//                     animationNums.push({
//                         nums: arr.slice(),
//                         pointers: { [i]: true },
//                     });
//                     i--;
//                 }
//                 arr[pointer1] = value;
//                 animationNums.push({
//                     nums: arr.slice(),
//                     pointers: { [pointer1]: true },
//                 });

//                 pointer1++;
//                 mid++;
//                 pointer2++;
//             }
//         }
//     };

//     mergesortHelper(nums, l, r);
//     return animationNums;
// }

export default function(nums) {
    let animationNums = [];
    let mergesortHelper = function(nums, l, r) {
        // base case
        if (l === r) return nums.slice(l, r + 1);

        // divide array into 2
        let mid = l + Math.floor((r - l + 1) / 2);
        let leftOrdered = mergesortHelper(nums, l, mid - 1);
        let rightOrdered = mergesortHelper(nums, mid, r);

        // exit of recursion
        let left = 0,
            right = 0,
            leftLen = leftOrdered.length,
            rightLen = rightOrdered.length,
            k = l;
        while (left < leftLen && right < rightLen) {
            nums[k++] =
                leftOrdered[left] > rightOrdered[right]
                    ? rightOrdered[right++]
                    : leftOrdered[left++];
            animationNums.push({
                nums: nums.slice(),
                pointers: { [k - 1]: true }
            });
        }
        while (k <= r) {
            nums[k++] =
                left < leftLen ? leftOrdered[left++] : rightOrdered[right++];
            animationNums.push({
                nums: nums.slice(),
                pointers: { [k - 1]: true }
            });
        }

        return nums.slice(l, r + 1);
    };

    let l = 0,
        r = nums.length - 1;
    mergesortHelper(nums, l, r);

    return animationNums;
}
