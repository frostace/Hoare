def quicksort(arr, l, r):
    if l < r:
        pivot = partition(arr, l, r)

        quicksort(arr, l, pivor - 1)
        quicksort(arr, pivot + 1, r)