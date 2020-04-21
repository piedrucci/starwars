
export const utils = {
	getData(page=1) {
	    const response = fetch( 'https://swapi.dev/api/people/?page=' + page)
	    return response
	},

	getSpecies(endPoint) {
	    const response = fetch(endPoint)
	    return response
	},

	getPeople(idPeople) {
	    const response = fetch('https://swapi.dev/api/people/'+idPeople)
	    return response
	},


	dataAdapter(endPoint) {
	    const response = fetch(endPoint)
	    return response
	},

}
