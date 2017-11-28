import React, {Component} from 'react'
import ReactDOM from 'react-dom'
// import * as $ from 'jquery'

class Modal extends Component {
    componentDidMount(){
        const element = ReactDOM.findDOMNode(this);
        console.log(element);
        // $(this.getDOMNode()).modal('show');
        // $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
    }
    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  aaaa
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
            </div>

        )
    }
}

export default Modal