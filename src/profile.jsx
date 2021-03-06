import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { utils } from './utils'
import male from './images/male.png'
import female from './images/female.png'
import na from './images/questionMark.png'
import Modal from './modal'

const labelStyle = {fontWeight: 'bold'}

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            films: null,
            vehicles: null,
            starships: null,
        }
    }

    componentDidMount() {
        this.process()
    }

    process = async() => {
        const films     = this.props.AppInfo.peopleInfo.films || []
        const vehicles  = this.props.AppInfo.peopleInfo.vehicles || []
        const starships = this.props.AppInfo.peopleInfo.starships || []

        await this.lazyLoad(films, 'films')
        await this.lazyLoad(vehicles, 'vehicles')
        await this.lazyLoad(starships, 'starships')
    }

    lazyLoad = async(arrayData, type) => {
        const vector = Promise.all( arrayData.map( async(row,index) => {
            const response = await utils.dataAdapter(row)
            const jsonData = await response.json()
            // return jsonData[field]
            return jsonData
            } )
        )
        vector.then( async(values) => {
            if (type==='films'){await this.setState({films: values})}
            if (type==='vehicles'){await this.setState({vehicles: values})}
            if (type==='starships'){await this.setState({starships: values})}
        } )
    }

    fillModalInfo = async(type = 'films', info)=>{
        await this.setState({type: type, modalData: info})
    }

    render({AppInfo} = this.props) {
        let {peopleInfo} = AppInfo
        const profileLoaded = !(Object.keys(peopleInfo).length === 0 && peopleInfo.constructor === Object)
        
        let genderImage = male
        if ( peopleInfo.gender==='female' ) genderImage = female
        if ( peopleInfo.gender==='n/a' ) genderImage = na

        return (

            <div>
            {
                profileLoaded ?
                <div className="d-flex flex-row flex-wrap">
                

                <div className="p-2" style={{width: 300}} >
                <Modal data={this.state.modalData} type={this.state.type} />
                    <div className="card"  >
                        <div className="card-header">
                            <h4 >{peopleInfo.name}</h4>
                        </div>
                        <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><span style={labelStyle}>Height:</span> {peopleInfo.height}</li>
                            <li className="list-group-item"><span style={labelStyle}>Mass:</span> {peopleInfo.mass}</li>
                            <li className="list-group-item"><span style={labelStyle}>Hair Color:</span> {peopleInfo.hair_color}</li>
                            <li className="list-group-item"><span style={labelStyle}>Skin Color:</span> {peopleInfo.skin_color}</li>
                            <li className="list-group-item"><span style={labelStyle}>Eye Color:</span> {peopleInfo.eye_color}</li>
                            <li className="list-group-item"><span style={labelStyle}>Birth Year:</span> {peopleInfo.birth_year}</li>
                            <li className="list-group-item">
                                <span style={labelStyle}>Gender:</span> {peopleInfo.gender}
                                &nbsp;&nbsp;<img src={genderImage} alt="." style={{width:24, height:24}}/>
                            </li>
                        </ul>

                        <br />
                        <p className="text-center"><Link to="/" className="btn btn-primary center-text">Go back to list! &nbsp; &nbsp;<i className="fa fa-th-list" aria-hidden="true"></i></Link></p>
                            
                        </div>
                    </div>
                </div>

                <div className="p-2" style={{width: 350}} >
                    <div id="accordion" role="tablist">
                    <div className="card">
                        <div className="card-header" role="tab" id="headingOne">
                            <h5 className="mb-0">
                            <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Films &nbsp;{this.state.films!==null?<span className="badge badge-primary">{this.state.films.length}</span>:null}
                            </a>
                            </h5>
                        </div>
                
                    <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                    
                        <div className="list-group">
                        {
                            this.state.films !==null?
                            this.state.films.map((film,index)=>{
                                return <button type="button" key={index} 
                                className="list-group-item list-group-item-action"
                                data-toggle="modal" data-target="#exampleModal"
                                onClick={()=>this.fillModalInfo('films', film)}
                                >{film.title}</button>
                            })
                            :null
                        }
                        </div> 
                    </div>
                    </div>

                    {this.state.vehicles !== null?
                        this.state.vehicles.length>0?
                    <div className="card">
                    <div className="card-header" role="tab" id="headingTwo">
                        <h5 className="mb-0">
                        <a className="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Vehicles &nbsp;{this.state.vehicles!==null?<span className="badge badge-primary">{this.state.vehicles.length}</span>:null}
                        </a>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                        
                        <ul className="list-group">
                        {
                            this.state.vehicles !==null?
                            this.state.vehicles.map((vehicle,index)=>{
                                return <button type="button"
                                key={index} 
                                className="list-group-item list-group-item-action"
                                data-toggle="modal" data-target="#exampleModal"
                                onClick={()=>this.fillModalInfo('vehicles', vehicle)}>{vehicle.name}</button>
                            })
                            :null
                        }
                        </ul> 
                    </div>
                    </div>
                    :null:null}

                    {this.state.starships !== null?
                    this.state.starships.length>0?
                    <div className="card">
                    <div className="card-header" role="tab" id="headingThree">
                        <h5 className="mb-0">
                        <a className="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Starships &nbsp;{this.state.starships!==null?<span className="badge badge-primary">{this.state.starships.length}</span>:null}
                        </a>
                        </h5>
                    </div>
                    <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                        
                        <ul className="list-group">
                        {
                            this.state.starships !==null?
                            this.state.starships.map((starship,index)=>{
                                return <button type="button" key={index} 
                                className="list-group-item list-group-item-action"
                                data-toggle="modal" data-target="#exampleModal"
                                onClick={()=>this.fillModalInfo('starships', starship)}>{starship.name}</button>
                            })
                            :null
                        }
                        </ul> 
                    </div>
                    </div>
                    :null:null}

                </div>
                </div>

                </div>
                : 
                <div className="alert alert-danger" role="alert">
                    sorry! you must select a character in the list <br />
                    <Link to="/" className="btn btn-danger">Go to list! &nbsp; &nbsp;<i className="fa fa-th-list" aria-hidden="true"></i></Link>
                </div> 
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
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		fillPeople: data => dispatch(appActions.fillPeople(data)),
// 	}
// }

export default connect(mapStateToProps, null)(Profile)