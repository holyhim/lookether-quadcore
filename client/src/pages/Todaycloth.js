import React from 'react';

class Todaycloth extends React.Component {
    render() {
        return (
    <div class="card">
        <div class="card-body">
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img className="d-block w-100" src="https://i.imgur.com/BwlWYvT.jpg#.Xv9fxDRfLKM.link" alt="First slide" />
                </div>
                <div className="carousel-item">
                <img className="d-block w-100" src="https://i.imgur.com/UJge4GP.jpg#.Xv9f4OkQp2Y.link" alt="Second slide" />
                </div>
                <div className="carousel-item">
                <img className="d-block w-100" src="https://i.imgur.com/B14SHJT.png#.Xv9f_AlrbSw.link" alt="Third slide" />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a>
            </div>
        <h5 class="card-title">Todaycloth</h5>
        </div>
    </div>
        );
    }
}

export {Todaycloth}
