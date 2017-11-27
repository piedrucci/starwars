
export const utils = {
	getData() {
	    const response = fetch( 'https://swapi.co/api/people')
	    return response
	},

	getSpecies(endPoint) {
	    const response = fetch(endPoint)
	    return response
	},

	getPeople(idPeople) {
	    const response = fetch('https://swapi.co/api/people/'+idPeople)
	    return response
	},


	getFilms(endPoint) {
	    const response = fetch(endPoint)
	    return response
	},

}