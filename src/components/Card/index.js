import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './Card.css';
import loadingGif from '../../img/loading.gif';

const GET_PETS = gql`
	query GetPets {
		pets(order_by: { created_at: desc }) {
			id
			pet_images
			title
			description
		}
	}
`;

function Card() {
	const { loading, error, data } = useQuery(GET_PETS);
	if (loading)
		return (
			<p>
				<img src={loadingGif} className="gif-loading" alt="" />
			</p>
		);
	if (error) return <p>Error :(</p>;
	return (
		<>
			<div className="container mt-4">
				<div className="row" style={{ justifyContent: 'center' }}>
					{data.pets.map(({ id, pet_images, title, description }) => (
						<div key={id} className="card-container">
							<div className="image-container">
								<img src={pet_images.split(',')[0]} alt="" />
							</div>
							<div className="card-content">
								<div className="card-title">
									<h6>{title}</h6>
								</div>
								<div className="card-bodys">
									<p>{description.substring(0, 100)}...</p>
								</div>
							</div>
							<div className="btn" style={{ display: 'flex' }}>
								<a
									href={`/detay?id=${id}`}
									style={{
										textTransform: 'uppercase',
										color: 'cadetblue',
										textDecoration: 'none',
										fontWeight: 'bold',
									}}
								>
									<h6>Profil</h6>
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Card;
