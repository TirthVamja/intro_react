import React from 'react';
import {Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle, Media} from 'reactstrap';
import {format} from 'date-fns';

function RenderDish({ dishess }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dishess.image} alt={dishess.name}></CardImg>
                <CardBody>
                    <CardTitle>{dishess.name}</CardTitle>
                    <CardText>{dishess.description}</CardText>
                </CardBody>   
            </Card>
        </div>
    );
}

function RenderComments({ comments }) {
    const comment = comments.map((x) => {
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
        <div className="col-12 col-md-5 m-1">
            <div><h4><b>Comments</b></h4></div>
            {comment}
        </div>
    );
}

const DishDetail=(props)=>{


        if(props.dishess==null){
            return(
                <div></div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <RenderDish dishess={props.dishess} />
                    <RenderComments comments={props.dishess.comments} />
                </div>
            </div>
        );
}

export default DishDetail;