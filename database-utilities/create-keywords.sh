#!/bin/bash

# Declare an array of keyword entries with the format: "keyword:density:volume:activity_id:country_id"
declare -a keywords=(
  "trading patterns:12:2000:fgfpsdj4qefwpfd:t4bs26s2i8sl38e"
  "what is leverage in trading:17:1200:ofhable09c2a9r6:t4bs26s2i8sl38e"
  "ai trading bot:31:2100:vevagt96xfq4d6k:t4bs26s2i8sl38e"
  "best forex trading app:26:800:fusju1trher206p:t4bs26s2i8sl38e"
  "what is an outstanding balance?:3:70:cxe87pa9rbctjkl:t4bs26s2i8sl38e"
  "forex profit calculator:22:2500:xvl6kngb0i7leq3:t4bs26s2i8sl38e"
  "trading for beginners:12:1200:e88cyizeo6nnt3h:t4bs26s2i8sl38e"
  "gomining:11:500:b9c47b5yb9u7mnl:t4bs26s2i8sl38e"
  "fisker stock:14:5700:3zz6im9t24mba8u:t4bs26s2i8sl38e"
  "why trading 212 is bad:2:1400:ktlx23xiktjwece:t4bs26s2i8sl38e"
  "stock x:15:15000:a0lucs0kg1mxpw9:t4bs26s2i8sl38e"
  "forex sheet:16:1900:0x3cta1jx1i3jo2:t4bs26s2i8sl38e"
  "muln stock:26:10000:c3h93c7o7don7nf:t4bs26s2i8sl38e"
  "revolut crypto:8:900:8kf1oht2hdi7w6z:t4bs26s2i8sl38e"
  "is xrp a good investment:24:2100:hsc0vejs7pn82yw:t4bs26s2i8sl38e"
  "he1 share price:0:143000:b4ivhofqj41i8q1:t4bs26s2i8sl38e"
  "ffie stock:14:10000:c53972tlxjbt3ao:t4bs26s2i8sl38e"
  "clsk stock:25:12000:85bi0wcasnatzf6:t4bs26s2i8sl38e"
  "itp crypto:4:2000:t9e1i3a5au6hp0m:t4bs26s2i8sl38e"
  "lcx crypto:25:1400:xq8u565ccbrjuwd:t4bs26s2i8sl38e"
  "barc share price:23:101000:1zk42xhvcyf373k:t4bs26s2i8sl38e"
  "crypto news predictions:28:900:0xvb154qweni9s5:t4bs26s2i8sl38e"
  "cryptocurrency prices uk:17:500:o2dto2ccpxog2cd:t4bs26s2i8sl38e"
  "vodafone share price:22:143000:lin9khxjh3degfv:t4bs26s2i8sl38e"
  "cfd modelling:6:500:08vf23p3do2rujs:t4bs26s2i8sl38e"
  "bitcoin price uk:4:56000:lqtjwztk1ijdaj0:t4bs26s2i8sl38e"
  "best crypto exchange uk:9:2400:cjoyu8lmvniltpx:t4bs26s2i8sl38e"
  "aviva share price:11:186000:pdk6h95eeearj96:t4bs26s2i8sl38e"
  "elon musk cryptocurrency:22:500:fgfpsdj4qefwpfd:t4bs26s2i8sl38e"
  "crypto tax uk:18:12000:ofhable09c2a9r6:t4bs26s2i8sl38e"
  "how to invest in stocks uk:28:1200:vevagt96xfq4d6k:t4bs26s2i8sl38e"
  "next big cryptocurrency:19:450:fusju1trher206p:t4bs26s2i8sl38e"
  "shiba inu burn rate:8:4200:cxe87pa9rbctjkl:t4bs26s2i8sl38e"
  "spread betting vs cfd:9:350:xvl6kngb0i7leq3:t4bs26s2i8sl38e"
  "tesco share price:22:217000:e88cyizeo6nnt3h:t4bs26s2i8sl38e"
  "syme share price:0:83000:b9c47b5yb9u7mnl:t4bs26s2i8sl38e"
  "how to invest in gold uk:26:350:3zz6im9t24mba8u:t4bs26s2i8sl38e"
  "darktrace share price:7:57000:ktlx23xiktjwece:t4bs26s2i8sl38e"
  "ai etf:27:800:a0lucs0kg1mxpw9:t4bs26s2i8sl38e"
  "ethereum etf:16:1700:0x3cta1jx1i3jo2:t4bs26s2i8sl38e"
  "ttoo stock:12:5600:c3h93c7o7don7nf:t4bs26s2i8sl38e"
  "dwac stock:22:5300:8kf1oht2hdi7w6z:t4bs26s2i8sl38e"
  "bngo stock:30:5100:hsc0vejs7pn82yw:t4bs26s2i8sl38e"
  "render crypto:24:1400:5qdr24z492wj972:t4bs26s2i8sl38e"
  "hims stock:12:4700:b4ivhofqj41i8q1:t4bs26s2i8sl38e"
  "psny stock:12:3900:c53972tlxjbt3ao:t4bs26s2i8sl38e"
  "ionq stock:12:3800:85bi0wcasnatzf6:t4bs26s2i8sl38e"
  "iag share price:19:293000:t9e1i3a5au6hp0m:t4bs26s2i8sl38e"
  "entrepreneur:0:0:xq8u565ccbrjuwd:t4bs26s2i8sl38e"
  "lvmh stock:30:3700:1zk42xhvcyf373k:t4bs26s2i8sl38e"
  "crypto wallet uk:9:1200:0xvb154qweni9s5:t4bs26s2i8sl38e"
  "qubic crypto:4:1000:o2dto2ccpxog2cd:t4bs26s2i8sl38e"
  "boohoo share price:7:113000:lin9khxjh3degfv:t4bs26s2i8sl38e"
  "ftse 250:24:374000:08vf23p3do2rujs:t4bs26s2i8sl38e"
  "ocado share price:11:93000:lqtjwztk1ijdaj0:t4bs26s2i8sl38e"
  "direct line share price:3:23000:cjoyu8lmvniltpx:t4bs26s2i8sl38e"
  "bae:13:162000:pdk6h95eeearj96:t4bs26s2i8sl38e"
  "ggp share price:1:137000:fgfpsdj4qefwpfd:t4bs26s2i8sl38e"
  "tesla stock prediction 2025:21:1100:ofhable09c2a9r6:t4bs26s2i8sl38e"
  "vusa:7:61000:vevagt96xfq4d6k:t4bs26s2i8sl38e"
  "check a trade:41:90500:fusju1trher206p:t4bs26s2i8sl38e"
  "blox trade:30:5400:cxe87pa9rbctjkl:t4bs26s2i8sl38e"
  "centrica share price:14:124000:e88cyizeo6nnt3h:t4bs26s2i8sl38e"
  "bp share price:31:326000:b9c47b5yb9u7mnl:t4bs26s2i8sl38e"
  "national grid share price:10:88000:3zz6im9t24mba8u:t4bs26s2i8sl38e"
  "abrdn share price:7:113000:ktlx23xiktjwece:t4bs26s2i8sl38e"
  "bt share price:9:300000:a0lucs0kg1mxpw9:t4bs26s2i8sl38e"
  "spacex stock:16:1500:0x3cta1jx1i3jo2:t4bs26s2i8sl38e"
  "stla stock:38:12000:c3h93c7o7don7nf:t4bs26s2i8sl38e"
  "smr stock:14:21000:8kf1oht2hdi7w6z:t4bs26s2i8sl38e"
  "aitx stock:9:27000:hsc0vejs7pn82yw:t4bs26s2i8sl38e"
  "onon stock:16:27000:5qdr24z492wj972:t4bs26s2i8sl38e"
  "ctnt stock:1:7800:b4ivhofqj41i8q1:t4bs26s2i8sl38e"
  "avuv:9:17000:c53972tlxjbt3ao:t4bs26s2i8sl38e"
  "pton stock:57:48000:85bi0wcasnatzf6:t4bs26s2i8sl38e"
  "rvsn stock:2:14000:t9e1i3a5au6hp0m:t4bs26s2i8sl38e"
  "abos stock:9:5000:xq8u565ccbrjuwd:t4bs26s2i8sl38e"
  "tco meaning:6:3300:1zk42xhvcyf373k:t4bs26s2i8sl38e"
  "twlo:47:20000:0xvb154qweni9s5:t4bs26s2i8sl38e"
  "ltnc stock:4:2900:o2dto2ccpxog2cd:t4bs26s2i8sl38e"
  "xair stock:3:4700:lin9khxjh3degfv:t4bs26s2i8sl38e"
  "401k rollover:55:4700:08vf23p3do2rujs:t4bs26s2i8sl38e"
  "pokemon trading cards:15:1300:lqtjwztk1ijdaj0:t4bs26s2i8sl38e"
  "drct stock:7:7300:cjoyu8lmvniltpx:t4bs26s2i8sl38e"
  "lmdx stock:0:5100:ett62yow7j466qw:t4bs26s2i8sl38e"
  "financial statement assertions:9:1300:pdk6h95eeearj96:t4bs26s2i8sl38e"
  "inbs stock:1:11000:fgfpsdj4qefwpfd:t4bs26s2i8sl38e"
  "foxo stock:1:7300:ofhable09c2a9r6:t4bs26s2i8sl38e"
  "mndy stock:26:19000:vevagt96xfq4d6k:t4bs26s2i8sl38e"
  "nvs stock:36:5500:fusju1trher206p:t4bs26s2i8sl38e"
  "klip stock:0:3400:cxe87pa9rbctjkl:t4bs26s2i8sl38e"
  "soun stock:26:63000:xvl6kngb0i7leq3:6q6n87beamg6aze"
  "rent the runway:31:15000:e88cyizeo6nnt3h:6q6n87beamg6aze"
  "truth social stock price:39:13000:b9c47b5yb9u7mnl:6q6n87beamg6aze"
  "fsr stock:46:110000:3zz6im9t24mba8u:6q6n87beamg6aze"
  "bills trade:24:2100:ktlx23xiktjwece:6q6n87beamg6aze"
  "trade surplus:30:4600:a0lucs0kg1mxpw9:6q6n87beamg6aze"
)

# Loop through the array and create each keyword entry
for entry in "${keywords[@]}"
do
  IFS=":" read -r keyword density volume activity_id country_id <<< "$entry"
  curl -X POST http://127.0.0.1:8090/api/collections/keywords/records \
  -H "Content-Type: application/json" \
  -d '{
    "created": "2024-08-14T12:00:00Z",
    "updated": "2024-08-14T12:00:00Z",
    "keyword": "'"$keyword"'",
    "density": '$density',
    "volume": '$volume',
    "evergreen": false,
    "activity": "'$activity_id'",
    "country": "'$country_id'"
  }'
done
