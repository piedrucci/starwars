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
			loading: true,
			
		}
		this.loadPeople = this.loadPeople.bind(this)
		this.proccessInfo = this.proccessInfo.bind(this)
		this.prepareProfile = this.prepareProfile.bind(this)
	}

	componentDidMount() {
		this.loadPeople()
	}


	loadPeople = async() => {
		await this.setState({loading:true})
		const response = await utils.getData()
		const jsonData = await response.json()

		await this.props.fillPeople(jsonData.results)
		this.proccessInfo()
	}

	sort = async(column) => {
		await this.setState({order: (this.state.order==='asc')? 'desc':'asc'})
		const arrObj = ( this.state.order === 'desc' ) 
			? _.sortBy(this.props.AppInfo.peopleData, column, this.state.order).reverse()
			: _.sortBy(this.props.AppInfo.peopleData, column, this.state.order)

		await this.props.fillPeople(arrObj)
		this.proccessInfo()
	}

	sdd = async(path) => {
		const responseEspecies = await utils.getSpecies(path)
		const species = await responseEspecies.json()
		// console.log(species)
		return species
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

				// const ert = this.sdd(row.species[0])
				// const responseEspecies = utils.getSpecies(row.species[0])
				// const species = responseEspecies.json()
				// console.log(species.name)
				// console.log(ert)

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
						{/*<td>{ww.name}</td>*/}
				</tr>
			} )
		}
		await this.setState({rows: rows, loading:false})
	}

	prepareProfile = async(profile) => {
		await this.props.fillProfile(profile)
		// console.log(this.props.AppInfo.peopleInfo)
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
								<th scope="col" style={{cursor: 'pointer'}} onClick={this.sort.bind(this, 'height')}>Gender</th>
								<th scope="col">Species</th>
							</tr>
						</thead>
						<tbody>
							{this.state.rows}
						</tbody>
					</table>

					<nav aria-label="Page navigation example">
						<ul className="pagination justify-content-end" style={{cursor:'pointer'}}>
							<li className="page-item disabled">
								<a className="page-link" role="button" tabIndex="-1" >Previous</a>
							</li>
							<li className="page-item"><a className="page-link" role="button">1</a></li>
							<li className="page-item"><a className="page-link" role="button">2</a></li>
							<li className="page-item"><a className="page-link" role="button">3</a></li>
							<li className="page-item">
								<a className="page-link" role="button" >Next</a>
							</li>
						</ul>
					</nav>

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
	}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ListData)