import { TreeNode } from './types';

// ── Hyper Offense ─────────────────────────────────────────────────────────────

function hoFinisher(): TreeNode {
  return {
    id: 'ho_close', depth: 4,
    question: 'Final piece: how do you close out games?',
    description: "You're one Pokémon away from a complete team. The last 2 slots auto-fill based on coverage gaps. Pick your finisher style.",
    options: [
      { id: 'priorityCloser', label: 'Priority Closer', icon: '★', typeColor: 'fighting',
        desc: 'Auto-add Arcanine-Hisui (Extreme Speed) and Garchomp for ground coverage.',
        terminal: true, fillers: ['arcanineHisui', 'garchomp'], finisherRole: 'Priority Bruiser' },
      { id: 'pivotCloser', label: 'Pivot Closer', icon: '★', typeColor: 'water',
        desc: 'Auto-add Rotom-Wash (Will-O-Wisp pivot) and Garchomp to maintain momentum.',
        terminal: true, fillers: ['rotomWash', 'garchomp'], finisherRole: 'Pivot Setup' },
    ],
  };
}

function hoSpeed(): TreeNode {
  return {
    id: 'ho_speed', depth: 3,
    question: 'Speed control? You move first or they move first.',
    description: 'In doubles, speed control is the entire game. Tailwind gives 4 turns of priority. Priority moves let slow Pokémon strike first. Choose your tempo.',
    options: [
      { id: 'whimsicott', label: 'Whimsicott', icon: '☄', typeColor: 'fairy', mon: 'whimsicott',
        desc: 'Prankster Tailwind. Goes turn 1 every time. Encore locks setup sweepers.', next: hoFinisher() },
      { id: 'incineroar', label: 'Incineroar', icon: '☄', typeColor: 'dark', mon: 'incineroar',
        desc: 'Intimidate + Fake Out + Parting Shot. The ultimate disruption support.', next: hoFinisher() },
    ],
  };
}

function hoPartner(style: 'special' | 'physical'): TreeNode {
  const specialOpts = [
    { id: 'dragapult', label: 'Dragapult', icon: '⚡', typeColor: 'dragon', mon: 'dragapult',
      desc: 'Specs Draco Meteor. Ghost/Dragon coverage is unresisted by 90% of the meta.', next: hoSpeed() },
    { id: 'basculegion', label: 'Basculegion', icon: '⚡', typeColor: 'ghost', mon: 'basculegion',
      desc: 'Last Respects scales with KOs. A snowball in a meta full of fainted Pokémon.', next: hoSpeed() },
  ];
  const physOpts = [
    { id: 'kingambit', label: 'Kingambit', icon: '⚡', typeColor: 'dark', mon: 'kingambit',
      desc: 'Supreme Overlord boost. Sucker Punch priority closes games.', next: hoSpeed() },
    { id: 'samurottH', label: 'Samurott-Hisui', icon: '⚡', typeColor: 'dark', mon: 'samurottHisui',
      desc: 'Sharpness Ceaseless Edge sets spikes AND hits hard. Dual-purpose menace.', next: hoSpeed() },
  ];
  return {
    id: 'ho_partner', depth: 2,
    question: `Choose an offensive partner (${style} attacker).`,
    description: 'Hyper offense compounds. A second threat means the opponent can\'t single-target your Mega. Pick a partner that punishes their answers.',
    options: style === 'special' ? specialOpts : physOpts,
  };
}

function nodeHO(): TreeNode {
  return {
    id: 'ho_mega', depth: 1,
    question: 'Pick your Mega Evolution centerpiece.',
    description: 'Hyper offense lives or dies by its Mega. This Pokémon is the win condition — it should hit hard, hit fast, and threaten multiple checks.',
    options: [
      { id: 'mgardevoir', label: 'Mega Gardevoir', icon: 'M', typeColor: 'fairy', mon: 'megaGardevoir',
        desc: 'Pixilate Hyper Voice. Spread special damage, fairy-typing answers Dragons & Dark.', next: hoPartner('special') },
      { id: 'mlopunny', label: 'Mega Lopunny', icon: 'M', typeColor: 'fighting', mon: 'megaLopunny',
        desc: 'Scrappy + Fake Out. Speed tier 135. Punches through Ghost-types.', next: hoPartner('physical') },
      { id: 'mgengar', label: 'Mega Gengar', icon: 'M', typeColor: 'ghost', mon: 'megaGengar',
        desc: 'Shadow Tag traps switch-ins. Best special sweeper in the format.', next: hoPartner('special') },
    ],
  };
}

