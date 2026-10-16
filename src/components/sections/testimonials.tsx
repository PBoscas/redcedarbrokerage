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
    quote: 'Working with Peter and the rest of the team at Red Cedar Real Estate was a great experience. Based on our limited dealings with real estate agents in the past, we were expecting a certain level of used-car salesmanship in the process, but Peter was the opposite.',
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
    quote: 'As a first time home buyer, I wanted to work with an agent who was going to be patient, attentive, knowledgable, and reliable. I was extremely nervous about making the plunge, but I am so glad I did it with Peter.',
    client: 'Alexander Harris',
    context: 'Google Review — Peter',
  },
  {
    quote: 'We did a lot of research before we ended up choosing Peter Boscas as our Realtor. We talked with friends and did our due diligence. The reality is he exceeded our already high expectations.',
    client: 'Colin Cunningham',
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
    quote: 'Red Cedar Real Estate has made me a customer for life. Their service and work for you is another whole magnitude better than anyone else we\'ve ever done real estate with.',
    client: 'Johann Jung',
    context: 'Google Review — Peter',
  },
  {
    quote: 'I am a commercial real estate broker. I needed to retain a residential broker to locate a new residence. After interviewing a few agents, I chose Peter to represent me. And the choice was on target. Peter is knowledgeable, honest and trustworthy.',
    client: 'Jack Ross',
    context: 'Google Review — Peter',
  },
  {
    quote: 'Red Cedar will turn your daunting deal into an effortless endeavor! They made things as easy as "Point n Click".',
    client: 'Kevin Usta',
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
  // --- Brian reviews ---
  {
    quote: 'My coworker recommended Brian to me. And after working with various realtors previously, I would have to say Brian and his team is by far the best realtor team I\'ve seen.',
    client: 'B C',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian was great to work with. We used him as both our buying and selling agent. He was able to sell our home quickly at the price we wanted. The website and brochures were very professionally done.',
    client: 'Young Sik Yu',
    context: 'Google Review — Brian',
  },
  {
    quote: 'This is the first time my husband and I were selling a home--needless to say, we were quite inexperienced and nervous. All the reviews about him are spot on. From start to finish, Brian was the consummate professional.',
    client: 'Sharada Modur',
    context: 'Google Review — Brian',
  },
  {
    quote: 'I worked with a few relators, Brian is by far the best I\'ve dealt with. Working w/ him was a pleasure, he was always there to answer any questions or address any concerns I had.',
    client: 'Matt Allen',
    context: 'Google Review — Brian',
  },
  {
    quote: 'We found Brian based on reputation, and he and his team lived up to the high expectations I had! He helped us sell our house in a very short time for more than we originally listed for, which was more than I ever expected to get for the house.',
    client: 'Carrie Dunn',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian is absolutely outstanding! His expertise guided us smoothly through the process of selling our first home. We didn\'t have much time (we listed in April and needed to move out of state in June)!',
    client: 'Threya Ober',
    context: 'Google Review — Brian',
  },
  {
    quote: 'I met Brian Pakulla when he moved into a community I manage about 15 years ago. His energy, commitment and community spirit has impressed me from day one. He joined the Board of Directors and has served the entire 15 years.',
    client: 'Cathy Powder Wagner',
    context: 'Facebook Review — Brian',
  },
  {
    quote: 'Brian is a terrific realtor and cares greatly for his community. I\'d highly recommend him for all of your realty needs!',
    client: 'Linda Lucy',
    context: 'Facebook Review — Brian',
  },
  {
    quote: 'Brian made our selling process clear and easy. He explained things throughout the process and was very available whenever we had questions or clarification. He understood the nuances of our market like no other realtor that we met with.',
    client: 'Brett Meliti',
    context: 'Google Review — Brian',
  },
  {
    quote: 'We interviewed a few agents before Brian. We ultimately decided to work with Brian because of his stats. Stats do not lie! He priced the house right and we got an offer pretty much within the first few hours of listing.',
    client: 'Geanie',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian is extremely knowledgeable about Woodland Village and provided great advice and guidance while being able to hear and address my concerns and perspective throughout the selling process.',
    client: 'Mia Molfino Posner',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian sold our home in Ellicott City, MD. He and his team were extremely helpful throughout the process. They explained all of the paperwork well ahead of time and gave insightful recommendations and advice.',
    client: 'Paula Kara',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian Pakulla and his team were everything we expected and more! Brian is honest, hard working and efficient. His experience in the field is invaluable and real estate is most definitely his niche.',
    client: 'Valerie Brady',
    context: 'Facebook Review — Brian & Ryan',
  },
  {
    quote: 'Working with Brian Pakulla was a great experience. He worked with us to understand the market, on recommending changes and updates for our house, and on finding the right time to list it.',
    client: 'Andrea Black',
    context: 'Google Review — Brian',
  },
  {
    quote: 'We are very happy with Brian Pakulla during the process of selling our house. He is very professional, knowledgeable, and easy to work with. He knows the market so well that with his strategy and appropriate pricing, we were able to sell our house in 18 days!!',
    client: 'Soudabeh Khojasteh Banankhah',
    context: 'Facebook Review — Brian',
  },
  {
    quote: 'Brian and his team provided excellent service in helping the sale of our home. He helped us navigate through the lengthy process and was always available to answer any questions we had.',
    client: 'Brenda Tsai',
    context: 'Facebook Review — Brian',
  },
  {
    quote: 'I cannot begin to tell you how happy I was that I listed my house with Brian. Everything was first class. The listing was well written with beautiful photography and brochures.',
    client: 'Kevin Callahan',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian Pakulla and his team were excellent to work with. We cannot say enough GREAT things about our experience. Brian helped us navigate through the sale of our home and purchase of our new dream home right as the COVID-19 pandemic hit.',
    client: 'Niki and Kenny Watson',
    context: 'Google Review — Brian',
  },
  {
    quote: 'I can\'t say enough about how amazing Brian and his team were when my family decided to buy and sell. He is extremely knowledgeable about the housing market and offers amazing advice without being pushy.',
    client: 'Gabe Unterman',
    context: 'Facebook Review — Brian',
  },
  {
    quote: 'Brian and his team were a blessing in our life. He\'s very pleasant and has great communication skills, and he patiently addressed all our concerns. The whole process was totally stress free.',
    client: 'Sara Jinu',
    context: 'Google Review — Brian',
  },
  {
    quote: 'I would highly recommend Brian. Thanks to him and his team we sold our house at a very good price without any difficulties. He was very systematic, clear and thorough with all parties and this ensured a smooth sales process.',
    client: 'Gautam Chatur',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian is great, highly recommended. We needed to sell our childhood home, built in 1979 with some unusual age-related issues. Brian gave solid advice, was super responsive, walked us through the process and in the end, we got multiple offers and sold the house \'as is" in less than a week for 5% above asking.',
    client: 'David Hantman',
    context: 'Google Review — Brian',
  },
  {
    quote: 'We are so appreciative of the professionalism and responsiveness of Brian and his team. We needed to operate under a very tight deadline, and Brian exceeded our expectations with a sale within days and a price point that we did not think we would attain.',
    client: 'Kathy Gustafson',
    context: 'Google Review — Brian',
  },
  {
    quote: 'My wife and I intended to interview 3 realtors before choosing someone to sell our home. We sent 3 inquiries and received a response from Brian within minutes. He offered to meet with us the next day.',
    client: 'Brian Kiesel',
    context: 'Google Review — Brian',
  },
  {
    quote: 'We spoke to several realtors before we selected Brian. Brian came with data, facts, and advice. He was honest and open and available pre-sale during sale and after sale and did not mind answering our numerous questions no matter how complicated or silly they were.',
    client: 'Michael Deamer',
    context: 'Google Review — Brian',
  },
  {
    quote: 'From the first meeting that I met with Brian he told me exactly what I could expect and things worked out exactly as planned. They kept me informed with every step in the process and were always quick to answer any questions I had.',
    client: 'Kevin Benner',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian was helpful and responsive in the entire sale process. He made candid recommendations regarding readiness of the house for sale and movers and storage. I moved out before he listed the house and he handled the entire process.',
    client: 'Tina',
    context: 'Google Review — Brian',
  },
  {
    quote: 'This was the easiest property transfer ever for us, out of about 8 buy/sell events. We had a condo in Ellicott City to sell, we saw Brian had sold many condos in that area, so we called him.',
    client: 'BMSinMD',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian just sold my second house in 4 years. He\'s always responsive, professional, friendly and of course effective. He gives excellent advice and I\'d recommend him to anyone!',
    client: 'Jessica Mook Nachtman',
    context: 'Google Review — Brian',
  },
  {
    quote: 'We recently enlisted Brian Pakulla to assist us in selling our home in Columbia. Brian is refreshingly open, honest and responsive. He never missed a beat when we were in the throes of overwhelming interest within a tight timeframe.',
    client: 'Jen Lenerd',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian and his team were extremely professional and responsive to our questions and needs. He successfully negotiated us an offer well above the asking price. He constantly kept us informed on the progress of the closing which brought peace of mind since we relocated out of the Ellicott City area just after the offer was accepted.',
    client: 'Ken and Sue Harrison',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian and the Pakulla Team made selling a breeze. They kept us on track from listing to settlement. We certainly chose the right realtor.',
    client: 'Barbara donlan',
    context: 'Google Review — Brian',
  },
  {
    quote: 'We were very pleased with Brian and his team. In our initial meeting with him, it was obvious that his grasp of the Howard County and regional market is excellent - he provided great data and used that to help us understand the process for selling our home and set realistic expectations.',
    client: 'Jeff Lockard',
    context: 'Google Review — Brian',
  },
  {
    quote: 'This is our 2nd time using Brian and his team and they were just as great to work with this time around. Brian is always super responsive and is extremely knowledgable about the market and the strategies to yield the best return.',
    client: 'Kimmeria Hall',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian is extremely professional, knowledgeable, and made selling our home significantly less stressful.',
    client: 'Jacob Reinhold',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian sold my house for above asking price within a week of listing it. He told me what to expect and everything played out as he predicted.',
    client: 'Rona Lawson',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian and his team were great to work with. He was able to get our house sold on time under a tight schedule. His knowledge and experience are unmatched and helped us get through the process very smoothly.',
    client: 'Tareq Nabeel',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Great working with Brian and his team. They were quick to answer our questions and would always get back to us in a timely fashion. The team knew the market and the updates that the house needed to sell at the best price point for us, once we completed them it sold over a long weekend.',
    client: 'Mike',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian and his assistant, Kristin are an amazing team of incredible professionals. They went the extra mile in each and every turn of the process, making it much easier on me and my family.',
    client: 'Danuta Hinc-Powell',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Me and my husband signed on with Brian for the purchase of our new build, as well as the sale of our former home. Brian is the best in the business! If you want an experienced, professional and quality realtor, he\'s your man.',
    client: 'Ardena Henderson',
    context: 'Google Review — Brian',
  },
  {
    quote: 'We love Brian, definitely the one to go to for great service and the best deal!',
    client: 'Katie Perez',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Worked with Brian and his stellar team to sell my condo rental property. Brian\'s professionalism made the entire process easy and smooth with no surprises.',
    client: 'Charity Goodwin',
    context: 'Google Review — Brian',
  },
  {
    quote: 'We listened to his advice on making our house more marketable because he backed up his advice with good, sound reasoning. He knows what sells and what does not. Brian sold our home very quickly for much more than our listing price.',
    client: 'Paul Looper',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian sold my parents\' house in EC. Excellent. Knew the market, the neighborhood and comps. Advised on what were the key things needed to prep the house and what things were not good ROI.',
    client: 'Mukund Krishnaswami',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian and his team did an outstanding job in helping to sell our property in less than a week and with an above asking price contract. I would highly recommend them.',
    client: 'zmann01',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'Brian is wonderful. He is very professional and also very caring to his clients needs. He made my mom very comfortable when she put her house on the market and helped her through the whole process.',
    client: 'Erin Kell',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian made the entire process a breeze. House was under contract in under a week!',
    client: 'Derek Sanders',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian was great to work with! He responded so timely each time, which was key since we had to move fast! His priority was finding what was right for us, and he took the time to really understand that.',
    client: 'Urmi Cholera',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian is a fantastic real estate agent. After we reached out to Brian based on his stellar reviews, he came to our home to meet, guided our family through the entire process, and listened to our needs.',
    client: 'Courtney Elgayar',
    context: 'Facebook Review — Brian & Ryan',
  },
  {
    quote: 'Brian and his team did an amazing job with the sale of our home, so knowledgeable, prompt, great communication, easy to work with on all fronts. As well, he helped us navigate a most challenging new home buying experience.',
    client: 'jwallop1',
    context: 'Google Review — Brian',
  },
  {
    quote: 'I recently listed and sold my home with Brian Pakulla. Brian was able to get multiple offers the first weekends. Everyone I dealt with on Brian Pakulla\'s team were excellent and kept me updated on the process, all the way til the house was sold.',
    client: 'Mike Mianulli',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian and his team are phenomenal. He helped us buy a new construction home, and sell our prior home. He was with us every step of the way, providing insight, advice, and guidance.',
    client: 'Jeff Swenson',
    context: 'Google Review — Brian',
  },
  {
    quote: 'We have worked with Brian Pakulla and his team for over 20 years and have always had a great experience! They made the selling process for our recent home so easy and helped us understand what was happening every step of the way.',
    client: 'hpittenger13',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'We cannot say enough good things about Brian and his team. He helped us purchase and build a home and sell our existing home. The amount of time he spent with us as we built our home, long after the purchase itself, was beyond every expectation we had, his attention to detail unparalleled, and his advice invaluable.',
    client: 'kshardway',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'If you are searching for an agent who understands the MD housing market, has a proven track record in moving real estate, and is always available to help - look no further than Brian Pakulla and his team of experts.',
    client: 'trimblealina',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'Brian was great to work with and made me feel very comfortable as this was my first time selling. His knowledge of the market and recommendations on house "fix-ups" proved invaluable and helped make the process seamless for me.',
    client: 'Michael Wesdock',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian Pakulla provided excellent support in helping me understand the process of selling my house, preparing the house for sale, and executing the sale. His experience and expertise were instrumental to effectively working any issues as they arose and completing the sale quickly and efficiently.',
    client: 'Willard Bartlett',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian was recommended highly by a former neighbor. He provided excellent service and advice even before I officially signed up for his services. He and his staff were always available for questions and assistance if needed.',
    client: 'radopp',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'Brian Pakulla Real Estate is amazing. We bought our home through them and recently sold it through them. They are extremely knowledgeable on pricing and making things so easy!',
    client: 'T. Ellis',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian and team were fantastic. It was a pleasure working with them. Brian offered excellent advice from timing of selling, what to fix and what to leave as is, and how to price just right.',
    client: 'elexsor',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'Brian did an amazing job of helping us sell our house. We were under a short timeline and he was able to come in and quickly help us get our house staged and pictures taken very professionally.',
    client: 'npnirschl',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'Brian is an outstanding professional who exceeded all expectations. Reliable, trustworthy, and incredibly resourceful, his team made the home-selling process stress-free.',
    client: 'mattpj40',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'Brian was readily available, answered questions in terms we could understand. Support staff rates A+++. House sold in 3 days for $50,000 over asking',
    client: 'tandbkerr1',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'Brian and his team were outstanding. With his knowledge and skills, he takes the stress out of selling a home. We felt that we could completely trust him and allowed him to do his job.',
    client: 'Deb McMenamin',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'Brian was very easy to work with throughout the process. He is supported by a well qualified team -- efficient, responsive and knowledgeable in their own areas. I very much appreciated being listened to and having my opinions considered.',
    client: 'Mark Coburn',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'I was very impressed with Brian right from the time I interviewed him while I was looking for a realtor. He was extremely well organized and he covered a lot of detail which left little doubt about his market knowledge and the strategies he would employ.',
    client: 'ravi kuppanna',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'Felt like I was working with the A-team. Brian Pakulla made selling my home smooth and efficient. Sharp, organized, and always ahead. Easily the best realtor I\'ve worked with.',
    client: 'katherinejevans',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'We had a great experience working with Brian. He helped us sell our home in just 4 days and made the entire process much less stressful than we expected. He was always available, attentive, and quick to answer any questions we had.',
    client: 'ashlee scalise',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'Brian, Kristin, and your team -- We would like to send a huge shout out to thank you all so much for making the sale of our house as painless as possible! We accomplished a tremendous amount in such a short period of time and for this we are extremely grateful.',
    client: 'Sam Adamczyk',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'I couldn\'t have asked for a better agent. He provided excellent guidance on staging and made the paperwork process of breeze. He has a wealth of real estate knowledge and we have used him for this expertise after the sale through rent back and beyond.',
    client: 'shop4stuff1',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'Brian beat out 3 competitors in our interview process. He demonstrated an absolute knowledge of the market. He\'s top shelf! We had 30+ viewings in 4 days that generated multiple offers.',
    client: 'Pete Babendreier',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian and his team performed exceptionally in the recent sale of my house. His experience and real estate savvy helped us feel very comfortable in the process to include giving us staging advice, setting us up for a successful and competitive sale, facilitating all contract paperwork, and assistance through rent back and beyond.',
    client: 'Bill & Debbie McNeill',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian and his team were knowledgeable and extremely easy to work with. They guided me every step of the way. They make the whole listing and selling process stress free.',
    client: 'Elaine Walker',
    context: 'Zillow Review — Brian',
  },
  {
    quote: 'We recently used Brian in the listing of my mom\'s house. Not only is he personable, but he is also extremely knowledgeable about all facets of the market. He came to the initial meeting with three different options regarding renovations and subsequent listing prices, which I found very helpful.',
    client: 'Jane Pappas',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Working with Brian Pakulla and his team at Red Cedar Real Estate to sell my parents\' home was an excellent experience. From our initial listing through the final settlement, the process was handled with professional care and efficiency.',
    client: 'Dan Hunter',
    context: 'Google Review — Brian',
  },
  {
    quote: 'Brian was a great choice and resource for selling my house. Brian was there for all of my questions and concerns. He offered advice and recommended companies to help make upgrades and repairs to get me a quick sale at my asking price.',
    client: 'Mike Mezz',
    context: 'Google Review — Brian',
  },
  // --- Ryan reviews ---
  {
    quote: 'We are extremely pleased with our experience working with Ryan Douglas, and the Pakulla team! From the start we felt very comfortable, which is not an easy task given the magnitude of this purchase we were gearing up to make for the first time.',
    client: 'Victoria Smith',
    context: 'Google Review — Ryan',
  },
  {
    quote: 'Brian and his colleague, Ryan Douglas, were very attentive to my needs as a new home buyer and helped me in every step along the way. It is evident that Ryan definitely knows what he is doing and he is great at what he does.',
    client: 'ashleyk9586',
    context: 'Zillow Review — Ryan',
  },
  {
    quote: 'Brian\'s team is legit. We worked with Ryan Douglas and he was amazing. He never stopped working to make sure we were perfectly happy with what we got. Unlike other real estate agents I\'ve worked with before, he was very honest and had very helpful opinions.',
    client: 'Anthony Blochowiak',
    context: 'Google Review — Ryan',
  },
  {
    quote: 'We worked with Ryan Douglas to help us find a house. He was very professional, and helped answer all our questions, even after hours.',
    client: 'David Baniszewski',
    context: 'Google Review — Ryan',
  },
  {
    quote: 'Ryan Douglas from Brian Pakulla\'s team was the hardest working and most responsive realtor I\'ve ever worked with. He was always available and willing to show us properties on short notice (sometimes hours).',
    client: 'Claire Murphy',
    context: 'Google Review — Ryan',
  },
  {
    quote: 'Ryan is an outstanding real estate agent. We we were blown away by our experience with him. Ryan started off by listening to our family\'s needs. From there he kept us up to date on all of the real estate listings in the neighborhood we desired, several before they even came to market.',
    client: 'Mommy & Daddy Johnson',
    context: 'Google Review — Ryan',
  },
  {
    quote: 'Ryan at Pakulla Real Estate is super helpful and knowledgeable about all aspects of buying a home. I would recommend him highly.',
    client: 'George Elliott',
    context: 'Google Review — Ryan',
  },
  {
    quote: 'Ryan Douglas is a professional real estate agent and was a tremendous asset in helping us sell our home. From the beginning, he led the way with necessary contacts to make improvements that would substantially add to both the appearance and value, which resulted in multiple offers as soon as the home was listed.',
    client: 'Jeff Link',
    context: 'Google Review — Ryan',
  },
  // --- Jen reviews ---
  {
    quote: 'We worked with Jennifer Scicchitano with Pakulla Professionals and had a wonderful experience finding and buying a home, especially being new homebuyers. She listened to our wants and needs and sent us listings that fit the bill, and ultimately our new house.',
    client: 'Jennifer P',
    context: 'Google Review — Jen',
  },
  {
    quote: 'I worked with Jennifer Scicchitano from Brian\'s team on both selling a house and then buying a new home in Howard County. Jen is exceptionally knowledgeable, savvy and experienced agent.',
    client: 'pasikova',
    context: 'Zillow Review — Jen',
  },
  {
    quote: 'Very grateful to Jen Scicchitano with Pakulla Professionals! My husband and I just went through the process of purchasing our first home from across the country. Buying a home is a stressful process in itself, but doing so without being in the same city, let alone state, is quite the challenge!',
    client: 'Kristin Chitman',
    context: 'Google Review — Jen',
  },
  // --- Hollie reviews ---
  {
    quote: 'Hollie is very knowledgeable and was patient with first time home buyers. We never felt rushed and the outcome was that we bought an affordable home that we enjoy.',
    client: 'jsmarshall5',
    context: 'Zillow Review — Hollie',
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
