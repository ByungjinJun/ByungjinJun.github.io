---
layout: post
title:  "Math for Machine Learning"
date:   2017-10-17 14:50:25 -0500
categories: Machine_Learning
published: false
---

Collaborative filtering

popular recommendation system

Book reco: Pattern recognition and Machine Learning (Informative Science and Statistics)
Learning From data

Then, how do I predict what you'll like?
- user-based: similarity of item list of different users
- item-based: similarity of items one user have purchased

**Feature selection - IMPORTANT**
implicit features
- the number of clicks
- demographic information
- the number of followers

**explicit features**
- user ratings - homework thing
- review
- putchase history


USER-Based
in User-based col-fil, use distance measure. (N-dimensional space)
which similarity measure?
- p-norm (manhattan /euclidian)
- pearson Correlation
- cosine similarity

@ Is manhattan distance really good in some case?
preference doesn't show up from the distance measure
-> different users may use different rating scales

@ Pearson correlation
range(-1, 1)
a perfect positive correlation: 1
a perfect negative correlation: -1

@ cosine similarity
similar to Pearson one
<br /><br />

RECOMMENDATION & PREDICTION

pretty much similar[^1]

how to predict ratings to unrated items?
1) define a similarity measure
2) pick k users that had similar preferences to those of current user
=> how to find optimal k value
3) compute a prediction from a weighted average of k nearest neighbors' ratings

**ITEM-BASE**

The Cold Start Problem
- what if the user never rated any item
- what if the item is never rated

issues
+ ask users to rate
+ demographic info
+ content analysis / metadata
+ missing values

Missing values
- dumb way : discard coum / change all values 0
- mean? random(noise)? crazy?
- what is a good imputation technique
- 

[^1]: dddddd
