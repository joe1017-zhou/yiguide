// I Ching Hexagram Data — Complete 64 Hexagrams
// Based on the Zhou Yi / Book of Changes

export interface Hexagram {
  id: number
  nameZh: string
  nameEn: string
  upperTrigram: string
  lowerTrigram: string
  judgment: string
  image: string
  lines: string[]
  description: string
}

export interface CastResult {
  hexagram: Hexagram
  changingLines: number[]
  transformedHexagram: Hexagram | null
  lines: LineType[]
}

export type LineType = 'oldYang' | 'youngYang' | 'oldYin' | 'youngYin'

const TRIGRAMS: Record<string, string> = {
  '111': '☰ Qian / Heaven',
  '000': '☷ Kun / Earth',
  '100': '☳ Zhen / Thunder',
  '010': '☵ Kan / Water',
  '001': '☶ Gen / Mountain',
  '011': '☴ Xun / Wind',
  '101': '☲ Li / Fire',
  '110': '☱ Dui / Lake',
}

const HEXAGRAMS: Hexagram[] = [
  {
    id: 1, nameZh: '乾', nameEn: 'The Creative',
    upperTrigram: '☰', lowerTrigram: '☰',
    judgment: 'The Creative works sublime success, furthering through perseverance.',
    image: 'The movement of heaven is full of power. Thus the superior man makes himself strong and untiring.',
    description: 'Pure Yang energy. A time of great creative potential and leadership. Initiative brings success.',
    lines: [
      'Hidden dragon. Do not act.',
      'Dragon appearing in the field. It furthers one to see the great man.',
      'All day long the superior man is creatively active. At nightfall his mind is still beset with cares. Danger. No blame.',
      'Wavering flight over the depths. No blame.',
      'Flying dragon in the heavens. It furthers one to see the great man.',
      'Arrogant dragon will have cause to repent.',
    ],
  },
  {
    id: 2, nameZh: '坤', nameEn: 'The Receptive',
    upperTrigram: '☷', lowerTrigram: '☷',
    judgment: 'The Receptive brings about sublime success, furthering through the perseverance of a mare.',
    image: 'The earth\'s condition is receptive devotion. Thus the superior man who has breadth of character carries the outer world.',
    description: 'Pure Yin energy. The power of yielding, nurturing, and supporting. Success comes through following rather than leading.',
    lines: [
      'When there is hoarfrost underfoot, solid ice is not far off.',
      'Straight, square, great. Without purpose, yet nothing remains unfurthered.',
      'Hidden lines. One is able to remain persevering.',
      'A tied-up sack. No blame, no praise.',
      'A yellow lower garment brings supreme good fortune.',
      'Dragons fight in the meadow. Their blood is black and yellow.',
    ],
  },
  {
    id: 3, nameZh: '屯', nameEn: 'Difficulty at the Beginning',
    upperTrigram: '☵', lowerTrigram: '☳',
    judgment: 'Difficulty at the Beginning works supreme success, furthering through perseverance. Nothing should be undertaken. It furthers one to appoint helpers.',
    image: 'Clouds and thunder: the image of Difficulty at the Beginning. Thus the superior man brings order out of confusion.',
    description: 'The initial chaos before creation finds its form. Like a newborn struggling to emerge. Patience and gathering support are key.',
    lines: [
      'Hesitation and hindrance. It furthers one to remain persevering.',
      'Difficulties pile up. Horse and wagon part. He is not a robber; he wants to woo when the time comes.',
      'Whoever hunts deer without the forester only loses his way in the forest.',
      'Horse and wagon part. Strive for union. To go brings good fortune.',
      'Difficulties in blessing. Small matters can be attended to.',
      'Horse and wagon part. Bloody tears flow.',
    ],
  },
  {
    id: 4, nameZh: '蒙', nameEn: 'Youthful Folly',
    upperTrigram: '☶', lowerTrigram: '☵',
    judgment: 'Youthful Folly has success. It is not I who seek the young fool; the young fool seeks me.',
    image: 'A spring wells up at the foot of the mountain: the image of Youth. Thus the superior man fosters his character by thoroughness in all that he does.',
    description: 'The state of not-knowing, of being a student. It is the teacher\'s role to answer when the student is genuinely ready to ask.',
    lines: [
      'To make a fool develop, it furthers one to apply discipline.',
      'To bear with fools in kindliness brings good fortune.',
      'A man should not take a maiden who, when she sees a man of bronze, loses possession of herself.',
      'Entangled folly brings humiliation.',
      'Childlike folly brings good fortune.',
      'In punishing folly, it does not further one to commit transgressions.',
    ],
  },
  {
    id: 5, nameZh: '需', nameEn: 'Waiting (Nourishment)',
    upperTrigram: '☵', lowerTrigram: '☰',
    judgment: 'Waiting. If you are sincere, you have light and success. Perseverance brings good fortune. It furthers one to cross the great water.',
    image: 'Clouds rise up to heaven: the image of Waiting. Thus the superior man eats and drinks, is joyous and of good cheer.',
    description: 'A time of waiting for the right moment. Like clouds gathering before rain. Patience and inner strength during the wait.',
    lines: [
      'Waiting in the meadow. It furthers one to abide in what endures. No blame.',
      'Waiting on the sand. There is some gossip. The end brings good fortune.',
      'Waiting in the mud brings about the arrival of the enemy.',
      'Waiting in blood. Get out of the pit.',
      'Waiting at meat and drink. Perseverance brings good fortune.',
      'One falls into the pit. Three uninvited guests arrive. Honor them.',
    ],
  },
  {
    id: 6, nameZh: '讼', nameEn: 'Conflict',
    upperTrigram: '☰', lowerTrigram: '☵',
    judgment: 'Conflict. You are sincere and are being obstructed. A cautious halt halfway brings good fortune. Going through to the end brings misfortune.',
    image: 'Heaven and water go their opposite ways: the image of Conflict. Thus in all his transactions the superior man carefully considers the beginning.',
    description: 'A time of dispute and disagreement. It is wiser to compromise and seek resolution than to press forward aggressively.',
    lines: [
      'If one does not perpetuate the affair, there is a little gossip. In the end, good fortune comes.',
      'One cannot engage in conflict; one returns home and yields. Good fortune for the city.',
      'To nourish oneself on ancient virtue induces perseverance. Danger. In the end, good fortune comes.',
      'One cannot engage in conflict. One turns back and submits to fate. Changes bring peace.',
      'To contend before the highest authority brings supreme good fortune.',
      'Even if a leather belt is conferred, by the end of the morning it will have been snatched away three times.',
    ],
  },
  {
    id: 7, nameZh: '师', nameEn: 'The Army',
    upperTrigram: '☷', lowerTrigram: '☵',
    judgment: 'The Army. The army needs perseverance and a strong man. Good fortune without blame.',
    image: 'In the middle of the earth is water: the image of the Army. Thus the superior man increases his masses by generosity toward the people.',
    description: 'Organized collective action. Success depends on discipline, proper leadership, and a just cause.',
    lines: [
      'An army must set forth in proper order. If the order is not good, misfortune threatens.',
      'In the midst of the army. Good fortune and no blame. The king bestows a triple decoration.',
      'Perchance the army carries corpses in the wagon. Misfortune.',
      'The army retreats. No blame.',
      'There is game in the field. It furthers one to catch it. Without blame.',
      'The great prince issues commands, founds states, vests families with fiefs. Inferior people should not be employed.',
    ],
  },
  {
    id: 8, nameZh: '比', nameEn: 'Holding Together (Union)',
    upperTrigram: '☵', lowerTrigram: '☷',
    judgment: 'Holding Together brings good fortune. Inquire of the oracle once again whether you possess sublimity, constancy, and perseverance; then there is no blame.',
    image: 'On the earth is water: the image of Holding Together. Thus the kings of antiquity bestowed the different states as fiefs and cultivated friendly relations with the feudal lords.',
    description: 'The power of unity and connection. Seek authentic bonds with others. Those who join together with sincerity find strength.',
    lines: [
      'Hold to him in truth and loyalty. This is without blame. Truth fills the earthen bowl. Thus in the end good fortune comes.',
      'Hold to him inwardly. Perseverance brings good fortune.',
      'You hold together with people who are not the right ones.',
      'Hold to him outwardly also. Perseverance brings good fortune.',
      'Manifestation of holding together. The king drives the game on three sides and forgoes game that runs off in front.',
      'He finds no head for holding together. Misfortune.',
    ],
  },
  {
    id: 9, nameZh: '小畜', nameEn: 'The Taming Power of the Small',
    upperTrigram: '☴', lowerTrigram: '☰',
    judgment: 'The Taming Power of the Small has success. Dense clouds, no rain from our western region.',
    image: 'The wind drives across heaven: the image of the Taming Power of the Small. Thus the superior man refines the outward aspect of his nature.',
    description: 'Small forces can gently shape great power. A time for refinement and patience rather than bold action. The clouds are gathering but not yet ready to release rain.',
    lines: [
      'Return to the way. How could this be blameworthy? Good fortune.',
      'He allows himself to be drawn into returning. Good fortune.',
      'The spokes burst out of the wagon wheel. Man and wife roll their eyes.',
      'If you are sincere, blood vanishes and fear gives way. No blame.',
      'If you are sincere and loyally attached, you are rich in your neighbor.',
      'The rain comes, there is rest. This is due to the lasting effect of character.',
    ],
  },
  {
    id: 10, nameZh: '履', nameEn: 'Treading (Conduct)',
    upperTrigram: '☰', lowerTrigram: '☱',
    judgment: 'Treading upon the tail of the tiger. It does not bite the man. Success.',
    image: 'Heaven above, the lake below: the image of Treading. Thus the superior man discriminates between high and low, and thereby fortifies the thinking of the people.',
    description: 'Moving forward carefully in a delicate situation. Even walking behind a tiger is safe if one knows proper conduct and respects boundaries.',
    lines: [
      'Simple conduct. Progress without blame.',
      'Treading a smooth, level course. The perseverance of a dark man brings good fortune.',
      'A one-eyed man is able to see, a lame man is able to tread. He treads on the tail of the tiger. Misfortune.',
      'He treads on the tail of the tiger. Caution and circumspection lead ultimately to good fortune.',
      'Resolute conduct. Perseverance with awareness of danger.',
      'Look to your conduct and weigh the favorable signs. When everything is fulfilled, supreme good fortune comes.',
    ],
  },
  {
    id: 11, nameZh: '泰', nameEn: 'Peace',
    upperTrigram: '☷', lowerTrigram: '☰',
    judgment: 'Peace. The small departs, the great approaches. Good fortune. Success.',
    image: 'Heaven and earth unite: the image of Peace. Thus the ruler divides and completes the course of heaven and earth, and so aids the people.',
    description: 'A time of harmony when heaven (creativity) and earth (receptivity) are in perfect balance. All things flourish. A highly auspicious time.',
    lines: [
      'When ribbon grass is pulled up, the sod comes with it. Each according to his kind. Undertakings bring good fortune.',
      'Bearing with the uncultured in gentleness, fording the river with resolution, not neglecting what is distant.',
      'No plain not followed by a slope. No going not followed by a return. He who remains persevering in danger is without blame.',
      'He flutters down, not boasting of his wealth, together with his neighbor, guileless and sincere.',
      'The sovereign I gives his daughter in marriage. This brings blessing and supreme good fortune.',
      'The wall falls back into the moat. Use no army now. Make your commands known within your own town.',
    ],
  },
  {
    id: 12, nameZh: '否', nameEn: 'Standstill (Stagnation)',
    upperTrigram: '☰', lowerTrigram: '☷',
    judgment: 'Standstill. Evil people do not further the perseverance of the superior man. The great departs; the small approaches.',
    image: 'Heaven and earth do not unite: the image of Standstill. Thus the superior man falls back upon his inner worth in order to escape the difficulties.',
    description: 'A time of blockage when heaven and earth are separated. Communication breaks down. The wise person withdraws and preserves inner integrity.',
    lines: [
      'When ribbon grass is pulled up, the sod comes with it. Each according to his kind. Perseverance brings good fortune.',
      'They bear and endure. This brings good fortune to inferior people.',
      'They bear shame.',
      'He who acts at the command of the highest remains without blame.',
      'Standstill is giving way. Good fortune for the great man.',
      'The standstill comes to an end. First standstill, then good fortune.',
    ],
  },
  {
    id: 13, nameZh: '同人', nameEn: 'Fellowship with Men',
    upperTrigram: '☰', lowerTrigram: '☲',
    judgment: 'Fellowship with Men in the open. Success. It furthers one to cross the great water. The perseverance of the superior man furthers.',
    image: 'Heaven together with fire: the image of Fellowship with Men. Thus the superior man organizes the clans and makes distinctions between things.',
    description: 'Community and shared purpose. True fellowship is found in the open, not in secret alliances. Common goals unite people beyond personal interests.',
    lines: [
      'Fellowship with men at the gate. No blame.',
      'Fellowship with men in the clan. Humiliation.',
      'He hides weapons in the thicket. He climbs the high hill in front. For three years he does not rise up.',
      'He climbs up on his wall; he cannot attack. Good fortune.',
      'Men bound in fellowship first weep and lament, but afterward they laugh.',
      'Fellowship with men in the meadow. No remorse.',
    ],
  },
  {
    id: 14, nameZh: '大有', nameEn: 'Possession in Great Measure',
    upperTrigram: '☲', lowerTrigram: '☰',
    judgment: 'Possession in Great Measure. Supreme success.',
    image: 'Fire in heaven above: the image of Possession in Great Measure. Thus the superior man curbs evil and furthers good, thereby obeying the benevolent will of heaven.',
    description: 'Abundance and prosperity. When one possesses much, the challenge is to use it wisely, curb excess, and promote the good.',
    lines: [
      'No relationship with what is harmful; there is no blame in this. If one remains conscious of difficulty, one remains without blame.',
      'A big wagon for loading. One may undertake something. No blame.',
      'A prince offers it to the Son of Heaven. A petty man cannot do this.',
      'He makes a difference between himself and his neighbor. No blame.',
      'He whose truth is accessible, yet dignified, has good fortune.',
      'He is blessed by heaven. Good fortune. Nothing that does not further.',
    ],
  },
  {
    id: 15, nameZh: '谦', nameEn: 'Modesty',
    upperTrigram: '☷', lowerTrigram: '☶',
    judgment: 'Modesty creates success. The superior man carries things through.',
    image: 'Within the earth, a mountain: the image of Modesty. Thus the superior man reduces that which is too much and augments that which is too little.',
    description: 'True humility is strength, not weakness. The mountain stands within the earth — greatness hidden. Modesty in success brings lasting good fortune.',
    lines: [
      'A superior man modest about his modesty may cross the great water. Good fortune.',
      'Modesty that comes to expression. Perseverance brings good fortune.',
      'A superior man of modesty and merit carries things through. Good fortune.',
      'Nothing that would not further modesty in movement.',
      'No boasting of wealth before one\'s neighbor. It furthers one to attack with force.',
      'Modesty that comes to expression. It furthers one to set armies marching.',
    ],
  },
  {
    id: 16, nameZh: '豫', nameEn: 'Enthusiasm',
    upperTrigram: '☳', lowerTrigram: '☷',
    judgment: 'Enthusiasm. It furthers one to install helpers and to set armies marching.',
    image: 'Thunder comes resounding out of the earth: the image of Enthusiasm. Thus the ancient kings made music in order to honor merit, and offered it with splendor to the Supreme Deity.',
    description: 'The energy of joy and movement arising from stillness. Enthusiasm inspires action and gathers followers. Use this energy wisely.',
    lines: [
      'Enthusiasm that expresses itself brings misfortune.',
      'Firm as a rock. Not a whole day. Perseverance brings good fortune.',
      'Enthusiasm that looks upward creates remorse. Hesitation brings remorse.',
      'The source of enthusiasm achieves great things. No doubt.',
      'Persistently ill, and still does not die.',
      'Deluded enthusiasm. But if after completion one changes, there is no blame.',
    ],
  },
  {
    id: 17, nameZh: '随', nameEn: 'Following',
    upperTrigram: '☱', lowerTrigram: '☳',
    judgment: 'Following has supreme success. Perseverance furthers. No blame.',
    image: 'Thunder in the middle of the lake: the image of Following. Thus the superior man at nightfall goes indoors for rest and recuperation.',
    description: 'Adaptability and knowing when to follow. The wise person adjusts to circumstances without losing their center. Following the right path brings success.',
    lines: [
      'The standard is changing. Perseverance brings good fortune. To go out of the gate for fellowship produces deeds.',
      'If one clings to the little boy, one lets go of the man.',
      'If one clings to the man, one lets go of the boy. Through following one finds what one seeks.',
      'Following creates success. Perseverance brings misfortune. To go one\'s way with sincerity brings clarity.',
      'Sincere in the good. Good fortune.',
      'He meets with firm allegiance and is still bound. The king introduces him to the Western Mountain.',
    ],
  },
  {
    id: 18, nameZh: '蛊', nameEn: 'Work on What Has Been Spoiled (Decay)',
    upperTrigram: '☶', lowerTrigram: '☴',
    judgment: 'Work on What Has Been Spoiled has supreme success. It furthers one to cross the great water. Before the starting point, three days. After the starting point, three days.',
    image: 'The wind blows low on the mountain: the image of Decay. Thus the superior man stirs up the people and strengthens their spirit.',
    description: 'Addressing inherited problems and corruption. What has been neglected must be repaired. A time of necessary but challenging cleanup.',
    lines: [
      'Setting right what has been spoiled by the father. If there is a son, no blame rests upon the departed father.',
      'Setting right what has been spoiled by the mother. One must not be too persevering.',
      'Setting right what has been spoiled by the father. There will be a little remorse. No great blame.',
      'Tolerating what has been spoiled by the father. In continuing, one sees humiliation.',
      'Setting right what has been spoiled by the father. One meets with praise.',
      'He does not serve kings and princes. He sets himself higher goals.',
    ],
  },
  {
    id: 19, nameZh: '临', nameEn: 'Approach',
    upperTrigram: '☷', lowerTrigram: '☱',
    judgment: 'Approach has supreme success. Perseverance furthers. When the eighth month comes, there will be misfortune.',
    image: 'The earth above the lake: the image of Approach. Thus the superior man is inexhaustible in his will to teach, and without limits in his tolerance and protection of the people.',
    description: 'A time of drawing near — good things are approaching. But all things cycle; enjoy the rising tide while being mindful that it will eventually turn.',
    lines: [
      'Joint approach. Perseverance brings good fortune.',
      'Joint approach. Good fortune. Everything furthers.',
      'Comfortable approach. Nothing that would further. If one is induced to grieve over it, one becomes free of blame.',
      'Complete approach. No blame.',
      'Wise approach. This is right for a great prince. Good fortune.',
      'Greathearted approach. Good fortune. No blame.',
    ],
  },
  {
    id: 20, nameZh: '观', nameEn: 'Contemplation (View)',
    upperTrigram: '☴', lowerTrigram: '☷',
    judgment: 'Contemplation. The ablution has been made, but not yet the offering. Full of trust they look up to him.',
    image: 'The wind blows over the earth: the image of Contemplation. Thus the kings of old visited the regions of the world, contemplated the people, and gave them instruction.',
    description: 'A time of observation and reflection. Step back and see the larger pattern. Like watching from a tower — gain perspective before acting.',
    lines: [
      'Boylike contemplation. For an inferior man, no blame. For a superior man, humiliation.',
      'Contemplation through the crack of the door. Furthering for the perseverance of a woman.',
      'Contemplation of my life decides the choice between advance and retreat.',
      'Contemplation of the light of the kingdom. It furthers one to exert influence as a guest.',
      'Contemplation of my life. The superior man is without blame.',
      'Contemplation of his life. The superior man is without blame.',
    ],
  },
  {
    id: 21, nameZh: '噬嗑', nameEn: 'Biting Through',
    upperTrigram: '☲', lowerTrigram: '☳',
    judgment: 'Biting Through has success. It furthers one to administer justice.',
    image: 'Thunder and lightning: the image of Biting Through. Thus the ancient kings made firm the laws through clearly defined penalties.',
    description: 'Removing an obstacle through decisive action. Like biting through something tough to reach the nourishment within. Justice and clarity are needed.',
    lines: [
      'His feet are fastened in the stocks, so that his toes disappear. No blame.',
      'Bites through tender meat, so that his nose disappears. No blame.',
      'Bites on old dried meat and strikes on something poisonous. Slight humiliation. No blame.',
      'Bites on dried gristly meat. Receives metal arrows. It furthers one to be mindful of difficulties.',
      'Bites on dried lean meat. Receives yellow gold. Perseverance brings good fortune.',
      'His neck is fastened in the wooden cangue, so that his ears disappear. Misfortune.',
    ],
  },
  {
    id: 22, nameZh: '贲', nameEn: 'Grace',
    upperTrigram: '☶', lowerTrigram: '☲',
    judgment: 'Grace has success. In small matters, it furthers one to undertake something.',
    image: 'Fire at the foot of the mountain: the image of Grace. Thus does the superior man proceed when clearing up current affairs. But he dare not decide controversial issues in this way.',
    description: 'Beauty and form over substance. Grace and adornment have their place, but they are secondary to inner truth. Form should serve content.',
    lines: [
      'He lends grace to his toes, leaves the carriage, and walks.',
      'Lends grace to the beard on his chin.',
      'Graceful and moist. Constant perseverance brings good fortune.',
      'Grace or simplicity? A white horse comes as if on wings.',
      'Grace in the hills and gardens. The roll of silk is meager and small. Humiliation, but in the end good fortune.',
      'Simple grace. No blame.',
    ],
  },
  {
    id: 23, nameZh: '剥', nameEn: 'Splitting Apart',
    upperTrigram: '☶', lowerTrigram: '☷',
    judgment: 'Splitting Apart. It does not further one to go anywhere.',
    image: 'The mountain rests on the earth: the image of Splitting Apart. Thus those above can ensure their position only by giving generously to those below.',
    description: 'A time of deterioration and collapse. The foundation is crumbling. Do not resist the inevitable; instead, focus on preserving what can be saved.',
    lines: [
      'The leg of the bed is split. Those who persevere are destroyed. Misfortune.',
      'The frame of the bed is split. Those who persevere are destroyed. Misfortune.',
      'He splits with them. No blame.',
      'The bed is split up to the skin. Misfortune.',
      'A shoal of fishes. Favor comes through the court ladies. Everything furthers.',
      'There is a large fruit still uneaten. The superior man receives a carriage. The house of the inferior man is split apart.',
    ],
  },
  {
    id: 24, nameZh: '复', nameEn: 'Return (The Turning Point)',
    upperTrigram: '☷', lowerTrigram: '☳',
    judgment: 'Return. Success. Going out and coming in without error. Friends come without blame. To and fro goes the way. On the seventh day comes return.',
    image: 'Thunder within the earth: the image of the Turning Point. Thus the kings of antiquity closed the passes at the time of solstice.',
    description: 'The return of light and life after darkness. A turning point. The winter solstice — the darkest moment gives birth to the returning light. Recovery is beginning.',
    lines: [
      'Return from a short distance. No need for remorse. Great good fortune.',
      'Quiet return. Good fortune.',
      'Repeated return. Danger. No blame.',
      'Walking in the midst of others, one returns alone.',
      'Noblehearted return. No remorse.',
      'Missing the return. Misfortune. Misfortune from within and without.',
    ],
  },
  {
    id: 25, nameZh: '无妄', nameEn: 'Innocence (The Unexpected)',
    upperTrigram: '☰', lowerTrigram: '☳',
    judgment: 'Innocence. Supreme success. Perseverance furthers. If someone is not as he should be, he has misfortune, and it does not further him to undertake anything.',
    image: 'Under heaven thunder rolls: all things attain the natural state of innocence. Thus the kings of old, rich in virtue, nourished all beings.',
    description: 'Acting from a place of natural spontaneity without ulterior motives. When we are free of calculation, things unfold as they should. But we must accept what comes.',
    lines: [
      'Innocent behavior brings good fortune.',
      'If one does not count on the harvest while plowing, nor on the use of the ground while clearing it, it furthers one to undertake something.',
      'Undeserved misfortune. The cow that was tethered by someone is the wanderer\'s gain, the citizen\'s loss.',
      'He who can be steadfast remains without blame.',
      'Use no medicine in an illness incurred through no fault of your own. It will heal of itself.',
      'Innocent action brings misfortune. Nothing furthers.',
    ],
  },
  {
    id: 26, nameZh: '大畜', nameEn: 'The Taming Power of the Great',
    upperTrigram: '☶', lowerTrigram: '☰',
    judgment: 'The Taming Power of the Great. Perseverance furthers. Not eating at home brings good fortune. It furthers one to cross the great water.',
    image: 'Heaven within the mountain: the image of the Taming Power of the Great. Thus the superior man acquaints himself with many sayings of antiquity and many deeds of the past.',
    description: 'Great strength held in check and cultivated. Like a mountain containing heaven\'s energy. This is a time of gathering inner power through discipline and learning.',
    lines: [
      'Danger is at hand. It furthers one to desist.',
      'The axletrees are taken from the wagon.',
      'A good horse that follows others. Awareness of danger, with perseverance, furthers.',
      'The headboard of a young bull. Great good fortune.',
      'The tusk of a gelded boar. Good fortune.',
      'One attains the way of heaven. Success.',
    ],
  },
  {
    id: 27, nameZh: '颐', nameEn: 'The Corners of the Mouth (Providing Nourishment)',
    upperTrigram: '☶', lowerTrigram: '☳',
    judgment: 'The Corners of the Mouth. Perseverance brings good fortune. Pay heed to the providing of nourishment, and to what a man seeks to fill his own mouth with.',
    image: 'Thunder at the foot of the mountain: the image of Providing Nourishment. Thus the superior man is careful of his words and temperate in eating and drinking.',
    description: 'Nourishment — both physical and spiritual. Consider carefully what you take in and what you give out. Words and food both sustain life.',
    lines: [
      'You let your magic tortoise go, and look at me with the corners of your mouth drooping. Misfortune.',
      'Turning to the summit for nourishment, deviating from the path to seek nourishment. Misfortune.',
      'Turning away from nourishment. Perseverance brings misfortune. Do not act thus.',
      'Turning to the summit for provision brings good fortune. Spying about with sharp eyes like a tiger with insatiable craving. No blame.',
      'Turning away from the path. To remain persevering brings good fortune.',
      'The source of nourishment. Awareness of danger brings good fortune. It furthers one to cross the great water.',
    ],
  },
  {
    id: 28, nameZh: '大过', nameEn: 'Preponderance of the Great',
    upperTrigram: '☱', lowerTrigram: '☴',
    judgment: 'Preponderance of the Great. The ridgepole is sagging. It furthers one to have somewhere to go. Success.',
    image: 'The lake rises above the trees: the image of Preponderance of the Great. Thus the superior man, when he stands alone, is unconcerned, and if he has to renounce the world, he is undaunted.',
    description: 'A situation of excess and imbalance. The weight is too much for the support. An extraordinary situation requires extraordinary measures.',
    lines: [
      'To spread white rushes underneath. No blame.',
      'A dry poplar sprouts at the root. An older man takes a young wife. Everything furthers.',
      'The ridgepole sags to the breaking point. Misfortune.',
      'The ridgepole is braced. Good fortune. If there are ulterior motives, humiliation.',
      'A withered poplar puts forth flowers. An older woman takes a husband. No blame, no praise.',
      'One must go through the water. It goes over one\'s head. Misfortune. No blame.',
    ],
  },
  {
    id: 29, nameZh: '坎', nameEn: 'The Abysmal (Water)',
    upperTrigram: '☵', lowerTrigram: '☵',
    judgment: 'The Abysmal repeated. If you are sincere, you have success in your heart, and whatever you do succeeds.',
    image: 'Water flows on uninterruptedly and reaches its goal: the image of the Abysmal repeated. Thus the superior man walks in lasting virtue and carries on the business of teaching.',
    description: 'Danger doubled — water upon water. When in peril, sincerity of heart is your lifeline. Flow like water: adapt to every shape and keep moving forward.',
    lines: [
      'Repetition of the Abysmal. In the abyss one falls into a pit. Misfortune.',
      'The abyss is dangerous. One should strive to attain small things only.',
      'Forward and backward, abyss on abyss. In such danger, pause and wait.',
      'A jug of wine, a bowl of rice; earthen vessels simply handed in through the window. No blame.',
      'The abyss is not filled to overflowing. It is filled only to the rim. No blame.',
      'Bound with cords and ropes, shut in between thorn-hedged prison walls. For three years one does not find the way. Misfortune.',
    ],
  },
  {
    id: 30, nameZh: '离', nameEn: 'The Clinging (Fire)',
    upperTrigram: '☲', lowerTrigram: '☲',
    judgment: 'The Clinging. Perseverance furthers. It brings success. Care of the cow brings good fortune.',
    image: 'That which is bright rises twice: the image of Fire. Thus the great man, by perpetuating this brightness, illuminates the four quarters of the world.',
    description: 'Light and clarity depend on something to cling to — fire clings to its fuel. Find what sustains you and let your light shine dependably and gently.',
    lines: [
      'The footprints run crisscross. If one is seriously intent, no blame.',
      'Yellow light. Supreme good fortune.',
      'In the light of the setting sun, men either beat the pot and sing, or loudly bewail the approach of old age. Misfortune.',
      'Its coming is sudden; it flames up, dies down, is thrown away.',
      'Tears in floods, sighing and lamenting. Good fortune.',
      'The king uses him to march forth and chastise. Best to kill the leaders and take captive the followers. No blame.',
    ],
  },
  {
    id: 31, nameZh: '咸', nameEn: 'Influence (Wooing)',
    upperTrigram: '☱', lowerTrigram: '☶',
    judgment: 'Influence. Success. Perseverance furthers. To take a maiden to wife brings good fortune.',
    image: 'A lake on the mountain: the image of Influence. Thus the superior man encourages people to approach him by his readiness to receive them.',
    description: 'The magnetic power of attraction and mutual influence. A time of connection — romantic, social, or spiritual. Openness and receptivity attract.',
    lines: [
      'The influence shows itself in the big toe.',
      'The influence shows itself in the calves of the legs. Misfortune. Tarrying brings good fortune.',
      'The influence shows itself in the thighs. Holds to that which follows it. To continue is humiliating.',
      'Perseverance brings good fortune. Remorse disappears. If a man is agitated in mind, only his friends will follow.',
      'The influence shows itself in the back of the neck. No remorse.',
      'The influence shows itself in the jaws, cheeks, and tongue.',
    ],
  },
  {
    id: 32, nameZh: '恒', nameEn: 'Duration',
    upperTrigram: '☳', lowerTrigram: '☴',
    judgment: 'Duration. Success. No blame. Perseverance furthers. It furthers one to have somewhere to go.',
    image: 'Thunder and wind: the image of Duration. Thus the superior man stands firm and does not change his direction.',
    description: 'The power of the enduring and the long-term. Lasting relationships and sustained effort. Consistency and commitment bring success.',
    lines: [
      'Seeking duration too hastily brings misfortune. Nothing that would further.',
      'Remorse disappears.',
      'He who does not give duration to his character meets with disgrace. Persistent humiliation.',
      'No game in the field.',
      'Giving duration to one\'s character through perseverance. This is good fortune for a wife, misfortune for a husband.',
      'Restlessness as an enduring condition brings misfortune.',
    ],
  },
  {
    id: 33, nameZh: '遁', nameEn: 'Retreat',
    upperTrigram: '☰', lowerTrigram: '☶',
    judgment: 'Retreat. Success. In small matters, perseverance furthers.',
    image: 'Mountain under heaven: the image of Retreat. Thus the superior man keeps the inferior man at a distance, not angrily but with reserve.',
    description: 'Strategic withdrawal. When forces are aligned against you, retreat is wisdom, not cowardice. Preserve your strength for a better time.',
    lines: [
      'At the tail in retreat. This is dangerous. One must not wish to undertake anything.',
      'He holds him fast with yellow oxhide. No one can tear him loose.',
      'A halted retreat is nerve-wracking and dangerous. To retain people as servants brings good fortune.',
      'Voluntary retreat brings good fortune to the superior man and downfall to the inferior man.',
      'Friendly retreat. Perseverance brings good fortune.',
      'Cheerful retreat. Everything serves to further.',
    ],
  },
  {
    id: 34, nameZh: '大壮', nameEn: 'The Power of the Great',
    upperTrigram: '☳', lowerTrigram: '☰',
    judgment: 'The Power of the Great. Perseverance furthers.',
    image: 'Thunder in heaven above: the image of the Power of the Great. Thus the superior man does not tread upon paths that do not accord with established order.',
    description: 'Great strength and power. But true greatness is expressed through restraint and alignment with what is right, not through force.',
    lines: [
      'Power in the toes. Continuing brings misfortune. This is certainly true.',
      'Perseverance brings good fortune.',
      'The inferior man works through power. The superior man does not act thus.',
      'Perseverance brings good fortune. Remorse disappears. The hedge opens; there is no entanglement.',
      'Loses the goat with ease. No remorse.',
      'A goat butts against a hedge and cannot get backward or forward. Nothing furthers. But if one notes the difficulty, this brings good fortune.',
    ],
  },
  {
    id: 35, nameZh: '晋', nameEn: 'Progress',
    upperTrigram: '☲', lowerTrigram: '☷',
    judgment: 'Progress. The powerful prince is honored with horses in large numbers. In a single day he is granted audience three times.',
    image: 'The sun rises over the earth: the image of Progress. Thus the superior man himself brightens his bright virtue.',
    description: 'Steady advancement and rising. Like the sun climbing above the earth. Your virtues are being recognized. Continue with clarity and integrity.',
    lines: [
      'Progressing, but turning back. Perseverance brings good fortune. If one meets with no confidence, one should remain calm.',
      'Progressing, but in sorrow. Perseverance brings good fortune. Then one obtains great happiness from one\'s ancestress.',
      'All are in accord. Remorse disappears.',
      'Progress like a hamster. Perseverance brings danger.',
      'Remorse disappears. Take not gain and loss to heart. Undertakings bring good fortune.',
      'Making progress with the horns is permissible only for the purpose of punishing one\'s own city.',
    ],
  },
  {
    id: 36, nameZh: '明夷', nameEn: 'Darkening of the Light',
    upperTrigram: '☷', lowerTrigram: '☲',
    judgment: 'Darkening of the Light. In adversity it furthers one to be persevering.',
    image: 'The light has sunk into the earth: the image of Darkening of the Light. Thus does the superior man live with the great mass: he veils his light, yet still shines.',
    description: 'Light and truth are being obscured by darkness. In such times, the wise person hides their brilliance while maintaining it inwardly. Endurance is key.',
    lines: [
      'Darkening of the light during flight. He lowers his wings. The superior man does not eat for three days.',
      'Darkening of the light injures him in the left thigh. He gives aid with the strength of a horse. Good fortune.',
      'Darkening of the light during the hunt in the south. Their great leader is captured. One must not expect perseverance too soon.',
      'He penetrates the left side of the belly. One gets at the very heart of the darkening of the light.',
      'Darkening of the light as with Prince Ji. Perseverance furthers.',
      'Not light but darkness. First he climbed up to heaven, then he plunged into the depths of the earth.',
    ],
  },
  {
    id: 37, nameZh: '家人', nameEn: 'The Family (The Clan)',
    upperTrigram: '☴', lowerTrigram: '☲',
    judgment: 'The Family. The perseverance of the woman furthers.',
    image: 'Wind comes forth from fire: the image of the Family. Thus the superior man has substance in his words and duration in his way of life.',
    description: 'The foundation of all society — the family/home. Order, roles, and mutual support within close relationships. Words should be truthful and conduct consistent.',
    lines: [
      'Firm seclusion within the family. Remorse disappears.',
      'She should not follow her whims. She must attend to the nourishment within. Perseverance brings good fortune.',
      'When tempers flare up in the family, too great severity brings remorse. Good fortune nonetheless.',
      'She is the treasure of the house. Great good fortune.',
      'As a king he approaches his family. Fear not. Good fortune.',
      'His work commands respect. In the end, good fortune comes.',
    ],
  },
  {
    id: 38, nameZh: '睽', nameEn: 'Opposition',
    upperTrigram: '☲', lowerTrigram: '☱',
    judgment: 'Opposition. In small matters, good fortune.',
    image: 'Above, fire; below, the lake: the image of Opposition. Thus amid all fellowship the superior man retains his individuality.',
    description: 'Misunderstanding and divergence. Fire rises, water sinks — they move apart. In times of opposition, focus on small agreements and respect differences.',
    lines: [
      'Remorse disappears. If you lose your horse, do not run after it; it will come back of its own accord.',
      'One meets his lord in a narrow street. No blame.',
      'One sees the wagon dragged back, the oxen halted, a man with hair and nose cut off. Not a good beginning, but a good end.',
      'Isolated through opposition, one meets a like-minded man with whom one can associate in good faith.',
      'Remorse disappears. The companion bites his way through the wrappings and comes. What blame is there?',
      'Isolated through opposition, one sees one\'s companion as a pig covered with dirt. One takes up weapons against him.',
    ],
  },
  {
    id: 39, nameZh: '蹇', nameEn: 'Obstruction',
    upperTrigram: '☵', lowerTrigram: '☶',
    judgment: 'Obstruction. The southwest furthers. The northeast does not further. It furthers one to see the great man. Perseverance brings good fortune.',
    image: 'Water on the mountain: the image of Obstruction. Thus the superior man turns his attention to himself and molds his character.',
    description: 'Difficulties and obstacles block the way forward. When progress is blocked, turn inward. Seek wise counsel. The obstacle may be a teacher in disguise.',
    lines: [
      'Going leads to obstructions, coming meets with praise.',
      'The king\'s servant is beset by obstruction upon obstruction. It is not his own fault.',
      'Going leads to obstructions; hence he comes back.',
      'Going leads to obstructions, coming leads to union.',
      'In the midst of the greatest obstructions, friends come.',
      'Going leads to obstructions, coming leads to great good fortune. It furthers one to see the great man.',
    ],
  },
  {
    id: 40, nameZh: '解', nameEn: 'Deliverance',
    upperTrigram: '☳', lowerTrigram: '☵',
    judgment: 'Deliverance. The southwest furthers. If there is no longer anything where one has to go, return brings good fortune. If there is still something where one has to go, hastening brings good fortune.',
    image: 'Thunder and rain set in: the image of Deliverance. Thus the superior man pardons mistakes and forgives misdeeds.',
    description: 'Release from tension and obstacles. After the storm, clearing. Forgive, let go, and move forward lightly. Address lingering issues quickly.',
    lines: [
      'Without blame.',
      'One kills three foxes in the field and receives a yellow arrow. Perseverance brings good fortune.',
      'If a man carries a burden on his back and nonetheless rides in a carriage, he thereby encourages robbers to draw near.',
      'Deliver yourself from your great toe. Then the companion comes, and him you can trust.',
      'If only the superior man can deliver himself, it brings good fortune.',
      'The prince shoots at a hawk on a high wall. He hits it. Everything furthers.',
    ],
  },
  {
    id: 41, nameZh: '损', nameEn: 'Decrease',
    upperTrigram: '☶', lowerTrigram: '☱',
    judgment: 'Decrease combined with sincerity brings about supreme good fortune without blame. One may be persevering in this. It furthers one to undertake something.',
    image: 'At the foot of the mountain, the lake: the image of Decrease. Thus the superior man controls his anger and restrains his instincts.',
    description: 'A time of reduction and simplification. Less can be more. Decrease in one area may mean increase in another. Control desires and cultivate inner richness.',
    lines: [
      'Going quickly when the task is finished is without blame. But one must reflect on how much decrease is appropriate.',
      'Perseverance furthers. To undertake something brings misfortune. Increasing without decreasing.',
      'When three people journey, their number decreases by one. When one journeys, he finds his companion.',
      'His faults are decreased. This makes him quick and brings joy. No blame.',
      'Someone does indeed increase him. Ten pairs of tortoises cannot oppose it. Supreme good fortune.',
      'If one is increased without decreasing others, there is no blame. Perseverance brings good fortune.',
    ],
  },
  {
    id: 42, nameZh: '益', nameEn: 'Increase',
    upperTrigram: '☴', lowerTrigram: '☳',
    judgment: 'Increase. It furthers one to undertake something. It furthers one to cross the great water.',
    image: 'Wind and thunder: the image of Increase. Thus the superior man: if he sees good, he imitates it; if he has faults, he rids himself of them.',
    description: 'A time of growth and abundance. Blessings flowing in. Use this increase to benefit others and to improve yourself. Share the abundance.',
    lines: [
      'It furthers one to accomplish great deeds. Supreme good fortune. No blame.',
      'Someone does indeed increase him. Ten pairs of tortoises cannot oppose it. Constant perseverance brings good fortune.',
      'One is enriched through unfortunate events. No blame if you are sincere.',
      'If you walk in the middle and report to the prince, he will follow. It furthers one to be used in the removal of the capital.',
      'If in truth you have a kind heart, do not ask. Supreme good fortune.',
      'He brings increase to no one. Indeed, someone even strikes him. He does not keep his heart constantly steady. Misfortune.',
    ],
  },
  {
    id: 43, nameZh: '夬', nameEn: 'Break-through (Resoluteness)',
    upperTrigram: '☱', lowerTrigram: '☰',
    judgment: 'Break-through. One must resolutely make the matter known at the court of the king. It must be announced truthfully. Danger. One must notify one\'s own city.',
    image: 'The lake has risen up to heaven: the image of Break-through. Thus the superior man dispenses riches downward and refrains from resting on his virtue.',
    description: 'A decisive moment of breakthrough. What has been held back must now be expressed. Act with resolution but also with caution — truth must be declared openly.',
    lines: [
      'Mighty in the forward-striding toes. When one goes and is not equal to the task, one makes a mistake.',
      'A cry of alarm. Arms at evening and at night. Fear nothing.',
      'To be powerful in the cheekbones brings misfortune. The superior man is firmly resolved.',
      'There is no skin on his thighs, and walking comes hard. If a man would let himself be led like a sheep, remorse disappears.',
      'In dealing with weeds, firm resolution is necessary. Walking in the middle remains free of blame.',
      'No cry. In the end misfortune comes.',
    ],
  },
  {
    id: 44, nameZh: '姤', nameEn: 'Coming to Meet',
    upperTrigram: '☰', lowerTrigram: '☴',
    judgment: 'Coming to Meet. The maiden is powerful. One should not marry such a maiden.',
    image: 'The wind blows under heaven: the image of Coming to Meet. Thus does the prince act when disseminating his commands and proclaiming them to the four quarters of heaven.',
    description: 'An encounter — possibly dangerous or tempting. The dark feminine principle rises unexpectedly. Be aware of seductive influences.',
    lines: [
      'It must be checked with a brake of bronze. Perseverance brings good fortune. If one lets it take its course, one experiences misfortune.',
      'There is a fish in the tank. No blame. Does not further guests.',
      'There is no skin on his thighs, and walking comes hard. If one is mindful of the danger, no great mistake is made.',
      'No fish in the tank. This leads to misfortune.',
      'A melon covered with willow leaves. Hidden lines. Then it drops down to one from heaven.',
      'He comes to meet with his horns. Humiliation. No blame.',
    ],
  },
  {
    id: 45, nameZh: '萃', nameEn: 'Gathering Together (Massing)',
    upperTrigram: '☱', lowerTrigram: '☷',
    judgment: 'Gathering Together. Success. The king approaches his temple. It furthers one to see the great man. This brings success. Perseverance furthers.',
    image: 'Over the earth, the lake: the image of Gathering Together. Thus the superior man renews his weapons in order to meet the unforeseen.',
    description: 'A gathering of people, resources, or energy. The collective power of community. Come together for a shared purpose. Prepare for what lies ahead.',
    lines: [
      'If you are sincere, but not to the end, there will sometimes be confusion, sometimes gathering together.',
      'Letting oneself be drawn brings good fortune and remains without blame. If one is sincere, it furthers one to bring even a small offering.',
      'Gathering together amid sighs. Nothing that would further. Going is without blame. Slight humiliation.',
      'Great good fortune. No blame.',
      'Gathering together around the one who holds the position. No blame.',
      'Lamenting and sighing, floods of tears. No blame.',
    ],
  },
  {
    id: 46, nameZh: '升', nameEn: 'Pushing Upward',
    upperTrigram: '☷', lowerTrigram: '☴',
    judgment: 'Pushing Upward has supreme success. One must see the great man. Fear not. Departure toward the south brings good fortune.',
    image: 'Within the earth, wood grows: the image of Pushing Upward. Thus the superior man of devoted character heaps up small things in order to achieve something high and great.',
    description: 'Steady, organic growth upward. Like a tree growing from the earth. Progress through persistence and accumulation of small efforts.',
    lines: [
      'Pushing upward that meets with confidence brings great good fortune.',
      'If one is sincere, it furthers one to bring even a small offering. No blame.',
      'One pushes upward into an empty city.',
      'The king offers him Mount Qi. Good fortune. No blame.',
      'Perseverance brings good fortune. One pushes upward by steps.',
      'Pushing upward in darkness. It furthers one to be unremittingly persevering.',
    ],
  },
  {
    id: 47, nameZh: '困', nameEn: 'Oppression (Exhaustion)',
    upperTrigram: '☱', lowerTrigram: '☵',
    judgment: 'Oppression. Success. Perseverance. The great man brings good fortune. No blame. When one has something to say, it is not believed.',
    image: 'Water under the lake: the image of Exhaustion. Thus the superior man stakes his life on following his will.',
    description: 'A time of hardship and restriction. You feel trapped. Words fail to convince. In such times, inner resolve is your only resource. The great person turns adversity into character.',
    lines: [
      'Sitting oppressed under a bare tree and straying into a gloomy valley. For three years one sees nothing.',
      'Oppressed while at meat and drink. The man with scarlet knee bands is just coming. It furthers one to offer sacrifice.',
      'A man permits himself to be oppressed by stone, and leans on thorns and thistles. He enters his house and does not see his wife. Misfortune.',
      'He comes very quietly, oppressed in a golden carriage. Humiliation, but the end is reached.',
      'His nose and feet are cut off. Oppression at the hands of the man with the purple knee bands.',
      'He is oppressed by creeping vines. He moves uncertainly and says, "Movement brings remorse." If one feels remorse over this and has a change of heart, good fortune comes.',
    ],
  },
  {
    id: 48, nameZh: '井', nameEn: 'The Well',
    upperTrigram: '☵', lowerTrigram: '☴',
    judgment: 'The Well. The town may be changed, but the well cannot be changed. It neither decreases nor increases. They come and go and draw from the well.',
    image: 'Water over wood: the image of the Well. Thus the superior man encourages the people at their work, and exhorts them to help one another.',
    description: 'The deep, unchanging source that nourishes all. Like a well that serves the community — its essence remains constant while surface details change. Access the deep source within.',
    lines: [
      'One does not drink the mud of the well. No animals come to an old well.',
      'At the wellhole one shoots fishes. The jug is broken and leaks.',
      'The well is cleaned, but no one drinks from it. This is my heart\'s sorrow, for one might draw from it.',
      'The well is being lined. No blame.',
      'In the well there is a clear, cold spring from which one can drink.',
      'One draws from the well without hindrance. It is dependable. Supreme good fortune.',
    ],
  },
  {
    id: 49, nameZh: '革', nameEn: 'Revolution (Molting)',
    upperTrigram: '☱', lowerTrigram: '☲',
    judgment: 'Revolution. On your own day you are believed. Supreme success, furthering through perseverance. Remorse disappears.',
    image: 'Fire in the lake: the image of Revolution. Thus the superior man sets the calendar in order and makes the seasons clear.',
    description: 'A time of fundamental change — like a snake shedding its skin. The old order is being transformed. Timing is everything; change must come at the right moment.',
    lines: [
      'Wrapping in the hide of a yellow cow.',
      'When one\'s own day comes, one may create revolution. Starting brings good fortune. No blame.',
      'Starting brings misfortune. Perseverance brings danger. When talk of revolution has gone the rounds three times, one may commit himself.',
      'Remorse disappears. Men\'s minds change and one believes him. Good fortune.',
      'The great man changes like a tiger. Even before he questions the oracle, he is believed.',
      'The superior man changes like a panther. The inferior man molts in the face. Starting brings misfortune.',
    ],
  },
  {
    id: 50, nameZh: '鼎', nameEn: 'The Cauldron',
    upperTrigram: '☲', lowerTrigram: '☴',
    judgment: 'The Cauldron. Supreme good fortune. Success.',
    image: 'Fire over wood: the image of the Cauldron. Thus the superior man consolidates his fate by making his position correct.',
    description: 'The vessel of transformation — cooking raw into cooked, separate into unified. A symbol of civilization and culture. Nourish and transform what is base into something refined.',
    lines: [
      'A cauldron with legs upturned. Furthers removal of stagnating stuff. One takes a concubine for the sake of her son. No blame.',
      'There is food in the cauldron. My comrades are envious, but they cannot harm me. Good fortune.',
      'The handle of the cauldron is altered. One is impeded in his way of life. The fat of the pheasant is not eaten.',
      'The legs of the cauldron are broken. The prince\'s meal is spilled and his person is soiled. Misfortune.',
      'The cauldron has yellow handles, golden carrying rings. Perseverance furthers.',
      'The cauldron has rings of jade. Great good fortune. Nothing that would not further.',
    ],
  },
  {
    id: 51, nameZh: '震', nameEn: 'The Arousing (Shock, Thunder)',
    upperTrigram: '☳', lowerTrigram: '☳',
    judgment: 'The Arousing brings success. Shock comes — oh, oh! Laughing words — ha, ha! The shock terrifies for a hundred miles, and he does not let fall the sacrificial spoon and chalice.',
    image: 'Thunder repeated: the image of Shock. Thus in fear and trembling the superior man sets his life in order and examines himself.',
    description: 'Sudden shock that awakens and tests. The initial fright gives way to clarity. Those who maintain their center through the storm emerge stronger.',
    lines: [
      'Shock comes — oh, oh! Then follow laughing words — ha, ha! Good fortune.',
      'Shock comes bringing danger. A hundred thousand times you lose your treasures and must climb the nine hills. Do not pursue them.',
      'Shock comes and makes one distraught. If one acts correctly, one may have further shock.',
      'Shock is mired.',
      'Shock goes hither and thither. Danger. However, nothing at all is lost.',
      'Shock brings ruin and terrified gazing around. Going ahead brings misfortune.',
    ],
  },
  {
    id: 52, nameZh: '艮', nameEn: 'Keeping Still (Mountain)',
    upperTrigram: '☶', lowerTrigram: '☶',
    judgment: 'Keeping Still. Keeping his back still so that he no longer feels his body. He goes into his courtyard and does not see his people. No blame.',
    image: 'Mountains standing close together: the image of Keeping Still. Thus the superior man does not permit his thoughts to go beyond his situation.',
    description: 'The power of stillness and stopping at the right place. When to rest is as important as when to move. Quiet the mind and find peace in non-action.',
    lines: [
      'Keeping his toes still. No blame. Continued perseverance furthers.',
      'Keeping his calves still. He cannot rescue him whom he follows.',
      'Keeping his hips still. Making his sacrum stiff. Dangerous. The heart suffocates.',
      'Keeping his trunk still. No blame.',
      'Keeping his jaws still. The words have order. Remorse disappears.',
      'Noblehearted keeping still. Good fortune.',
    ],
  },
  {
    id: 53, nameZh: '渐', nameEn: 'Development (Gradual Progress)',
    upperTrigram: '☴', lowerTrigram: '☶',
    judgment: 'Development. The maiden is given in marriage. Good fortune. Perseverance furthers.',
    image: 'On the mountain, a tree: the image of Development. Thus the superior man abides in dignity and virtue, in order to improve the mores.',
    description: 'Slow, steady, organic growth — like a tree on a mountain. True development cannot be rushed. Patience and persistence create lasting results.',
    lines: [
      'The wild goose gradually draws near the shore. The young son is in danger. There is talk. No blame.',
      'The wild goose gradually draws near the cliff. Eating and drinking in peace and concord. Good fortune.',
      'The wild goose gradually draws near the plateau. The man goes forth and does not return. The woman carries a child but does not give birth.',
      'The wild goose gradually draws near the tree. Perhaps it will find a flat branch. No blame.',
      'The wild goose gradually draws near the summit. For three years the woman has no child.',
      'The wild goose gradually draws near the cloud heights. Its feathers can be used for the sacred dance. Good fortune.',
    ],
  },
  {
    id: 54, nameZh: '归妹', nameEn: 'The Marrying Maiden',
    upperTrigram: '☳', lowerTrigram: '☱',
    judgment: 'The Marrying Maiden. Undertakings bring misfortune. Nothing that would further.',
    image: 'Thunder over the lake: the image of the Marrying Maiden. Thus the superior man understands the transitory in the light of the eternity of the end.',
    description: 'A relationship of unequal standing. The maiden marries into a household as a secondary figure. Accept your role gracefully rather than fighting for position.',
    lines: [
      'The marrying maiden as a concubine. A lame man who is able to tread. Undertakings bring good fortune.',
      'A one-eyed man who is able to see. The perseverance of a solitary man furthers.',
      'The marrying maiden as a slave. She marries as a concubine.',
      'The marrying maiden draws out the allotted time. A late marriage comes in its course.',
      'The sovereign I gave his daughter in marriage. The embroidered garments of the princess were not as gorgeous as those of the serving maid.',
      'The woman holds the basket, but there are no fruits in it. The man stabs the sheep, but no blood flows. Nothing that would further.',
    ],
  },
  {
    id: 55, nameZh: '丰', nameEn: 'Abundance (Fullness)',
    upperTrigram: '☳', lowerTrigram: '☲',
    judgment: 'Abundance has success. The king attains abundance. Be not sad. Be like the sun at midday.',
    image: 'Both thunder and lightning come: the image of Abundance. Thus the superior man decides lawsuits and carries out punishments.',
    description: 'A time of peak abundance and fullness. Like the sun at noon — enjoy it but know it will pass. Use this plenitude wisely and generously.',
    lines: [
      'When a man meets his destined ruler, they can be together for ten days, and it is not a mistake.',
      'The curtain is of such fullness that the polestars can be seen at midday. Going brings misfortune.',
      'The underbrush is of such abundance that the little stars can be seen at midday. He breaks his right arm. No blame.',
      'The curtain is of such fullness that the polestars can be seen at midday. He meets his ruler, who is of equal rank. Good fortune.',
      'Lines are coming, blessing and fame draw near. Good fortune.',
      'His house is in a state of abundance. He screens off his family. He peers through the gate and no longer perceives anyone.',
    ],
  },
  {
    id: 56, nameZh: '旅', nameEn: 'The Wanderer',
    upperTrigram: '☲', lowerTrigram: '☶',
    judgment: 'The Wanderer. Success through smallness. To the wanderer, perseverance brings good fortune.',
    image: 'Fire on the mountain: the image of the Wanderer. Thus the superior man is clear-minded and cautious in imposing penalties, and protracts no lawsuits.',
    description: 'The stranger in a foreign land. As a wanderer, be adaptable, modest, and keep moving. Don\'t get attached to places or engage in local conflicts.',
    lines: [
      'If the wanderer busies himself with trivial things, he draws down misfortune upon himself.',
      'The wanderer comes to an inn. He has his property with him. He receives the persistent devotion of a young servant.',
      'The wanderer\'s inn burns down. He loses the persistent devotion of his young servant. Danger.',
      'The wanderer rests in a shelter. He obtains his property and an ax. My heart is not glad.',
      'He shoots a pheasant. It drops with the first arrow. In the end this brings both praise and office.',
      'The bird\'s nest burns up. The wanderer laughs at first, then must needs lament and weep.',
    ],
  },
  {
    id: 57, nameZh: '巽', nameEn: 'The Gentle (The Penetrating, Wind)',
    upperTrigram: '☴', lowerTrigram: '☴',
    judgment: 'The Gentle. Success through what is small. It furthers one to have somewhere to go. It furthers one to see the great man.',
    image: 'Winds following one upon the other: the image of the Gently Penetrating. Thus the superior man spreads his commands abroad and carries out his undertakings.',
    description: 'The power of gentle, persistent influence. Like wind that penetrates everywhere without force. Influence through softness and consistency rather than strength.',
    lines: [
      'In advancing and in retreating, the perseverance of a warrior furthers.',
      'Penetration under the bed. Priests and magicians are used in great number. Good fortune. No blame.',
      'Repeated penetration. Humiliation.',
      'Remorse vanishes. During the hunt, three kinds of game are caught.',
      'Perseverance brings good fortune. Remorse vanishes. Nothing that does not further.',
      'Penetration under the bed. He loses his property and his ax. Perseverance brings misfortune.',
    ],
  },
  {
    id: 58, nameZh: '兑', nameEn: 'The Joyous (Lake)',
    upperTrigram: '☱', lowerTrigram: '☱',
    judgment: 'The Joyous. Success. Perseverance is favorable.',
    image: 'Lakes resting one on the other: the image of the Joyous. Thus the superior man joins with his friends for discussion and practice.',
    description: 'Joy, openness, and communication. Like two lakes joined, sharing and refreshing each other. Joy that is shared grows stronger.',
    lines: [
      'Contented joyousness. Good fortune.',
      'Sincere joyousness. Good fortune. Remorse disappears.',
      'Coming joyousness. Misfortune.',
      'Joyousness that is weighed is not at peace. After ridding himself of mistakes, a man has joy.',
      'Sincere toward what is disintegrating. There will be danger.',
      'Seductive joyousness.',
    ],
  },
  {
    id: 59, nameZh: '涣', nameEn: 'Dispersion (Dissolution)',
    upperTrigram: '☴', lowerTrigram: '☵',
    judgment: 'Dispersion. Success. The king approaches his temple. It furthers one to cross the great water. Perseverance furthers.',
    image: 'The wind drives over the water: the image of Dispersion. Thus the ancient kings sacrificed to the Lord and built temples.',
    description: 'Dissolving of rigid structures and frozen patterns. Like ice melting into flowing water. What was stuck begins to flow again. Reunite what has been scattered.',
    lines: [
      'He brings help with the strength of a horse. Good fortune.',
      'At the dissolution, he hurries to that which supports him. Remorse disappears.',
      'He dissolves his self. No remorse.',
      'He dissolves his bond with his group. Supreme good fortune. The group forms around something else.',
      'His loud cries are as dissolving as sweat. Dissolution! The king abides without blame.',
      'He dissolves his blood. Departing, keeping at a distance, going out — all are without blame.',
    ],
  },
  {
    id: 60, nameZh: '节', nameEn: 'Limitation',
    upperTrigram: '☵', lowerTrigram: '☱',
    judgment: 'Limitation. Success. Galling limitation must not be persevered in.',
    image: 'Water over lake: the image of Limitation. Thus the superior man creates number and measure, and examines the nature of virtue and correct conduct.',
    description: 'The value of boundaries and self-restraint. Limits create form and meaning. But limits that are too harsh become oppressive. Find the middle way.',
    lines: [
      'Not going out of the door and the courtyard is without blame.',
      'Not going out of the gate and the courtyard brings misfortune.',
      'He who knows no limitation will have cause to lament. No blame.',
      'Contented limitation. Success.',
      'Sweet limitation brings good fortune. Going brings esteem.',
      'Galling limitation. Perseverance brings misfortune. Remorse disappears.',
    ],
  },
  {
    id: 61, nameZh: '中孚', nameEn: 'Inner Truth',
    upperTrigram: '☴', lowerTrigram: '☱',
    judgment: 'Inner Truth. Pigs and fishes. Good fortune. It furthers one to cross the great water. Perseverance furthers.',
    image: 'Wind over lake: the image of Inner Truth. Thus the superior man discusses criminal cases in order to delay executions.',
    description: 'The power of genuine inner sincerity. Even pigs and fishes are moved by it. When your heart is true, your influence reaches far beyond words.',
    lines: [
      'Being prepared brings good fortune. If there are secret designs, it is disquieting.',
      'A crane calling in the shade. Its young answers it. I have a good goblet. I will share it with you.',
      'He finds a comrade. Now he beats the drum, now he stops. Now he sobs, now he sings.',
      'The moon is nearly full. The team horse goes astray. No blame.',
      'He possesses truth, which links together. No blame.',
      'Cockcrow penetrating to heaven. Perseverance brings misfortune.',
    ],
  },
  {
    id: 62, nameZh: '小过', nameEn: 'Preponderance of the Small',
    upperTrigram: '☳', lowerTrigram: '☶',
    judgment: 'Preponderance of the Small. Success. Perseverance furthers. Small things may be done; great things should not be done.',
    image: 'Thunder on the mountain: the image of Preponderance of the Small. Thus in his conduct the superior man gives preponderance to reverence.',
    description: 'A time when small, modest actions succeed while grand gestures fail. Attention to detail matters more than big visions. Stay humble.',
    lines: [
      'The bird meets with misfortune through flying.',
      'She passes by her ancestor and meets her ancestress. He does not reach his prince and meets the official. No blame.',
      'If one is not extremely careful, somebody may come up behind him and strike him. Misfortune.',
      'No blame. He meets him without passing by. Going brings danger. One must be on guard.',
      'Dense clouds, no rain from our western territory. The prince shoots and hits him who is in the cave.',
      'He passes by without meeting him. The flying bird leaves him. Misfortune.',
    ],
  },
  {
    id: 63, nameZh: '既济', nameEn: 'After Completion',
    upperTrigram: '☵', lowerTrigram: '☲',
    judgment: 'After Completion. Success in small matters. Perseverance furthers. At the beginning good fortune, at the end disorder.',
    image: 'Water over fire: the image of the condition in After Completion. Thus the superior man takes thought of misfortune and arms himself against it in advance.',
    description: 'A state of completion and balance — but precisely because things are orderly now, disorder may follow. Stay vigilant. Success contains the seeds of its own undoing.',
    lines: [
      'He brakes his wheels. He gets his tail in the water. No blame.',
      'The woman loses the curtain of her carriage. Do not run after it; on the seventh day you will get it.',
      'The Illustrious Ancestor disciplined the Devil\'s Country. After three years he conquers it.',
      'The finest clothes turn to rags. Be careful all day long.',
      'The neighbor in the east who slaughters an ox does not attain as much real happiness as the neighbor in the west with his small offering.',
      'He gets his head in the water. Danger.',
    ],
  },
  {
    id: 64, nameZh: '未济', nameEn: 'Before Completion',
    upperTrigram: '☲', lowerTrigram: '☵',
    judgment: 'Before Completion. Success. But if the little fox, after nearly completing the crossing, gets his tail in the water, there is nothing that would further.',
    image: 'Fire over water: the image of the condition before transition. Thus the superior man is careful in the differentiation of things, so that each finds its place.',
    description: 'The final hexagram — everything is still in process, nothing is finished. A new cycle is about to begin. Proceed carefully; don\'t rush the final steps.',
    lines: [
      'He gets his tail in the water. Humiliation.',
      'He brakes his wheels. Perseverance brings good fortune.',
      'Before completion, attack brings misfortune. It furthers one to cross the great water.',
      'Perseverance brings good fortune. Remorse disappears. Shock, thus to discipline the Devil\'s Country.',
      'Perseverance brings good fortune. No remorse. The light of the superior man is truthful and brings good fortune.',
      'There is drinking of wine in genuine confidence. No blame. But if one wets his head, he loses it, in truth.',
    ],
  },
]