// ── Balanced ──────────────────────────────────────────────────────────────────

function balanceFinish(): TreeNode {
  return {
    id: 'b_close', depth: 4,
    question: 'Final piece: speed control and second support.',
    description: 'You\'re one Pokémon away. The remaining 2 slots fill in based on the role gap.',
    options: [
      { id: 'tailwindClose', label: 'Tailwind Mode', icon: '★', typeColor: 'fairy',
        desc: 'Auto-add Whimsicott + Incineroar. Fast, disruptive, classic VGC core.',
        terminal: true, fillers: ['whimsicott', 'incineroar'], finisherRole: 'Tailwind Pivot' },
      { id: 'wallClose', label: 'Wall Mode', icon: '★', typeColor: 'dark',
        desc: 'Auto-add Grimmsnarl (Screens) + Incineroar (Intimidate). Survivability max.',
        terminal: true, fillers: ['grimmsnarl', 'incineroar'], finisherRole: 'Screens + Pivot' },
    ],
  };
}

function balanceThreat(): TreeNode {
  return {
    id: 'b_threat', depth: 3,
    question: 'Primary offensive threat?',
    description: 'Balance still needs to win. Your offensive piece breaks through stall and trades favorably into the meta.',
    options: [
      { id: 'garchomp', label: 'Garchomp', icon: '⚡', typeColor: 'dragon', mon: 'garchomp',
        desc: '37% meta usage. Ground STAB cleans up Steels, Fires, Electrics.', next: balanceFinish() },
      { id: 'sneasler', label: 'Sneasler', icon: '⚡', typeColor: 'fighting', mon: 'sneasler',
        desc: '#1 usage at 43.8%. Unburden + Dire Claw status spam.', next: balanceFinish() },
    ],
  };
}

function balanceCore(): TreeNode {
  return {
    id: 'b_core', depth: 2,
    question: 'Defensive backbone?',
    description: 'Balance needs a Pokémon that absorbs hits. This is the pivot point — when something gets out of hand, this Pokémon comes in and resets the board.',
    options: [
      { id: 'amoonguss', label: 'Amoonguss', icon: '⛨', typeColor: 'grass', mon: 'amoonguss',
        desc: 'Spore + Rage Powder. Redirects, sleeps, regenerates. Doubles staple.', next: balanceThreat() },
      { id: 'rotomWash', label: 'Rotom-Wash', icon: '⛨', typeColor: 'water', mon: 'rotomWash',
        desc: 'Levitate + Will-O-Wisp. Cripples physical attackers, immune to Ground.', next: balanceThreat() },
    ],
  };
}

function nodeBalance(): TreeNode {
  return {
    id: 'b_mega', depth: 1,
    question: 'Pick a Mega Evolution that anchors your balance.',
    description: 'A balanced team needs a Mega that adds something — bulk, utility, or matchup coverage — rather than just raw offense.',
    options: [
      { id: 'mkanga', label: 'Mega Kangaskhan', icon: 'M', typeColor: 'normal', mon: 'megaKangaskhan',
        desc: 'Parental Bond doubles every hit. A self-contained breaker.', next: balanceCore() },
      { id: 'mscizor', label: 'Mega Scizor', icon: 'M', typeColor: 'steel', mon: 'megaScizor',
        desc: 'Technician Bullet Punch. Steel-typing absorbs Fairy + Ice. Built for balance.', next: balanceCore() },
      { id: 'maerodactyl', label: 'Mega Aerodactyl', icon: 'M', typeColor: 'flying', mon: 'megaAerodactyl',
        desc: 'Tough Claws + Tailwind. Speed control AND damage in one slot.', next: balanceCore() },
    ],
  };
}

// ── Trick Room ────────────────────────────────────────────────────────────────

