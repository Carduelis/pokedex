import { types } from 'mobx-state-tree';
import MdFitnessCenter from 'react-icons/lib/md/fitness-center'; // Attack
import FaShield from 'react-icons/lib/fa/shield'; // Defense
import MdOpacity from 'react-icons/lib/md/opacity'; // Exp
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'; // HP
import GoRocket from 'react-icons/lib/go/rocket'; // Speed
import MdVerticalAlignTop from 'react-icons/lib/md/vertical-align-top'; // Height
import GoPackage from 'react-icons/lib/go/package'; // Weight

const state = types.maybe(
	types.enumeration('State', ['pending', 'done', 'error'])
);

const pokemonsMeta = [
	{
		api: 'pkdx_id',
		short_title: 'pkdx_id',
		title: 'ID',
		icon: null,
		type: types.identifier(types.number)
	},
	{
		api: 'name',
		short_title: 'Name',
		title: 'name',
		icon: null,
		type: types.string
	},
	{
		api: 'attack',
		short_title: 'Atk',
		title: 'attack',
		icon: MdFitnessCenter,
		type: types.number
	},
	{
		api: 'defense',
		short_title: 'Def',
		title: 'defense',
		icon: FaShield,
		type: types.number
	},
	{
		api: 'exp',
		short_title: 'Exp',
		title: 'experience',
		icon: MdOpacity,
		type: types.number
	},
	{
		api: 'hp',
		short_title: 'HP',
		title: 'HP',
		icon: TiHeartFullOutline,
		type: types.number
	},
	{
		api: 'speed',
		short_title: 'speed',
		title: 'speed',
		icon: GoRocket,
		type: types.number
	},
	{
		api: 'height',
		short_title: 'height',
		title: 'height',
		icon: MdVerticalAlignTop,
		type: types.string
	},
	{
		api: 'weight',
		short_title: 'weight',
		title: 'weight',
		icon: GoPackage,
		type: types.string
	}
];

const pokemonAvatarMeta = {
	api: 'image',
	short_title: 'Avatar',
	title: 'avatar'
};

const pokemonPlainTypes = pokemonsMeta.reduce((acc, item) => {
	acc[item.api] = item.type;
	return acc;
}, {});

// const meta = pokemonsMeta.map(item => {
// 	const new
// 	return
// })

export { state, pokemonPlainTypes, pokemonsMeta, pokemonAvatarMeta };
