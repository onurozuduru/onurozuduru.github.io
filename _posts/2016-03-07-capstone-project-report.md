---
layout:     post
title:      Capstone Project Report
summary:    My capstone project report from 2015.
thumbnail:  file-text
tags:
 - capstone
 - report
 - final
 - machine learning
 - mrmr
 - knn
 - feature selection
 - classification
---

I put my project report on Github. You can see my notes about the report and you
can find a presentation embed in this post.

* [Link for Project Report](https://github.com/onurozuduru/capstone-project)
* [Link for Presentation](http://prezi.com/eyr7fbtd8iqe/?utm_campaign=share&utm_medium=copy&rc=ex0share)

# Capstone Project

<iframe src="https://prezi.com/embed/eyr7fbtd8iqe/?bgcolor=ffffff&amp;lock_to_path=1&amp;autoplay=0&amp;autohide_ctrls=0&amp;landing_data=bHVZZmNaNDBIWnNjdEVENDRhZDFNZGNIUE43MHdLNWpsdFJLb2ZHanI5eXBqa0FSb2RYMlRIZ3FBTUNZNFBsWk5RPT0&amp;landing_sign=de2PhoWjv_4qli4Msd1YU0o6z8yziy6CTGrYo1J_oeY" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" id="iframe_container" frameborder="0" height="400" width="550"></iframe>

This is my capstone project report from 2015. I did not edit the content of the report,
I only removed my personal information such as student ID, address and mobile phone number
and added watermark for license. Therefore, I hope you would be fair and consider that
it is my first academic paper, while you are reading it.

As I mentioned before I only changed the Curriculum Vitae page (page number 26) to keep
my private information out of the Internet and I removed my student ID from the first page of the report.

There are also results on CSV format for different distance methods and source code
of the voting_mrmr function with a demo dataset. I uploaded only the most important
function as source code, please read its README file or [Code and Demo](#code-and-demo) section below, before running the code.

Also my 3-5 minutes presentation is available on [this page](http://prezi.com/eyr7fbtd8iqe/?utm_campaign=share&utm_medium=copy&rc=ex0share). However there is no
transcript for presentation.

If you use all or any part of the report file, please put my name and a link to this github page
on your paper as attribution.

# Code and Demo

There are two files under this section, one is Matlab codes and the other one is
a set of data for quick demo. Before take a look at them please read below notes.

## About Code File

I only put the codes of the most important part of the project. Of course, I wrote and used
other codes to get results and to process them. Also I wrote scripts to apply voting_mrmr
for different parameters. However, I thought that it is enough to put main part of the project,
that is how it can be tested by others.

For more information, please read the project report.

#### voting_mrmr.m

It requires Mutual information toolbox and Matlab version of mRMR by H. Peng,
which can be found [here](http://penglab.janelia.org/proj/mRMR/#matlab). It is not
going to work, if requirements are not added to working path correctly.

## About Demo File

The demo data (*demo.mat*) is created for easy demonstration, base on the dataset
that is told in project report (*Discretized NCI data (9 cancers, discretized as 3-states)*)
and it is available at [here](http://penglab.janelia.org/proj/mRMR/test_nci9_s3.csv).

**Please note that, I am not the owner of the dataset and it might be removed if the owner asks for it.**
**It might has own license, so please do not share without visiting source website.**

For more information, please visit [this page](http://penglab.janelia.org/proj/mRMR/).

There are subsets of the real dataset.

* S: Sample (20x9712)
* T: Train (40x9712)
* gS: Group of Sample (20x1)
* gT: Group of Train (40x1)