function trClose(): TreeNode {
  return {
    id: 'tr_close', depth: 4,
    question: 'Final piece: backup and disruption.',
    description: 'Five turns goes fast. The last slots cover what happens when TR drops, or get it back up again.',
    options: [
      { id: 'doubleSupp', label: 'Double Support', icon: '★', typeColor: 'grass',
        desc: 'Auto-add Amoonguss + Incineroar. Status spam + Intimidate guarantees the room.',
        terminal: true, fillers: ['amoonguss', 'incineroar'], finisherRole: 'Disruption Layer' },
      { id: 'bulkyCore', label: 'Bulky Pivots', icon: '★', typeColor: 'psychic',
        desc: 'Auto-add Slowking-Galar + Farigiraf. Two more TR setters mean you can re-set.',
        terminal: true, fillers: ['slowkingGalar', 'farigiraf'], finisherRole: 'Redundant TR' },
    ],
  };
}

function trAttacker(): TreeNode {
  return {
    id: 'tr_atk', depth: 3,
    question: 'Second TR attacker?',
    description: 'You need multiple win conditions inside the 5 turns. A second slow heavy hitter sustains the pressure.',
    options: [
      { id: 'ursaluna', label: 'Ursaluna', icon: '⚡', typeColor: 'ground', mon: 'ursaluna',
        desc: 'Guts + Flame Orb. Facade hits like a truck under burn boost.', next: trClose() },
      { id: 'baxcalibur', label: 'Baxcalibur', icon: '⚡', typeColor: 'ice', mon: 'baxcalibur',
        desc: 'Ice/Dragon STAB. Loaded Dice Icicle Spear breaks Sashes.', next: trClose() },
    ],
  };
}

function trMega(): TreeNode {
  return {
    id: 'tr_mega', depth: 2,
    question: 'Which slow-but-strong Mega abuses the room?',
    description: 'Inside Trick Room, low-Speed Pokémon move first. The slower and harder-hitting your Mega, the better.',
    options: [
      { id: 'mcamerupt', label: 'Mega Camerupt', icon: 'M', typeColor: 'fire', mon: 'megaCamerupt',
        desc: 'Sheer Force Eruption. Speed 20 = always moves first in TR.', next: trAttacker() },
      { id: 'mmedicham', label: 'Mega Medicham', icon: 'M', typeColor: 'fighting', mon: 'megaMedicham',
        desc: 'Pure Power doubles Attack. Speed 100 — slower with -nature.', next: trAttacker() },
    ],
  };
}

function nodeTR(): TreeNode {
  return {
    id: 'tr_setter', depth: 1,
    question: 'Pick your Trick Room setter.',
    description: 'Trick Room reverses speed for 5 turns. Your setter must survive turn 1 long enough to fire it off. Different setters trade speed, bulk, and utility.',
    options: [
      { id: 'indeedeeF', label: 'Indeedee-F', icon: '⌛', typeColor: 'psychic', mon: 'indeedeeF',
        desc: 'Psychic Surge + Follow Me. Protects the room setter AND boosts allies.', next: trMega() },
      { id: 'porygon2', label: 'Porygon-2', icon: '⌛', typeColor: 'normal', mon: 'porygon2',
        desc: 'Eviolite bulk + Recover. The most resilient TR setter ever printed.', next: trMega() },
      { id: 'hatterene', label: 'Hatterene', icon: '⌛', typeColor: 'fairy', mon: 'hatterene',
        desc: 'Magic Bounce blocks Taunt + Fake Out. Fairy STAB hits Dragons.', next: trMega() },
    ],
  };
}

// ── Weather ───────────────────────────────────────────────────────────────────

function weatherClose(): TreeNode {
  return {
    id: 'w_close', depth: 4,
    question: 'Final piece: how do you support the weather?',
    description: 'You\'re one Pokémon away. The remaining 2 slots auto-fill based on the role gap and weather synergy.',
    options: [
      { id: 'tailwind', label: 'Tailwind + Pivot', icon: '★', typeColor: 'flying',
        desc: 'Auto-add Whimsicott + Incineroar. Speed control + Intimidate.',
        terminal: true, fillers: ['whimsicott', 'incineroar'], finisherRole: 'Weather + Tailwind' },
      { id: 'redirect', label: 'Redirection Support', icon: '★', typeColor: 'grass',
        desc: 'Auto-add Amoonguss + Incineroar. Rage Powder protects the setter.',
        terminal: true, fillers: ['amoonguss', 'incineroar'], finisherRole: 'Weather + Redirect' },
    ],
  };
}

