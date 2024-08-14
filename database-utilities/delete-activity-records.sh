#!/bin/bash

# List of IDs to delete
ids=(
    "08vf23p3do2rujs"
    "0x3cta1jx1i3jo2"
    "0xvb154qweni9s5"
    "1zk42xhvcyf373k"
    "3zz6im9t24mba8u"
    "5qdr24z492wj972"
    "85bi0wcasnatzf6"
    "8kf1oht2hdi7w6z"
    "a0lucs0kg1mxpw9"
    "b4ivhofqj41i8q1"
    "b9c47b5yb9u7mnl"
    "c3h93c7o7don7nf"
    "c53972tlxjbt3ao"
    "cjoyu8lmvniltpx"
    "cxe87pa9rbctjkl"
    "e88cyizeo6nnt3h"
    "ett62yow7j466qw"
    "fgfpsdj4qefwpfd"
    "fusju1trher206p"
    "hsc0vejs7pn82yw"
    "ktlx23xiktjwece"
    "lin9khxjh3degfv"
    "lqtjwztk1ijdaj0"
    "o2dto2ccpxog2cd"
    "ofhable09c2a9r6"
    "pdk6h95eeearj96"
    "t9e1i3a5au6hp0m"
    "vevagt96xfq4d6k"
    "xq8u565ccbrjuwd"
    "xvl6kngb0i7leq3"
)

# Loop through each ID and delete the record
for id in "${ids[@]}"
do
   curl -X DELETE "http://127.0.0.1:8090/api/collections/activity_data/records/$id"
done
