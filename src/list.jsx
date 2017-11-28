import React, { Component } from 'react'
import {utils} from './utils'
import male from './images/male.png'
import female from './images/female.png'
import na from './images/questionMark.png'
import _ from 'lodash'
import Spinner from 'react-spinkit'
import { connect } from 'react-redux';
import * as appActions from './actions'
import { Link } from 'react-router-dom'


class ListData extends Component {

	constructor(props){
		super(props)
		this.state = {
			data: props.AppInfo.peopleData || [],
			rows: null,
			loading: false,
			characters: [],
			pageButtons: []
		}
		this.loadPeople = this.loadPeople.bind(this)
		this.proccessInfo = this.proccessInfo.bind(this)
		this.prepareProfile = this.prepareProfile.bind(this)
		this.loadPageResults = this.loadPageResults.bind(this)
	}

	componentDidMount() {
		this.loadPeople()
	}

	loadPeople = async() => {

		if ( this.props.AppInfo.peopleData.length === 0 ){
			await this.setState({loading:true})
			const response = await utils.getData()
			const jsonData = await response.json()

			// ======================================================= P A G I N A T I O N 
			let pagination = this.props.AppInfo.pagination
			pagination.count = jsonData.count

			const totalPages = Math.ceil(jsonData.count/10)
			const arrSplit = jsonData.next.split('/')
			const arrSplit2= arrSplit[5].split('=')
			pagination.pages = totalPages
			pagination.next = arrSplit2[1]
			let pButtons = []
			for (var i = 0; i < pagination.pages; i++) {
				console.log(i)
				pButtons.push(<li key={i} className="page-item">
				<a className="page-link" role="button" onClick={()=>this.loadPageResults()}>{i+1}</a></li>)
			} 
			await this.setState({pageButtons: pButtons})
			//  =============================================================================

			// para cargar el nombre de la especie
			const db = jsonData.results
			let db2 = Promise.all( db.map(async(character, index)=>{
				let newInfo = {
					url: character.url,
					name: character.name,
					height: character.height,
					mass: character.mass,
					hair_color: character.hair_color,
					skin_color: character.skin_color,
					eye_color: character.eye_color,
					birth_year: character.birth_year,
					gender: character.gender,
					specie: await this.getSpecieName(character.species[0]),
					films: character.films,
					vehicles: character.vehicles,
					starships: character.starships
				}
				return newInfo
				})
			)
			db2.then( values => {
				this.setState({characters: values})
				this.props.fillPeople(values)
				this.proccessInfo()
			} )

			// await this.props.fillPeople(jsonData.results)
			// this.proccessInfo()
		}else{
			await this.setState({rows: this.props.AppInfo.characters})
		}
	}

	loadPageResults = async(page) => {
		// const response = await utils.getData(page)
		// const jsonData = await response.json()
		console.log(page)
	}

	sort = async(column) => {
		await this.setState({order: (this.state.order==='asc')? 'desc':'asc'})
		const arrObj = ( this.state.order === 'desc' ) 
			? _.sortBy(this.props.AppInfo.peopleData, column, this.state.order).reverse()
			: _.sortBy(this.props.AppInfo.peopleData, column, this.state.order)

		await this.props.fillPeople(arrObj)
		this.proccessInfo()
	}

	getSpecieName = async(path) => {
		const responseEspecies = await utils.getSpecies(path)
		const species = await responseEspecies.json()
		return species.name
	}

	proccessInfo = async() => {
		let peopleData = this.props.AppInfo.peopleData
		
		let rows = null
		if ( peopleData.length>0 ){
			rows = peopleData.map( (row, index) => {

				let genderImage = null

				if (row.gender.toLowerCase() === 'male'){ genderImage = male }
				if (row.gender.toLowerCase() === 'female'){ genderImage = female }
				if (row.gender.toLowerCase() === 'n/a'){ genderImage = na }

				const arrUrl = row.url.split('/')
				const profileId = arrUrl[5]
				

				return <tr key={index}>
						<td><Link to={`/people/${profileId}`} style={{fontWeight: 'bold'}} onClick={()=>this.prepareProfile(row)}>{row.name}</Link></td>
						<td>{row.height}</td>
						<td>{row.mass}</td>
						<td>{row.hair_color}</td>
						<td>{row.skin_color}</td>
						<td>{row.eye_color}</td>
						<td>{row.birth_year}</td>
						<td><img src={genderImage} alt="gender" style={{width:24, height:24}}/></td>
						<td>{row.specie}</td>
				</tr>
			} )
		}
		await this.setState({rows: rows, loading:false})
		await this.props.fillRows(rows)
	}

	prepareProfile = async(profile) => {
		await this.props.fillProfile(profile)
	}

	render(){
		return (
			<div>
				{
					(!this.state.loading)?
					<div>
					<h4>Characters List</h4>
					<table className="table table-hover table-striped table-sm" style={{backgroundColor: 'white'}}>
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Height</th>
								<th scope="col">Mass</th>
								<th scope="col">Hair Color</th>
								<th scope="col">Skin Color</th>
								<th scope="col">Eye Color</th>
								<th scope="col">Birth Year</th>
								<th scope="col">Gender</th>
								<th scope="col" style={{cursor: 'pointer'}} onClick={this.sort.bind(this, 'specie')}>Specie</th>
							</tr>
						</thead>
						<tbody>
							{this.state.rows}
						</tbody>
					</table>

					

					</div>
					:<Spinner name="ball-pulse-sync" color="blue" fadeIn='none' />
				}

			</div>
		)
	}
}


// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
	return {
		AppInfo: state.appInfo
	}
}
  
// Maps actions to props
const mapDispatchToProps = (dispatch) => {
	return {
		fillPeople: data => dispatch(appActions.fillPeople(data)),
		fillProfile: data => dispatch(appActions.fillProfile(data)),
		fillRows: data => dispatch(appActions.fillRows(data)),
		setPagination: data => dispatch(appActions.setPagination(data)),
	}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ListData)