/**
 * Cast a hexagram using the three-coin method simulation.
 * Returns the cast result with hexagram, changing lines, and transformed hexagram.
 */
export function castHexagram(): CastResult {
  const lines: LineType[] = []
  const changingLines: number[] = []
  let hexLines = ''

  // Cast 6 lines, from bottom (line 0) to top (line 5)
  for (let i = 0; i < 6; i++) {
    // Simulate three coins: each coin is 2 (yin) or 3 (yang), sum = 6,7,8,9
    const coin1 = Math.random() < 0.5 ? 2 : 3
    const coin2 = Math.random() < 0.5 ? 2 : 3
    const coin3 = Math.random() < 0.5 ? 2 : 3
    const sum = coin1 + coin2 + coin3

    let lineType: LineType
    if (sum === 6) {
      lineType = 'oldYin'
      changingLines.push(i)
      hexLines = '0' + hexLines // yin line that changes
    } else if (sum === 7) {
      lineType = 'youngYang'
      hexLines = '1' + hexLines // yang line
    } else if (sum === 8) {
      lineType = 'youngYin'
      hexLines = '0' + hexLines // yin line
    } else {
      lineType = 'oldYang'
      changingLines.push(i)
      hexLines = '1' + hexLines // yang line that changes
    }

    lines.push(lineType)
  }

  // Find the hexagram by trigram matching
  const upperTrigram = hexLines.substring(0, 3)
  const lowerTrigram = hexLines.substring(3, 6)

  const hexagramId = trigramToHexagramNumber(upperTrigram, lowerTrigram)
  const hexagram = HEXAGRAMS.find((h) => h.id === hexagramId)!

  // Calculate transformed hexagram if there are changing lines
  let transformedHexagram: Hexagram | null = null
  if (changingLines.length > 0) {
    let transformedLines = ''
    for (let i = 0; i < 6; i++) {
      if (changingLines.includes(i)) {
        // Flip the line
        transformedLines = (hexLines[i] === '1' ? '0' : '1') + transformedLines
      } else {
        transformedLines = hexLines[i] + transformedLines
      }
    }
    // Reorder: the transformed lines string is currently reversed
    // Actually let me fix the logic. hexLines is built bottom-to-top.
    // hexLines[0] = line 5 (top), hexLines[5] = line 0 (bottom)
    // Let me redo this more carefully.

    let tfUpper = ''
    let tfLower = ''
    for (let pos = 5; pos >= 0; pos--) {
      const originalLine = lines[pos]
      let newLine: string
      if (changingLines.includes(pos)) {
        newLine = originalLine === 'oldYang' || originalLine === 'youngYang' ? '0' : '1'
      } else {
        newLine = originalLine === 'oldYang' || originalLine === 'youngYang' ? '1' : '0'
      }
      if (pos >= 3) {
        tfUpper += newLine
      } else {
        tfLower += newLine
      }
    }

    const tfId = trigramToHexagramNumber(tfUpper, tfLower)
    transformedHexagram = HEXAGRAMS.find((h) => h.id === tfId) || null
  }

  return {
    hexagram,
    changingLines,
    transformedHexagram,
    lines,
  }
}

