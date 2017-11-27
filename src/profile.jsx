import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { utils } from './utils'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            films: null
        }
    }

    componentDidMount() {
        console.log('didMount')
        this.process()
    }
    process = async() => {
        const f = this.props.AppInfo.peopleInfo.films || []

        const peopleFilms = Promise.all( f.map( async(film,index) => {
            const resfilms = await utils.getFilms(film)
            const jsonFilms = await resfilms.json()
            return jsonFilms.title
            } )
        )
        peopleFilms.then( async(values) => {
            // console.log(values)
            await this.setState({films: values})

        } )
    }

    render({AppInfo} = this.props) {
        let {peopleInfo} = AppInfo
        const profileLoaded = !(Object.keys(peopleInfo).length === 0 && peopleInfo.constructor === Object)
        // console.log(this.props.match.params.idProfile)

        console.log(`validProfile: ${profileLoaded}`)
        const peopleFilms = (profileLoaded) ? peopleInfo.films : []

        let promiseFilms = Promise.all( peopleFilms.map( async(film, index) => {
            const responseFilm = await utils.getFilms(film)
            const jsonFilm = await responseFilm.json()
            return jsonFilm.title
        } )
        )

        
        // let films = []
        // films = promiseFilms.then( values => {
        //     films=values.map( (e, i) => {
        //         return e
        //     } )
        //     console.log(films)
        //     return films
        // } )


        return (

            <div className="d-flex flex-row flex-wrap">
            {
                profileLoaded ?
                <div>
                
                <div className="p-2">
                <div className="card" style={{width: 250}} >
                    <div className="card-body">
                        <h4 className="card-title">{peopleInfo.name}</h4>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Height: {peopleInfo.height}</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                    <div className="card-body">
                        
                        <Link to="/">Go to list!</Link>
                    </div>
                </div>
                </div>

                <div className="p-2">
                    <div id="accordion" role="tablist">
                    <div className="card">
                    <div className="card-header" role="tab" id="headingOne">
                        <h5 className="mb-0">
                        <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Films
                        </a>
                        </h5>
                    </div>
                
                    <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                            <ul className="list-group">
                            <li className="list-group-item">{(this.state.films!==null)?this.state.films[0]:null}</li>
                            
                            
                            </ul> 
                        </div>
                    </div>
                    </div>
                    <div className="card">
                    <div className="card-header" role="tab" id="headingTwo">
                        <h5 className="mb-0">
                        <a className="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Collapsible Group Item #2
                        </a>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                    </div>
                    <div className="card">
                    <div className="card-header" role="tab" id="headingThree">
                        <h5 className="mb-0">
                        <a className="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Collapsible Group Item #3
                        </a>
                        </h5>
                    </div>
                    <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>
                : <div className="alert alert-danger" role="alert">
                sorry! you must select a character in the list <br />
                <Link to="/" className="btn btn-danger">Go to list! <i className="fa fa-th-list" aria-hidden="true"></i>
                </Link>
              </div> }
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