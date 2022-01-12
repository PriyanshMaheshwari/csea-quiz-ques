#include <bits/stdc++.h>
using namespace std;

int main()
{
    string str;
    cin >> str;
    map<char, vector<pair<int, int>>> mp;
    map<char, int> mp2;
    int a = 0;
    char c = str[0];
    for (int i = 1; i < str.length(); i++)
    {
        if (str[i] != str[i - 1])
        {
            mp[str[i - 1]].push_back(make_pair(a, i - 1));
            mp2[str[i - 1]]++;
        }
    }
    char largest = 0, secondLargest = -1;

    // finding the largest element in the array
    for (char i = 'a'; i <= 'z'; i++)
    {
        if (mp[i] > mp[largest])
            largest = i;
    }
    for (char i = 'a'; i <= 'z'; i++)
    {
        if (mp[i] != mp[largest])
        {
            // first change the value of second largest
            // as soon as the next element is found
            if (secondLargest == -1)
                secondLargest = i;
            else if (mp[i] > mp[secondLargest])
                secondLargest = i;
        }
    }
    vector<int> v;
    for (int i = 0; i < mp[largest].size(); i++)
    {
        v.push_back(mp[largest][i].first);
        v.push_back(mp[largest][i].second);
    }
    for (int i = 0; i < mp[secondLargest].size(); i++)
    {
        v.push_back(mp[secondLargest][i].first);
        v.push_back(mp[secondLargest][i].second);
    }
    return v;
}