function trigramToHexagramNumber(upper: string, lower: string): number {
  // Map trigram binary patterns to the correct hexagram number
  const TRIGRAM_MAP: Record<string, number> = {
    '111': 0, // Qian / Heaven
    '000': 1, // Kun / Earth
    '100': 2, // Zhen / Thunder
    '010': 3, // Kan / Water
    '001': 4, // Gen / Mountain
    '011': 5, // Xun / Wind
    '101': 6, // Li / Fire
    '110': 7, // Dui / Lake
  }

  const upperIdx = TRIGRAM_MAP[upper] ?? 0
  const lowerIdx = TRIGRAM_MAP[lower] ?? 0

  // Hexagram lookup table: upper trigram (row) x lower trigram (column)
  // Order: Qian(0), Kun(1), Zhen(2), Kan(3), Gen(4), Xun(5), Li(6), Dui(7)
  const HEXAGRAM_TABLE: number[][] = [
    [1, 11, 34, 5, 26, 9, 14, 43],   // upper Qian
    [12, 2, 16, 8, 23, 20, 35, 45],   // upper Kun
    [25, 24, 51, 3, 27, 42, 21, 17],   // upper Zhen
    [6, 7, 40, 29, 4, 59, 64, 47],    // upper Kan
    [33, 15, 62, 39, 52, 53, 56, 31],  // upper Gen
    [44, 46, 32, 48, 18, 57, 50, 28],  // upper Xun
    [13, 36, 55, 63, 22, 37, 30, 49],  // upper Li
    [10, 19, 54, 60, 41, 61, 38, 58],  // upper Dui
  ]

  return HEXAGRAM_TABLE[upperIdx][lowerIdx]
}