function weatherAttacker(weather: string): TreeNode {
  const sunOpts = [
    { id: 'arcH', label: 'Arcanine-Hisui', icon: '⚡', typeColor: 'fire', mon: 'arcanineHisui',
      desc: 'Rock Head Head Smash. Fire/Rock STAB amplified by sun.', next: weatherClose() },
    { id: 'garchompSun', label: 'Garchomp', icon: '⚡', typeColor: 'dragon', mon: 'garchomp',
      desc: 'Earthquake destroys Fire-resists. Pairs with sun pressure.', next: weatherClose() },
  ];
  const rainOpts = [
    { id: 'basculegion', label: 'Basculegion', icon: '⚡', typeColor: 'water', mon: 'basculegion',
      desc: 'Adaptability Wave Crash in rain = nuclear damage.', next: weatherClose() },
    { id: 'rotomWash', label: 'Rotom-Wash', icon: '⚡', typeColor: 'water', mon: 'rotomWash',
      desc: 'Hydro Pump in rain. Levitate dodges Earthquake.', next: weatherClose() },
  ];
  const sandOpts = [
    { id: 'excadrill', label: 'Excadrill', icon: '⚡', typeColor: 'ground', mon: 'excadrill',
      desc: 'Sand Rush doubles Speed. Earthquake spread move.', next: weatherClose() },
    { id: 'garchompSand', label: 'Garchomp', icon: '⚡', typeColor: 'dragon', mon: 'garchomp',
      desc: 'Immune to sand chip. Sand-Ground STAB synergy.', next: weatherClose() },
  ];
  const snowOpts = [
    { id: 'baxcalibur', label: 'Baxcalibur', icon: '⚡', typeColor: 'ice', mon: 'baxcalibur',
      desc: '100% accurate Blizzard in snow + Dragon STAB coverage.', next: weatherClose() },
  ];
  const optMap: Record<string, typeof sunOpts> = { sun: sunOpts, rain: rainOpts, sand: sandOpts, snow: snowOpts };
  return {
    id: 'w_atk', depth: 3,
    question: 'Secondary weather abuser?',
    description: 'A second attacker that benefits from the weather extends your win-condition window. This is the snowball piece.',
    options: optMap[weather] ?? sunOpts,
  };
}

function sunSetter(): TreeNode {
  return {
    id: 'sun_setter', depth: 2,
    question: 'Sun setter?',
    description: 'Drought-ability Pokémon set sun automatically on switch-in. Pick the one whose offense fits your style.',
    options: [
      { id: 'mcharY', label: 'Mega Charizard Y', icon: 'M', typeColor: 'fire', mon: 'megaCharizardY',
        desc: 'Sets sun via Drought Mega ability. Solar Beam OHKOes Waters.', next: weatherAttacker('sun') },
      { id: 'torkoal', label: 'Torkoal', icon: '☀', typeColor: 'fire', mon: 'torkoal',
        desc: 'Permanent Drought. Eruption at full HP wipes the field.', next: weatherAttacker('sun') },
    ],
  };
}

function rainSetter(): TreeNode {
  return {
    id: 'rain_setter', depth: 2,
    question: 'Rain setter?',
    description: 'No Mega Swampert in Reg M-A, so Pelipper carries rain. Build around water STAB and Thunder accuracy.',
    options: [
      { id: 'pelipperLead', label: 'Pelipper + Swift Swim', icon: '☔', typeColor: 'water', mon: 'pelipper',
        desc: 'Drizzle ability. Tailwind + Hurricane in rain = guaranteed hit.', next: weatherAttacker('rain') },
      { id: 'pelipperBasc', label: 'Pelipper + Last Respects', icon: '☔', typeColor: 'water', mon: 'pelipper',
        desc: 'Run Pelipper auto-fill. Basculegion as primary win condition.', next: weatherAttacker('rain') },
    ],
  };
}

