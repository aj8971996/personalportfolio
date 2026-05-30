import { PokemonEntry } from './types';

export const MON: Record<string, PokemonEntry> = {
  megaCharizardY:  { name: 'Charizard-Mega Y',  mega: true,  types: ['fire','flying'],   ability: 'Drought',         item: 'Charizardite Y',  moves: ['Heat Wave','Solar Beam','Protect','Tailwind'] },
  megaCharizardX:  { name: 'Charizard-Mega X',  mega: true,  types: ['fire','dragon'],   ability: 'Tough Claws',     item: 'Charizardite X',  moves: ['Flare Blitz','Dragon Claw','Thunder Punch','Protect'] },
  megaGardevoir:   { name: 'Gardevoir-Mega',     mega: true,  types: ['psychic','fairy'], ability: 'Pixilate',        item: 'Gardevoirite',    moves: ['Hyper Voice','Dazzling Gleam','Psyshock','Protect'] },
  megaGengar:      { name: 'Gengar-Mega',        mega: true,  types: ['ghost','poison'],  ability: 'Shadow Tag',      item: 'Gengarite',       moves: ['Shadow Ball','Sludge Bomb','Taunt','Protect'] },
  megaLopunny:     { name: 'Lopunny-Mega',       mega: true,  types: ['normal','fighting'],ability: 'Scrappy',        item: 'Lopunnite',       moves: ['Return','High Jump Kick','Fake Out','Encore'] },
  megaKangaskhan:  { name: 'Kangaskhan-Mega',    mega: true,  types: ['normal'],          ability: 'Parental Bond',   item: 'Kangaskhanite',   moves: ['Double-Edge','Sucker Punch','Fake Out','Power-Up Punch'] },
  megaAerodactyl:  { name: 'Aerodactyl-Mega',    mega: true,  types: ['rock','flying'],   ability: 'Tough Claws',     item: 'Aerodactylite',   moves: ['Rock Slide','Stone Edge','Tailwind','Protect'] },
  megaCamerupt:    { name: 'Camerupt-Mega',       mega: true,  types: ['fire','ground'],   ability: 'Sheer Force',     item: 'Cameruptite',     moves: ['Eruption','Earth Power','Heat Wave','Protect'] },
  megaMedicham:    { name: 'Medicham-Mega',       mega: true,  types: ['fighting','psychic'],ability: 'Pure Power',   item: 'Medichamite',     moves: ['High Jump Kick','Zen Headbutt','Ice Punch','Fake Out'] },
  megaScizor:      { name: 'Scizor-Mega',         mega: true,  types: ['bug','steel'],     ability: 'Technician',      item: 'Scizorite',       moves: ['Bullet Punch','Bug Bite','Swords Dance','Protect'] },
  megaTyranitar:   { name: 'Tyranitar-Mega',      mega: true,  types: ['rock','dark'],     ability: 'Sand Stream',     item: 'Tyranitarite',    moves: ['Rock Slide','Crunch','Earthquake','Protect'] },
  megaAbomasnow:   { name: 'Abomasnow-Mega',      mega: true,  types: ['grass','ice'],     ability: 'Snow Warning',    item: 'Abomasite',       moves: ['Blizzard','Giga Drain','Ice Shard','Protect'] },
  megaGlimmora:    { name: 'Glimmora-Mega',        mega: true,  types: ['rock','poison'],   ability: 'Toxic Debris',    item: 'Glimmorite',      moves: ['Earth Power','Sludge Bomb','Power Gem','Protect'] },

  garchomp:        { types: ['dragon','ground'],  ability: 'Rough Skin',       item: 'Life Orb',         moves: ['Earthquake','Dragon Claw','Rock Slide','Protect'] },
  kingambit:       { types: ['dark','steel'],     ability: 'Supreme Overlord', item: 'Black Glasses',    moves: ['Sucker Punch','Kowtow Cleave','Iron Head','Protect'] },
  sneasler:        { types: ['fighting','poison'],ability: 'Unburden',          item: 'Grassy Seed',      moves: ['Close Combat','Dire Claw','Acrobatics','Protect'] },
  basculegion:     { name: 'Basculegion',         types: ['water','ghost'],    ability: 'Adaptability',   item: 'Choice Scarf',     moves: ['Wave Crash','Last Respects','Aqua Jet','Protect'] },
  samurottHisui:   { name: 'Samurott-Hisui',      types: ['water','dark'],     ability: 'Sharpness',      item: 'Focus Sash',       moves: ['Ceaseless Edge','Razor Shell','Sucker Punch','Protect'] },
  dragapult:       { types: ['dragon','ghost'],   ability: 'Clear Body',        item: 'Choice Specs',     moves: ['Draco Meteor','Shadow Ball','Flamethrower','U-turn'] },
  ursaluna:        { types: ['ground','normal'],  ability: 'Guts',              item: 'Flame Orb',        moves: ['Facade','Headlong Rush','Earthquake','Protect'] },
  baxcalibur:      { types: ['dragon','ice'],     ability: 'Thermal Exchange',  item: 'Loaded Dice',      moves: ['Glaive Rush','Icicle Spear','Ice Shard','Protect'] },
  excadrill:       { types: ['ground','steel'],   ability: 'Sand Rush',         item: 'Focus Sash',       moves: ['Earthquake','Iron Head','Rock Slide','Protect'] },
  rotomWash:       { name: 'Rotom-Wash',          types: ['electric','water'],  ability: 'Levitate',       item: 'Sitrus Berry',     moves: ['Hydro Pump','Thunderbolt','Will-O-Wisp','Protect'] },
  arcanineHisui:   { name: 'Arcanine-Hisui',      types: ['fire','rock'],       ability: 'Rock Head',      item: 'Choice Band',      moves: ['Flare Blitz','Head Smash','Extreme Speed','Crunch'] },

  incineroar:      { types: ['fire','dark'],      ability: 'Intimidate',        item: 'Safety Goggles',   moves: ['Fake Out','Knock Off','Parting Shot','Flare Blitz'] },
  whimsicott:      { types: ['grass','fairy'],    ability: 'Prankster',         item: 'Covert Cloak',     moves: ['Moonblast','Tailwind','Encore','Protect'] },
  pelipper:        { types: ['water','flying'],   ability: 'Drizzle',           item: 'Damp Rock',        moves: ['Hurricane','Hydro Pump','Tailwind','Protect'] },
  torkoal:         { types: ['fire'],             ability: 'Drought',           item: 'Charcoal',         moves: ['Eruption','Heat Wave','Earth Power','Protect'] },
  amoonguss:       { types: ['grass','poison'],   ability: 'Regenerator',       item: 'Rocky Helmet',     moves: ['Spore','Rage Powder','Pollen Puff','Clear Smog'] },
  indeedeeF:       { name: 'Indeedee-F',          types: ['psychic','normal'],  ability: 'Psychic Surge',  item: 'Psychic Seed',     moves: ['Follow Me','Trick Room','Psychic','Helping Hand'] },
  hatterene:       { types: ['psychic','fairy'],  ability: 'Magic Bounce',      item: 'Sitrus Berry',     moves: ['Trick Room','Dazzling Gleam','Psychic','Protect'] },
  porygon2:        { name: 'Porygon2',            types: ['normal'],            ability: 'Download',       item: 'Eviolite',         moves: ['Tri Attack','Ice Beam','Trick Room','Recover'] },
  farigiraf:       { types: ['normal','psychic'], ability: 'Armor Tail',        item: 'Throat Spray',     moves: ['Hyper Voice','Psychic','Trick Room','Helping Hand'] },
  grimmsnarl:      { types: ['dark','fairy'],     ability: 'Prankster',         item: 'Light Clay',       moves: ['Reflect','Light Screen','Spirit Break','Thunder Wave'] },
  rillaboom:       { types: ['grass'],            ability: 'Grassy Surge',      item: 'Assault Vest',     moves: ['Wood Hammer','Grassy Glide','Fake Out','U-turn'] },
  slowkingGalar:   { name: 'Slowking-Galar',      types: ['poison','psychic'],  ability: 'Regenerator',    item: 'Assault Vest',     moves: ['Sludge Bomb','Ice Beam','Psyshock','Trick Room'] },
};