/**
 * Generate lines for display: bottom (line 1) to top (line 6).
 * Returns line data with visual representation.
 */
export interface DisplayLine {
  position: number // 1-6, bottom to top
  label: string // "Six in the first place" or "Nine in the second place"
  yinYang: 'yin' | 'yang'
  changing: boolean
  text: string
}

export function getDisplayLines(
  hexagram: Hexagram,
  changingLines: number[]
): DisplayLine[] {
  const lineNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
  const lines = hexagram.lines

  // Determine line types from the hexagram's trigrams
  // We need to know which lines are yin and yang
  // Let's reconstruct from the hexagram's id
  const hexLines = getHexagramLines(hexagram.id)

  return lines.map((text, i) => {
    const position = i + 1
    const isYang = hexLines[i] === '1'
    const isChanging = changingLines.includes(i)

    const prefix = isYang ? 'Nine' : 'Six'
    const label = `${prefix} in the ${lineNames[i]} place`

    return {
      position,
      label,
      yinYang: isYang ? 'yang' : 'yin',
      changing: isChanging,
      text,
    }
  })
}

function getHexagramLines(id: number): string[] {
  // Reconstruct the line pattern from the hexagram table
  const HEXAGRAM_TABLE: number[][] = [
    [1, 11, 34, 5, 26, 9, 14, 43],
    [12, 2, 16, 8, 23, 20, 35, 45],
    [25, 24, 51, 3, 27, 42, 21, 17],
    [6, 7, 40, 29, 4, 59, 64, 47],
    [33, 15, 62, 39, 52, 53, 56, 31],
    [44, 46, 32, 48, 18, 57, 50, 28],
    [13, 36, 55, 63, 22, 37, 30, 49],
    [10, 19, 54, 60, 41, 61, 38, 58],
  ]

  // Find position in table
  let upperIdx = 0
  let lowerIdx = 0
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (HEXAGRAM_TABLE[row][col] === id) {
        upperIdx = row
        lowerIdx = col
        break
      }
    }
  }

  const TRIGRAM_BIN: string[] = [
    '111', // Qian
    '000', // Kun
    '100', // Zhen
    '010', // Kan
    '001', // Gen
    '011', // Xun
    '101', // Li
    '110', // Dui
  ]

  const upper = TRIGRAM_BIN[upperIdx]
  const lower = TRIGRAM_BIN[lowerIdx]

  // Combine: upper lines are top 3, lower lines are bottom 3
  // upper[0] = top line, lower[2] = bottom line
  return [
    lower[2], // line 1 (bottom)
    lower[1], // line 2
    lower[0], // line 3
    upper[2], // line 4
    upper[1], // line 5
    upper[0], // line 6 (top)
  ]
}

export { HEXAGRAMS, TRIGRAMS }