function sandSetter(): TreeNode {
  return {
    id: 'sand_setter', depth: 2,
    question: 'Sand setter?',
    description: 'Sand chips non-Rock/Steel/Ground Pokémon every turn. Excadrill doubles speed under Sand Rush.',
    options: [
      { id: 'mtyranitar', label: 'Mega Tyranitar', icon: 'M', typeColor: 'rock', mon: 'megaTyranitar',
        desc: 'Sand Stream + huge bulk. Crunch and Rock Slide for spread damage.', next: weatherAttacker('sand') },
      { id: 'mglimmora', label: 'Mega Glimmora', icon: 'M', typeColor: 'poison', mon: 'megaGlimmora',
        desc: 'Toxic Debris stacks with sand chip. Hyper-offense sand variant.', next: weatherAttacker('sand') },
    ],
  };
}

function snowSetter(): TreeNode {
  return {
    id: 'snow_setter', depth: 2,
    question: 'Snow setter?',
    description: 'Snow boosts Ice-type Defense by 50% and makes Blizzard 100% accurate. Slush Rush Pokémon double speed.',
    options: [
      { id: 'mabomasnow', label: 'Mega Abomasnow', icon: 'M', typeColor: 'ice', mon: 'megaAbomasnow',
        desc: 'Snow Warning Mega. Uniquely bulky for an Ice-type under its own weather.', next: weatherAttacker('snow') },
    ],
  };
}

function nodeWeather(): TreeNode {
  return {
    id: 'w_type', depth: 1,
    question: 'Which weather defines your team?',
    description: 'Weather permanently buffs certain Pokémon\'s abilities and moves. The mode you pick determines almost the entire roster.',
    options: [
      { id: 'sun',  label: 'Sun',  icon: '☀', typeColor: 'fire',    sample: ['fire','ground'],
        desc: 'Drought boosts Fire moves +50%, weakens Water. Solar Beam is one-turn.', next: sunSetter() },
      { id: 'rain', label: 'Rain', icon: '☔', typeColor: 'water',   sample: ['water','flying'],
        desc: 'Drizzle boosts Water +50%, weakens Fire. Thunder + Hurricane never miss.', next: rainSetter() },
      { id: 'sand', label: 'Sand', icon: '⛰', typeColor: 'rock',    sample: ['rock','ground'],
        desc: 'Sand Stream boosts Rock SpDef. Sand Rush doubles speed. Chip damage every turn.', next: sandSetter() },
      { id: 'snow', label: 'Snow', icon: '❄', typeColor: 'ice',     sample: ['ice','grass'],
        desc: 'Snow Warning boosts Ice Defense. Blizzard never misses. Slush Rush doubles speed.', next: snowSetter() },
    ],
  };
}

// ── Root ──────────────────────────────────────────────────────────────────────

export const TREE: TreeNode = {
  id: 'root', depth: 0,
  question: 'What is your preferred playstyle?',
  description: 'Every championship-caliber team starts with an archetype. The archetype dictates pacing, win conditions, and which Pokémon are even on the table. Pick the style that resonates — this is the root of your decision tree.',
  options: [
    { id: 'ho',      label: 'Hyper Offense', icon: '⚔', typeColor: 'fire',    sample: ['fire','dark','dragon'],
      desc: 'Fast attackers. Apply pressure turn 1, KO before they set up.', next: nodeHO() },
    { id: 'balance', label: 'Balanced',       icon: '⚖', typeColor: 'water',  sample: ['water','steel','grass'],
      desc: 'A mix of offense, defense, and pivoting. The classic toolkit answer.', next: nodeBalance() },
    { id: 'tr',      label: 'Trick Room',     icon: '⌛', typeColor: 'psychic', sample: ['psychic','ghost','fighting'],
      desc: 'Reverse speed mechanics. Slow, bulky attackers become unstoppable.', next: nodeTR() },
    { id: 'weather', label: 'Weather',         icon: '☀', typeColor: 'electric', sample: ['fire','water','rock','ice'],
      desc: 'Sun, rain, sand, or snow. Pump the abilities, dominate the conditions.', next: nodeWeather() },
  ],
};
