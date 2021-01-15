import quicksort from "./quicksort.js";

const bucketsort = function(nums) {
    let animationNums = [];
    let bucketAssignAnimationNums = [];

    let k = Math.min(5, nums.length);
    let M = Math.max(...nums) + 1;
    // let bucketSize = Math.floor(M / k);
    let buckets = new Array(k).fill(0).map(() => new Array(0));

    for (let i = 0, len = nums.length; i < len; i += 1) {
        // allocate each number to a bucket according to its percentile
        let idx = Math.max(0, Math.floor((k * nums[i]) / M));
        buckets[idx].push(nums[i]);

        // vis
        bucketAssignAnimationNums.push({
            nums: fillToLength(concatenate(buckets), nums.length)
        });
    }

    let prefixCount = 0;
    // map from buckets to batched animationNums
    buckets.map((bucket, bucketIdx) => {
        // animation frames
        quicksort(bucket).forEach((obj, frameIdx) => {
            if (!animationNums[frameIdx])
                animationNums[frameIdx] = {
                    nums: new Array(k).fill(0).map(() => new Array(0)),
                    pointers: {}
                };
            for (let key in obj.pointers) {
                let numIdx = parseInt(key) + prefixCount;
                animationNums[frameIdx].pointers[numIdx] = true;
            }

            animationNums[frameIdx].nums[bucketIdx] = [...obj.nums];
        });

        prefixCount += bucket.length;
        // console.log("Bucket: ", bucket);
    });

    // concatenate nums in buckets and insert into frames
    for (let frame of animationNums) {
        for (let i = 0, len = frame.nums.length; i < len; i += 1) {
            if (frame.nums[i].length !== buckets[i].length) {
                frame.nums[i] = buckets[i].slice();
            }
        }
        frame.nums = concatenate(frame.nums);
    }

    return [...bucketAssignAnimationNums, ...animationNums];
};

const concatenate = function(buckets) {
    return JSON.parse(
        "[" +
            buckets
                .filter(bucket => bucket.length !== 0)
                .map(bucket => bucket.join(","))
                .join(",") +
            "]"
    );
};

const fillToLength = function(arr, len) {
    let output = [...arr];
    while (output.length < len) {
        output.push(0);
    }
    return output;
};

// console.log(
//     bucketsort([
//         208,
//         250,
//         201,
//         145,
//         70,
//         185,
//         230,
//         126,
//         122,
//         47,
//         82,
//         4,
//         292,
//         7,
//         277,
//         42,
//         116,
//         202,
//         222,
//         125,
//         227,
//         78,
//         253,
//         132,
//         167,
//         148,
//         275,
//         16,
//         28,
//         299,
//         56,
//         268,
//         59,
//         25,
//         3,
//         64,
//         172,
//         187,
//         29,
//         298,
//         50,
//         213,
//         204,
//         144,
//         142,
//         262,
//         182,
//         110,
//         163,
//         236
//     ])
// );
export default bucketsort;

/*
function bucketSort(array, k) is
    buckets ← new array of k empty lists
    M ← the maximum key value in the array
    for i = 1 to length(array) do
        insert array[i] into buckets[floor(k × array[i] / M)]
    for i = 1 to k do
        nextSort(buckets[i])
    return the concatenation of buckets[1], ...., buckets[k]
*/