/** Maps component mon keys to Pokémon Showdown sprite names. */
export const SPRITE_MAP: Record<string, string> = {
  megaCharizardY:  'charizard-megay',
  megaCharizardX:  'charizard-megax',
  megaGardevoir:   'gardevoir-mega',
  megaGengar:      'gengar-mega',
  megaLopunny:     'lopunny-mega',
  megaKangaskhan:  'kangaskhan-mega',
  megaAerodactyl:  'aerodactyl-mega',
  megaCamerupt:    'camerupt-mega',
  megaMedicham:    'medicham-mega',
  megaScizor:      'scizor-mega',
  megaTyranitar:   'tyranitar-mega',
  megaAbomasnow:   'abomasnow-mega',
  megaGlimmora:    'glimmora',
  garchomp:        'garchomp',
  kingambit:       'kingambit',
  sneasler:        'sneasler',
  basculegion:     'basculegion-f',
  samurottHisui:   'samurott-hisui',
  dragapult:       'dragapult',
  ursaluna:        'ursaluna',
  baxcalibur:      'baxcalibur',
  excadrill:       'excadrill',
  rotomWash:       'rotom-wash',
  arcanineHisui:   'arcanine-hisui',
  incineroar:      'incineroar',
  whimsicott:      'whimsicott',
  pelipper:        'pelipper',
  torkoal:         'torkoal',
  amoonguss:       'amoonguss',
  indeedeeF:       'indeedee-f',
  hatterene:       'hatterene',
  porygon2:        'porygon2',
  farigiraf:       'farigiraf',
  grimmsnarl:      'grimmsnarl',
  rillaboom:       'rillaboom',
  slowkingGalar:   'slowking-galar',
};

const SPRITE_BASE_STATIC   = 'https://play.pokemonshowdown.com/sprites/gen5';
const SPRITE_BASE_ANIMATED = 'https://play.pokemonshowdown.com/sprites/ani';

export function getSpriteUrl(monId: string, animated = false): string {
  const name = SPRITE_MAP[monId] ?? monId.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  return animated
    ? `${SPRITE_BASE_ANIMATED}/${name}.gif`
    : `${SPRITE_BASE_STATIC}/${name}.png`;
}
