import {Request, Response } from 'express';
import knex from '../database/connection';

class PointsController{

	async index(request: Request, response: Response) {
		const { city, uf, items } = request.query;

		const parsedItems = String(items).split(',').map(item => Number(item.trim()));

		const points = await knex('points')
			.join('points_items', 'points.id', '=', 'points_items.point_id')
			.whereIn('points_items.item_id', parsedItems)
			.where('city', String(city))
			.where('uf', String(uf))
			.distinct()
			.select('points.*');

		return response.json(points);
	}

	async create(request: Request, response: Response) {
		const {
			name,
			email,
			phone,
			latitude,
			longitude,
			city,
			uf,
			items
		} = request.body;
	
		await knex.transaction( async trx => {
			const point = {
				image : 'https://images.unsplash.com/photo-1475275083424-b4ff81625b60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1464&q=60',
				name,
				email,
				phone,
				latitude,
				longitude,
				city,
				uf
			}
			const insertedIds = await trx('points').insert( point );
			const point_id = insertedIds[0];	
			
			const pointItems = items.map((item_id: number) => {
				return {
					item_id,
					point_id,
				};
			});

			await trx('points_items').insert(pointItems);
			
			return response.json({id: point_id, ...point,});
		});
	}

	async show(request: Request, response: Response){
		const { id } = request.params;
		const point = await knex('points').where('id', id).first();

		if(!point){
			return response.status(404).json({
				status: "404",
				message: "Point not Found.",
				error: true
			});
		}

		const items = await knex('items')
			.join('points_items', 'items.id', '=', 'points_items.item_id')
			.where('points_items.point_id', id)
			.select('items.name');

		return response.json({point, items});
	}
}

export default PointsController;