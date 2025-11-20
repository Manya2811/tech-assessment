# 💻 DSA Solution: Second Largest Unique Number (O(n))

## 📝 Problem Statement

Given an array of integers, return the **second largest unique number** in the array. A number is considered "unique" if it appears exactly once in the input array. If the second largest unique number does not exist (i.e., less than two unique numbers are present), return $-1$.

---

## 💡 Approach: Optimal O(n) Time Complexity

The solution uses a two-pass approach to achieve a linear $O(n)$ time complexity, utilizing a hash map for efficient frequency counting.

1.  **Count Frequencies ($O(n)$):** An `std::unordered_map` is used to count the occurrences of every number.
2.  **Filter Unique Numbers ($O(d)$):** All numbers with a count of exactly **1** (the unique elements) are collected into a vector.
3.  **Find Top Two in Single Pass ($O(d)$):** The vector of unique elements is scanned once to find the **`largest`** and **`secondLargest`** values. This step avoids the $O(n \log n)$ cost of sorting.
4.  **Result:** Returns the `secondLargest` value found, or $-1$ if fewer than two unique numbers exist.

### Time and Space Complexity

| Metric               | Complexity | Note                                                                                                                                                       |
| :------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Time Complexity**  | $O(n)$     | Dominated by the initial linear pass to count frequencies. The subsequent steps are proportional to the number of distinct elements, $d$, where $d \le n$. |
| **Space Complexity** | $O(n)$     | Used to store the `unordered_map` (for frequencies) and the `unique\_numbers` vector.                                                                      |

---

## 🔍 Sample Input/Output

The following test cases are included in the `main` function for verification:

| Input Array             | Unique Numbers | Output | Expected Output |
| :---------------------- | :------------- | :----- | :-------------- |
| `[3, 5, 2, 5, 6, 6, 1]` | `[3, 2, 1]`    | `2`    | `2`             |
| `[7, 7, 7]`             | `[]`           | `-1`   | `-1`            |
| `[10, 20, 20]`          | `[10]`         | `-1`   | `-1`            |

---

## 📄 C++ Code (`solution.cpp`)

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <limits>

using namespace std;

/**
 * Finds the second largest unique number in an array in O(n) time.
 */
int findSecondLargestUnique_ON(const vector<int> &arr)
{
    if (arr.empty())
    {
        return -1;
    }

    // 1. Count Frequencies: O(n)
    unordered_map<int, int> counts;
    for (int num : arr)
    {
        counts[num]++;
    }

    // 2. Filter Unique Numbers: O(d)
    vector<int> unique_numbers;
    for (const auto &pair : counts)
    {
        if (pair.second == 1)
        {
            unique_numbers.push_back(pair.first);
        }
    }

    if (unique_numbers.size() < 2)
    {
        return -1;
    }

    // 3. Find Largest and Second Largest in Single Pass: O(d)
    int largest = INT_MIN;
    int secondLargest = INT_MIN;

    for (int num : unique_numbers)
    {
        if (num > largest)
        {
            // Current largest moves to secondLargest
            secondLargest = largest;
            largest = num;
        }
        else if (num > secondLargest)
        {
            // Found a number smaller than largest but bigger than secondLargest
            secondLargest = num;
        }
    }

    if (secondLargest == INT_MIN)
    {
        return -1;
    }

    return secondLargest;
}

int main()
{
    vector<int> input1 = {3, 5, 2, 5, 6, 6, 1};
    cout << "Input: [3, 5, 2, 5, 6, 6, 1] -> Output: " << findSecondLargestUnique_ON(input1) << " (Expected: 2)" << endl;

    vector<int> input2 = {7, 7, 7};
    cout << "Input: [7, 7, 7] -> Output: " << findSecondLargestUnique_ON(input2) << " (Expected: -1)" << endl;

    vector<int> input3 = {10, 20, 20};
    cout << "Input: [10, 20, 20] -> Output: " << findSecondLargestUnique_ON(input3) << " (Expected: -1)" << endl;

    return 0;
}
```
