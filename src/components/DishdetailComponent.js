import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle, Media} from 'reactstrap';
import {format} from 'date-fns';

class DishDetail extends Component{

    constructor(props){
        super(props);
    }

    render(){

        const comments = this.props.dishess.comments.map((x) => {
            return (
                <div key={x.id}>
                    {x.comment} <br></br><br></br>
                    -- {x.author}&nbsp;,&nbsp;
                    {format(new Date(x.date), 'MMM dd, yyyy')}
                    <br></br><br></br>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={this.props.dishess.image} alt={this.props.dishess.name}></CardImg>
                            <CardBody>
                                <CardTitle>{this.props.dishess.name}</CardTitle>
                                <CardText>{this.props.dishess.description}</CardText>
                            </CardBody>   
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <div><h4><b>Comments</b></h4></div>
                        {comments}
                        {/* {this.props.dishess.comment} */}
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;