import React from "react";

export default function () {
    return (
        <div className="films">
            <div className="card films__item filmPanel">
                <div className="row filmPanel__inner">
                    <div className="col-md-4">
                        <img src="https://via.placeholder.com/500x500" className="card-img filmPanel__poster" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body filmPanel__tail">
                            <h5 className="card-title filmPanel__name"> Lorem ipsum dolor <span
                                className=" filmPanel__year">2015</span></h5>
                            <p className="card-text filmPanel__description"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate eius error fuga necessitatibus quibusdam veritatis?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}