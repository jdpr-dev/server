import Knex from 'knex';

export async function seed(knex: Knex){
	await knex('items').insert([
		{ name: 'Lâmpadas', image: 'lampadas.svg' },
		{ name: 'Pilhas e Baterias', image: 'baterias.svg' },
		{ name: 'Papeis e Papelão', image: 'papeis-papelao.svg' },
		{ name: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
		{ name: 'Residuos Orgânicos', image: 'organicos.svg' },
		{ name: 'Óleao de Cozinha', image: 'oleao.svg' },
	]);
}