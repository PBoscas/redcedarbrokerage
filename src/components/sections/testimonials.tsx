'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/ui/motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}

const TESTIMONIALS = [
  // --- Peter reviews ---
  {
    quote: 'Peter helped us find and purchase our dream home, and we couldn\'t be more grateful. The process took nearly six months, with multiple unsuccessful offers along the way, but he remained patient and supportive throughout.',
    client: 'Sunil kumar',
    context: 'Google Review — Peter',
  },
  {
    quote: 'I had never bought or sold real estate in my life so when I was tasked with selling my late father\'s condo, I knew I would need some help. I\'m so glad I chose to work with Peter at Red Cedar. He guided me through the process and was very thorough.',
    client: 'Art Vandelay',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Peter and his team were amazing!!! My wife and I were looking to move to Columbia, and we really wanted to take our time and get our move right. Peter helped us over about a year -- he was extremely knowledgeable, patient, responsive, and dedicated.',
    client: 'Joe',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Peter is knowledgable, professional, and ethical. My wife and I asked Peter to represent us for buying a house that we loved. The house had major issues that we were not aware of: e.g. it was close to a power line. Peter explained why we should reconsider.',
    client: 'Ebrahim Azimi',
    context: 'Google Review — Peter',
  },
  {
    quote: 'If you\'re looking for a reliable, dedicated, and trustworthy real estate agent who is willing to go above and beyond for you - look no further. We were first time home buyers and Peter and his team constantly made us feel at ease.',
    client: 'Matthew Shea',
    context: 'Google Review — Peter',
  },
  {
    quote: 'There will not be enough allowed characters for this review to adequately describe how great of a realtor Peter is. As a first-time home buyer, my wife and I were completely out of our depths when we began our home search. However, after working with Peter, we felt confident every step of the way.',
    client: 'Shawn S.',
    context: 'Google Review — Peter',
  },
  {
    quote: 'You know you have an incredible real estate agent when you miss working with them after settlement day.',
    client: 'Kate Anderson',
    context: 'Google Review — Peter',
  },
  {
    quote: 'My husband and I are so glad we worked with Peter and Red Cedar Real Estate. Peter helped us land our perfect home in an extremely competitive seller\'s market. He was knowledgeable, patient, and responsive to our questions and concerns.',
    client: 'Quynh-Nhu Capasso',
    context: 'Google Review — Peter',
  },
  {
    quote: 'After living in Maryland for 3 years it was time to buy our first home. Not knowing many people who went through the process of buying a house...we browsed the internet for a good realtor and we came across Red Cedar Real Estate. We\'re so glad we did.',
    client: 'Monica Chung',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Working with Peter, Michaela, and the rest of the team at Red Cedar Real Estate was a great experience. Based on our limited dealings with real estate agents in the past, we were expecting a certain level of used-car salesmanship in the process, but Peter was the opposite.',
    client: 'Reina Chano Murray',
    context: 'Google Review — Peter',
  },
  {
    quote: 'I found Peter through these reviews so only appropriate to let other folks know how great a realtor he is. He was patient, personable, and knowledgeable about the homes we saw. Teaching us about different areas to look for as we went along.',
    client: 'Wen Z.',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We were lucky enough to have friends who worked with Peter & his team to find and purchase their home, so naturally they recommended him to us when we started to look for homes. They gave him glowing reviews and he more than lived up to them.',
    client: 'Jen Decker',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Short review – Client centric, Experienced, Market and Tech Savvy, Highly Recommend.',
    client: 'Brittany Heiselman',
    context: 'Google Review — Peter',
  },
  {
    quote: 'My fiancé and I just completed the process of buying our first home in an extremely challenging market and our experience in working with Peter and Red Cedar Real Estate could not be more positive.',
    client: 'Michelle Marks',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We had moved to Maryland a year ago, and Julia from Red Cedar Real Estate was recommended to us from a loan originator we met at an open house. We could not have asked for a more perfect match! Julia knows the areas really well.',
    client: 'Sara Davidson',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Peter did a fantastic job listing and selling my house in Anne Arundel County. He had excellent local market knowledge and handled everything without hassle, including home repairs needed after our inspection.',
    client: 'John Gibson',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We feel so fortunate to have found Red Cedar Real Estate!! We had an overall fantastic experience with Red Cedar and Peter Boscas in particular. We chose Red Cedar Real Estate after researching online and looking for a company that would provide both responsiveness and a personal touch.',
    client: 'Devin Dickerson',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We worked with Peter on both the selling and buying ends. On the sales side, Peter and his team provided helpful staging advice and put together a very impressive set of media to advertise the house. He was knowledgeable and professional throughout.',
    client: 'Dave Bauer',
    context: 'Google Review — Peter',
  },
  {
    quote: 'My husband and I had a wonderful experience working with Peter and his team to buy our first home a couple months ago. From our very first phone call with Peter, it was clear how experienced and knowledgeable he was.',
    client: 'Lucy Zhou',
    context: 'Google Review — Peter',
  },
  {
    quote: 'In short, I would recommend Red Cedar to anyone who is looking to buy or sell. We were thoroughly impressed with the service we received from start to finish.',
    client: 'Lizz Hammon',
    context: 'Google Review — Peter',
  },
  {
    quote: 'As a first-time home buyer, I was very nervous about making such a significant and costly purchase. Working with Red Cedar Real Estate made me feel so much more comfortable with the whole process.',
    client: 'Jessica White',
    context: 'Google Review — Peter',
  },
  {
    quote: 'When I decided to downsize, I interviewed and received presentations from several Realtors. I chose Julia Neal from Red Cedar Real Estate because she presented me with a clearly superior market and comparative home analysis.',
    client: 'NathanTa',
    context: 'Google Review — Peter',
  },
  {
    quote: 'My experience with Red Cedar Real Estate has been nothing but extremely positive. Peter Boscas and his team are extremely professional, accommodating, and knowledgeable about the home buying process from start to finish.',
    client: 'Kevin',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Peter is the absolute best out there! A total work horse for his clients, while being so professional and patient. He has tons of reliable connections from being in the game for so long too which is invaluable.',
    client: 'Jill Genovese',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We had the great pleasure of working with Julia in our first home buying experience and it couldn\'t have gone better! After preparing to buy our first home for several years, saving up, and reading about all the things that could go wrong, Julia made it seamless.',
    client: 'Jenae Cleghorn',
    context: 'Google Review — Peter',
  },
  {
    quote: 'I very rarely write reviews so when I do, it is because my experience was unbelievably horrible or exceptional beyond belief. My experience with Red Cedar was the latter. Peter is amazing!',
    client: 'Rachel W.',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Working with Red Cedar was really great. This is our first house so we came into this process not knowing anything about how the process works. Peter just took the reins and guided us every step of the way.',
    client: 'Alex Leadbetter',
    context: 'Google Review — Peter',
  },
  {
    quote: 'I needed a new realtor after dealing with one that wasn\'t responsive or thorough when I wanted to put an offer for a rental property in Baltimore. I saw the great reviews for Peter and contacted him. After working with him for 2 months he found the right property.',
    client: 'Charles Kasenge',
    context: 'Google Review — Peter',
  },
  {
    quote: 'I had an excellent time with Peter. He initially met with me to see what I was looking for and get to talk to me. Then sent me a list of properties to critique. Then we visited places that both he and I found interesting.',
    client: 'Justin Lehman',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Peter did a fantastic job as my selling agent. My condo had an offer in just a few days and we were able to close the deal in under a month. He was able to provide great advice along the way and I couldn\'t be happier with his service.',
    client: 'Anthony Sekellick',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We found Peter at Red Cedar Real Estate because we had been working with another realtor who left a lot to be desired. We did some searching around and Peter had a lot of great reviews, and he lived up to every one of them.',
    client: 'Shaun Wrightson',
    context: 'Google Review — Peter',
  },
  {
    quote: 'This is the real estate company you want. Don\'t be fooled by the others. Our townhouse in Laurel was in immaculate condition and Peter advised us about a few very minor adjustments. We followed his lead and glad we did.',
    client: 'Michael Lawrence',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Peter and Red Cedar Real Estate is where it\'s at. To start, Peter listens; he truly listens. We worked backwards from our existing needs and he was patient enough to help us find exactly what we wanted.',
    client: 'Jennifer McCarthy',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Julia is everything that you would want in a realtor and more! From her calm but very knowledgeable personality, to feeling like you were her ONLY client, Julia was simply perfect to work with.',
    client: 'Emily Taylor',
    context: 'Google Review — Peter',
  },
  {
    quote: 'As a first time home buyer, I wanted to work with an agent who was going to be patient, attentive, knowledgable, and reliable. I was extremely nervous about making the plunge, but I am so glad I did it with Peter.',
    client: 'Alexander Harris',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We had the pleasure of working with Julia to find our dream home over the last few months, and we would ABSOLUTELY recommend her to anyone looking to buy or sell a home! She is knowledgeable, honest, and trustworthy.',
    client: 'Nina T.',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We did a lot of research before we ended up choosing Peter Boscas as our Realtor. We talked with friends and did our due diligence. The reality is he exceeded our already high expectations.',
    client: 'Colin Cunningham',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We recently bought our first house, and Julia Nyman was there to help us every step of the way. I really enjoyed how she gave us the tools to sift through the vast ocean of property listings from the comfort of our living room.',
    client: 'Ian Andrews',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We had a great experience working with Red Cedar to buy our first home in Baltimore County. Peter was helpful, patient, and very responsive to questions. Peter clearly loves what he does and it shows in the quality of his business. Highly recommended!',
    client: 'Anna',
    context: 'Google Review — Peter',
  },
  {
    quote: 'The knowledge and expertise that Peter Boscas brought to our home buying experience was extremely helpful for inexperienced home buyers. He was able to identify potential issues that we overlooked because we were caught up in the emotional side of buying a home.',
    client: 'Meghan Dibble',
    context: 'Google Review — Peter',
  },
  {
    quote: 'I had never heard of Red Cedar until I started the process of becoming a first time home buyer. I interviewed quite a few agents with different companies and Peter stood out from the very beginning.',
    client: 'Richie Steinwand',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We feel very fortunate to have found Red Cedar Real Estate. Peter really listened to our goals and took as much time as needed to answer our questions. He was very responsive and flexible. Even after we closed, Peter has taken the time to help.',
    client: 'Michal Rachlin',
    context: 'Google Review — Peter',
  },
  {
    quote: 'I can\'t say enough how much we enjoyed working with Peter. He was responsive, attentive, and professional. His experience and expertise working within our area allowed him to explain the process, price our home to sell, and market it.',
    client: 'Christopher Emmens',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We highly recommend using Peter as a real estate agent. He did a great job for us. If he says he\'s going to do something, he does it. He made the process very simple and straightforward for us.',
    client: 'Kevin Maroney',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Julia is amazing! She is very thorough and extremely knowledgable about selling/buying homes. Julia helped us sell our previous home in less than 2 weeks and now we are working with her and under contract on our new home!',
    client: 'Hannah Ainsworth',
    context: 'Google Review — Peter',
  },
  {
    quote: 'I called Julia based on a recommendation from a coworker, and I\'ve already recommended her (and Red Cedar) to another coworker. Buying my first house seemed daunting, but Julia helped put my worries to ease by explaining everything.',
    client: 'Justin Reigle',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Red Cedar Real Estate has made me a customer for life. Their service and work for you is another whole magnitude better than anyone else we\'ve ever done real estate with.',
    client: 'Johann Jung',
    context: 'Google Review — Peter',
  },
  {
    quote: 'My husband and I wanted to buy our first home so we called Amanda Autry. This was the best choice we have made! Amanda helped us find houses with both of our needs in mind within our budget. She never tried to just "sell a house".',
    client: 'Tiffany Nicole',
    context: 'Google Review — Peter',
  },
  {
    quote: 'I closed on my home a few weeks ago and worked with Emily Jang at Red Cedar throughout the process. She was incredible and personable and knew my style and asked all the right questions.',
    client: 'Tamar June',
    context: 'Google Review — Peter',
  },
  {
    quote: 'After having had NO success with a previous realtor in a booming market, we were feeling lost and defeated. Once we found Julia, at Red Cedar Real Estate, we found hope again and ultimately our dream home.',
    client: 'Ariel Grinspoon',
    context: 'Google Review — Peter',
  },
  {
    quote: 'I am a commercial real estate broker. I needed to retain a residential broker to locate a new residence. After interviewing a few agents, I chose Peter to represent me. And the choice was on target. Peter is knowledgeable, honest and trustworthy.',
    client: 'Jack Ross',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Red Cedar will turn your daunting deal into an effortless endeavor! I have to thank Peter and Meghan for their efforts. They made things as easy as "Point n Click".',
    client: 'Kevin Usta',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Amazing experience! Molly was a pro, and guided us through the entire process. All the small touches like the beautiful sign, beautiful photography, custom website, etc. made Red Cedar feel like a luxury service.',
    client: 'Paul Fornia',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Kay and I met Julia at an open house. We were so impressed by her professionalism and honesty, we made the easy decision to work with Julia. As first-time homebuyers, she guided us through everything.',
    client: 'Cyndi Crowl',
    context: 'Google Review — Peter',
  },
  {
    quote: 'This was truly a great company to work with when purchasing my first home! Julia and Molly worked with me through all of it and were absolutely wonderful! I felt like I was in really good hands.',
    client: 'L G',
    context: 'Google Review — Peter',
  },
  {
    quote: 'It was a stroke of luck to find Peter Boscas. I am out of state, not well-versed in the real estate world, and needed to sell a property in Maryland. Peter could not have been easier to work with, more responsive, or more forthcoming with good advice. Really, just a pleasure. Highly recommend!',
    client: 'Jake W.',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We located Peter on yelp given his great reviews. With a cross-country move and knowing nothing about MD, we needed someone we could rely on to own the process. He was responsive and thorough.',
    client: 'Erin DeBisschop',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We worked with Peter Boscas and Red Cedar for our first home purchase. Definitely recommend them; Peter was easy to work with and was extremely knowledgeable about the whole process.',
    client: 'John Farel',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Peter sets the gold standard for realty when it comes to quality, service, and commitment. Peter provided excellent guidance when it came to pricing and marketing.',
    client: 'John St. John',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Red Cedar Real Estate is the place to go to, hands down! Peter is extremely professional, always responsive and very easy to work with.',
    client: 'Parrish Staples',
    context: 'Google Review — Peter',
  },
  {
    quote: "Couldn't have asked for a better realtor than Emily. You know you're in good hands when she calls you to check in on her day off when she's not supposed to be worrying about you. Highly recommend!",
    client: 'Marco Romero',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Amanda did a great job selling our first home which was a full-time job in its self as well as helping us through our new home build!',
    client: 'Ashley Barger',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Peter provided the best real estate transaction my husband and I have ever experienced. He is personable, honest, patient and incredibly knowledgeable about real estate. He is very responsive to calls, questions etc and is an absolute pleasure to work with.',
    client: 'Lola S.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'Peter is so down to earth and was really easy to get along with. He is always responsive to e-mails and is just a phone call away. He certainly goes above and beyond to assist with any questions. As first time home-buyers and as a young couple, he made the process seem seamless.',
    client: 'Betty R.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'There is no doubt in my mind who I will contact when I\'m ready to purchase my second home and that is Peter Boscas. He is professional, knowledgeable, honest, and has a great sense of humor. Overall he is one of the best Realtors in the DC area.',
    client: 'Antoine B.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'Peter Boscas is truly an excellent Realtor. He\'s sharp, responsive and a fantastic negotiator. He honestly looks out for his clients in a way that makes you realize how lucky you are to have him on your side.',
    client: 'Velvet- D.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'Peter made our home-buying experience pleasant and easy. He stuck to our criteria and was very thorough. He didn\'t put any pressure on us to find something that didn\'t meet our needs. He promised us from the beginning that he wanted us to get every single thing that we wanted and that\'s what we ended up with.',
    client: 'Dorothy A.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'To say the least, I strongly recommend Peter Boscas for all real estate-related services. He is truly a professional, experienced, and knowledgeable real estate agent, who made my first homebuyers experience as smooth as possible.',
    client: 'Sani S.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'We used Peter for both selling our home in MD and buying a home in DC. Peter is an extremely knowledgable, patient, and helpful agent - a rare find! He sold our house in MD very quickly, and negotiated a fantastic deal for us.',
    client: 'Sian F.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'I would wholeheartedly recommend Peter Boscas for any kind of real estate transaction you\'re going to do. He actually restores my faith in this entire industry. He\'s the future of real estate. That\'s about the best way that I can put it.',
    client: 'Julian C.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'Peter helped us find our dream townhouse back in 2021, and we couldn\'t have asked for a better experience. From day one, he truly listened to our needs and gave thoughtful recommendations about what would be a good long-term investment versus what might end up being a money pit. Thanks to his guidance and expertise, we ended up getting our top-choice home in just eight days!',
    client: 'Sarah A.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'I just purchased my first home, and Peter could not have been more helpful. He was professional, attentive, thoughtful, hard working, patient, gave great advice, and was always available. He is extremely knowledgeable about real estate.',
    client: 'P B.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'Working with Peter and his team was great! We had a townhouse in Baltimore that we wanted to sell, but we\'re non-local. Peter walked us through the entire process and kept us in the loop from start to end.',
    client: 'Kenneth L.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'This was our first home buying purchase and we went with Peter Boscas. I have to say this was the most stress-free, easy process that we\'ve ever gone through.',
    client: 'Adam B.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'Peter is an expert at pricing. He does his research and has an excellent grasp on how to structure and negotiate offers based on true market value, comps, neighborhood, location and property conditions. He is trustworthy, reliable and very responsive. We truly feel like Peter had our best interests at heart.',
    client: 'Dorit F.',
    context: 'Yelp Review — Peter',
  },
  {
    quote: 'We feel so fortunate to have found Red Cedar Real Estate. Peter really listened to our goals and took as much time as needed to answer our questions. He was very responsive and flexible. His laid back approach allows the client to look at a property and form an opinion without being pushed.',
    client: 'Lisa D.',
    context: 'Yelp Review — Peter',
  },
  // --- Joe reviews ---
  {
    quote: 'Joe Bird did something my other realtor couldn\'t manage. After two attempts with a previous realtor I called Joe for his guidance. Joe sold my home in a week! He and his team have great marketing strategies. Joe goes above and beyond for you.',
    client: 'Robin Edgemon',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe was absolutely amazing to work with as first time home buyers!! Our family recommended him as a Realtor. We were in the middle of getting married while looking for a house and Joe was great at working around our busy schedules!',
    client: 'Sydne Owens',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe Bird did a fantastic job as our realtor. Thanks to Joe\'s advice, our very first offer was accepted. He also recommended numerous other fantastic professionals within his network, simplifying our tasks considerably.',
    client: 'Xander Ready',
    context: 'Google Review — Joe',
  },
  {
    quote: 'BIRD is the word! Working with Joe Bird and the Bird Realty Team has been an absolute joy… twice now! Joe helped me buy my previous home and recently guided us through purchasing our high-end dream home, and both times, he brought unmatched expertise, sharp market instincts, and a calm confidence.',
    client: 'Travis Whitcomb',
    context: 'Google Review — Joe',
  },
  {
    quote: 'I have worked with Joe Bird for over 10 years. I refer all of my customers to him in the Maryland region. Joe is a true professional and goes above and beyond for all of his clients. He knows the market and advocates for his clients.',
    client: 'Thomas Pope',
    context: 'Google Review — Joe',
  },
  {
    quote: 'I had an amazing experience working with Joe and Lauren while finding and purchasing my condo this year. Joe was incredibly knowledgeable and took the time to walk me through the process step by step.',
    client: 'Chad Zamarron',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe Bird sets the standard for real estate service in Howard County. His market knowledge is deep, his communication is consistent, and his execution is disciplined. If you\'re buying or selling and want someone who operates with integrity, clarity, and results-driven focus, Joe Bird is the benchmark.',
    client: 'Ron Howard',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe was an outstanding realtor from start to finish. He did a great job offering insight and advice when it was needed, but never pushed his own opinions. Communication was one of his biggest strengths.',
    client: 'Christopher Bell',
    context: 'Google Review — Joe',
  },
  {
    quote: 'It was an amazing experience from start to finish. Very responsive team and a great person Joe is. Joe suggested the price we should ask for which was to the exact cent. And we still sold above.',
    client: 'Emmanuel Tesfaye',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe and his Bird Team associates provided superb guidance and assistance for the sale of my home. Joe\'s recommendations as to whether it was smart to invest in upgrades, given the nature of the changing market, were critical to the timing of the sale.',
    client: 'Bruce F.',
    context: 'Google Review — Joe',
  },
  {
    quote: 'So here\'s the deal. Joe was a terrific realtor for us in Anne Arundel county. He knew when to talk numbers, when to push for answers, and pros and cons of the realities of selling a property. I won\'t use another real estate agent as long as he\'s in business.',
    client: 'JG Miller',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe Bird is a fantastic real estate agent. As a first-time home buyer, he walked me through the entire process. Not only does he know the housing market well, he also has hands on experience with home repair, so he was able to point things out that we certainly would\'ve missed.',
    client: 'Kenta S.',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Selling our home with the realtor Joe Bird was a real pleasure. Quick to respond! Great communicator!! Joe was knowledgeable about houses and would tell us things that were great about the house and things that could be a problem down the road.',
    client: 'Sharon Addario',
    context: 'Google Review — Joe',
  },
  {
    quote: 'I\'ve been working with Joe since I bought my first house in Columbia, MD, back in 2019. Joe has now helped me navigate a total of 3 home purchases and 2 home sales. He\'s extremely knowledgeable, responsive, works hard, and has gone above and beyond on multiple occasions.',
    client: 'Becky Menendez',
    context: 'Google Review — Joe',
  },
  {
    quote: 'We connected with Joe a couple years ago after he quickly sold a neighbor\'s home in Columbia, MD. After just one weekend, we received multiple offers. Joe guided us through a successful and easy closing process.',
    client: 'Holly Bramble',
    context: 'Google Review — Joe',
  },
  {
    quote: 'After 20 years in real estate and having worked with countless agents through many transactions, I can say with confidence, they\'re not all easy, and who you work with matters. Joe Bird and his team were exceptional from start to finish.',
    client: 'Jaime Gervasi',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe is an amazing Realtor and a genuine, friendly, honest and just all around lovely person. He stuck with me through thick and thin... through hundreds of houses. He\'s just truly the BEST out there.',
    client: 'Lindsay Currotto',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe was a pleasure to work with because he made the complicated selling of our home seamless and stress free. Our house was listed and sold in less than 7 days. Joe made sure we received more than we asked for.',
    client: 'Deneen Farrell',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe and his team were amazing to have on our side during our search for our Forever Home! His knowledge, patience, flexibility, and friendly personality were everything we could have hoped for in a Realtor.',
    client: 'Kerrie Moyer',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe and his team helped my wife and I sell our house at Ellicott City recently. Their knowledge of the local market was outstanding, and they went above and beyond to make the selling process smooth and stress-free.',
    client: 'Xiao-Ming Du',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe was incredible to work with. He is super knowledgeable about everything. He knows what to look for and checks everything you may not even think to look for. Thank you so much Joe for helping us find our dream home!',
    client: 'Christina Dewhurst',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe has gone above and beyond, helping us through many pre-listing and purchasing decisions. He even did video walk throughs of houses in MD for us since we were in FL. Thank you so much Joe.',
    client: 'Shawn Henson',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe Bird did a great job as our sales agent. His pricing strategy paid off as we got several offers over our asking price in the first four days. We highly recommend Joe and his team.',
    client: 'Michael Panich',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe and his team have now helped me buy 2 homes and sell one. His level of service is even better now with a full team. He never tried to push me into something I couldn\'t afford. Always provides honest opinions and feedback.',
    client: 'Paul Childress',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe is a rock star - he was responsive and provided helpful information to guide me through the process. He gave an honest assessment, sound advice every step of the way, and helped ensure a smooth closing. He really went above and beyond.',
    client: 'Bessie Yang Lewis',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe was great through the whole process of me purchasing my new home. Joe is knowledgeable, thorough, and patient. Most importantly, Joe was always there when I needed him.',
    client: 'Leonard Salahud Din Jr',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe is an absolute rockstar and without his help and guidance we would probably still be renting instead of owning a house. As first time home buyers we were very nervous but Joe was always there to help us through.',
    client: 'Cristina Linde',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe Bird was a realtor you could truly trust. Communication was always constant and fast responses. His knowledge and experience in the profession really shown through in the end.',
    client: 'Rachel Grickis',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe Bird is the best agent I know. As a real estate investor, I come across hundreds of agents and there are very few I will put in the same category with him. The amount of knowledge and expertise he has is unmatched.',
    client: 'Michael Allen',
    context: 'Google Review — Joe',
  },
  {
    quote: 'I have worked with Joe selling two homes and buying a home. His understanding of the market, and his knowledge of the buying and selling process were key in getting a fair deal.',
    client: 'Jeremy Bollman',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe was very responsive and knowledgeable. My experience with him was outstanding, because of his dedication and due diligence. After we got the house prepared for staging, it was under contract within 7 days.',
    client: 'A.P. Williams',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe Bird is a wonderful realtor who made our buying & selling process a breeze! He is very knowledgeable about each part of the home buying process. My favorite thing about working with Joe is that he treated us as individuals.',
    client: 'Maxine Morrow',
    context: 'Google Review — Joe',
  },
  {
    quote: 'We worked with Joseph to buy a home in Baltimore County. He was responsive and flexible. Joseph is a knowledgeable and practical realtor and we were lucky to have him as our buyer agent.',
    client: 'Stephen Monaco',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe Bird has helped my wife and I both buy and sell a home. Both times he was extremely helpful, personable, and always available. Even now he still regularly checks in on us.',
    client: 'Brandon Hardisty',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Professional, knowledgeable, and responsive. Years after our first interaction, he still helps me with questions and additional house-hunting. I\'ve seen many of the houses he puts on the market sell within days, including mine.',
    client: 'Hanny Martinovici',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe was our realtor when purchasing our first home. He is down to earth, kind, and super knowledgeable. He consistently had our best interests in mind and pointed out potential concerns with homes while touring them.',
    client: 'Betsy Cross',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Buying a house is stressful—let alone a first house—but Joe helped us through each step, from beginning to close. Joe knew his stuff, explained it clearly, and was committed to finding the best fit for us.',
    client: 'Dan Ciarrocchi',
    context: 'Google Review — Joe',
  },
  {
    quote: 'A conscientious and expert agent to guide the way makes a huge difference. Joe Bird is that guy. One of the most impressive things about Joe was that throughout the entire process, he responded to messages within one hour.',
    client: 'Gerard Walsh',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Joe Bird was extremely helpful, responsive, and friendly throughout our home buying process. It was great to have someone who could tell how old a roof and smoke detectors were just by looking at them!',
    client: 'Emily Williams',
    context: 'Google Review — Joe',
  },
  {
    quote: 'I am fortunate enough to work with Joe on the lending side. I have worked with many realtors and Joe is at the very top of the list. His contracts are flawless due to his knowledge of home buying and his attention to detail is amazing.',
    client: 'Jean Butera',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Honest, trustworthy and knowledgeable are just a few adjectives I would use to describe Joe Bird. In my professional relationship with Joe, I have seen his dedication to his clients, his expertise, and his motivation to be a leader in his industry.',
    client: 'Brian Phillips',
    context: 'Google Review — Joe',
  },
  {
    quote: 'Through the recommendation of our credit union, Joe helped us buy our first home in 2013, sell that home 5 years later, and helped us purchase our dream home! We have developed a great friendship with Joe over the years.',
    client: 'Lance L.',
    context: 'Zillow Review — Joe',
  },
  {
    quote: 'Joe Bird is the absolute best. He\'s extremely knowledgeable and I always felt like he had my back. Our move was done from across the country and I truly felt absolutely no stress surrounding this process.',
    client: 'Kerri Midiri',
    context: 'Zillow Review — Joe',
  },
  {
    quote: 'Joe provided excellent guidance throughout the process of selling our home. His expertise was invaluable in setting realistic price points, negotiating with buyers, and keeping the process on course.',
    client: 'Ted Ahmanson',
    context: 'Zillow Review — Joe',
  },
  {
    quote: 'I had an outstanding experience working with Joe Bird on selling my home in Westminster, MD. Joe was very professional, helpful and responsive during the process, always willing to help and answer any questions I had.',
    client: 'Joe Beall',
    context: 'Zillow Review — Joe',
  },
  {
    quote: 'Joe was amazing in helping us find our new home. He was very knowledgeable about houses in general and definitely knew the market very well. He knew exactly what we needed to do to make our offer stand out.',
    client: 'Ali I Dia',
    context: 'Zillow Review — Joe',
  },
  {
    quote: 'Hands down the best realtor I\'ve had. Joe was very approachable and friendly. He was amazing to work with and was always willing to setup appointments around my busy work schedule no matter how inconvenient.',
    client: 'Ryan Omalley',
    context: 'Zillow Review — Joe',
  },
  {
    quote: 'Joe was awesome. He assisted us in selling our old house. The house sold in 36 hours over asking price. As stressful as the process was, Joe was supportive and responsive throughout leading to a positive outcome.',
    client: 'Patricia',
    context: 'Zillow Review — Joe',
  },
  {
    quote: 'Joe was great to work with. He is extremely knowledgeable about homes and was able to point out details that we never would have noticed ourselves. We listed our home with him and were under contract within a week.',
    client: 'Nick Serio',
    context: 'Zillow Review — Joe',
  },
  {
    quote: 'Joe made himself available for every property we wanted to see, and we never felt like we were second place to anyone else. Everything was so well organized from start to finish and the closing process was very smooth.',
    client: 'Laurie',
    context: 'Zillow Review — Joe',
  },
];

export function TestimonialsSection() {
  const testimonials = useMemo(() => pickRandom(TESTIMONIALS, 10), []);
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="section-padding bg-warm-white">
      <div className="container-narrow">
        <FadeIn className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">
            Client Stories
          </p>
          <h2 className="text-display text-3xl md:text-4xl text-charcoal">
            What Our Clients Say
          </h2>
        </FadeIn>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <Quote className="h-10 w-10 text-cedar/20 mx-auto mb-8" />
              <blockquote className="text-editorial text-xl md:text-2xl lg:text-3xl text-charcoal leading-relaxed mb-8 max-w-3xl mx-auto">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>
              <div>
                <p className="text-sm font-semibold text-charcoal">
                  {testimonials[current].client}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[current].context}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border hover:border-cedar hover:text-cedar transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-muted-foreground tabular-nums">
              {current + 1} / {testimonials.length}
            </span>
            <button
              onClick={next}
              className="p-2 rounded-full border border-border hover:border-cedar hover:text-cedar transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
