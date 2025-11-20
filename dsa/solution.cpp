#include <iostream>
#include <vector>
#include <unordered_map>
#include <limits>

using namespace std;

int findSecondLargestUnique_ON(const vector<int> &arr)
{
  if (arr.empty())
  {
    return -1;
  }
  unordered_map<int, int> counts;
  for (int num : arr)
  {
    counts[num]++;
  }
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

  int largest = INT_MIN;
  int secondLargest = INT_MIN;
  for (int num : unique_numbers)
  {
    if (num > largest)
    {
      // New largest found
      secondLargest = largest;
      largest = num;
    }
    else if (num > secondLargest)
    {
      secondLargest = num;
    }
  }

  if (secondLargest == numeric_limits<long long>::min())
  {
    return -1;
  }

  return (int)secondLargest;
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