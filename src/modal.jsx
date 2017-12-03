import React, {Component} from 'react'

const labels = {fontWeight: 'bold'}


class Modal extends Component {

    render({data, type} = this.props) {
      const info = (typeof data === 'undefined') ? null : data
      let title = ''

      if (info!==null && type==='films') {
        title = info.title
      }else if (info!==null && (type==='vehicles' || type==='starships') ) {
        title = info.name
      }

      return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h5 className="modal-title" id="exampleModalLabel" style={{color: 'white'}}>{title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {
                (info !== null && type==='films') ?
                <div>
                  <span style={labels}>Director: </span>{info.director}<br />
                  <span style={labels}>Producer: </span>{info.producer}<br />
                  <span style={labels}>Release: </span>{info.release_date}<br />
                  <span style={labels}>Opening Crawl: </span>{info.opening_crawl}<br />
                </div>
                :null
              }
              {
                (info !== null && type==='vehicles') ?
                <div>
                  <span style={labels}>Model: </span>{info.model}<br />
                  <span style={labels}>Maufacturer: </span>{info.manufacturer}<br />
                  <span style={labels}>Length: </span>{info.length}<br />
                  <span style={labels}>Crew: </span>{info.crew}<br />
                  <span style={labels}>Passengers: </span>{info.passengers}<br />
                  <span style={labels}>Class: </span>{info.vehicle_class}<br />
                </div>
                :null
              }
              {
                (info !== null && type==='starships') ?
                <div>
                  <span style={labels}>Model: </span>{info.model}<br />
                  <span style={labels}>Maufacturer: </span>{info.manufacturer}<br />
                  <span style={labels}>Length: </span>{info.length}<br />
                  <span style={labels}>Crew: </span>{info.crew}<br />
                  <span style={labels}>Passengers: </span>{info.passengers}<br />
                  <span style={labels}>Class: </span>{info.starship_class}<br />
                  <span style={labels}>Consumables: </span>{info.consumables}<br />
                  <span style={labels}>MGLT: </span>{info.MGLT}<br />
                </div>
                :null
              }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
        </div>

        )
    }
}

export default Modal