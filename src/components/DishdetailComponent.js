import React from 'react';
import { Card, CardImg, CardText, CardTitle, Breadcrumb,BreadcrumbItem  } from 'reactstrap';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';


function RenderDish({ dish }) {
    return (
         <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardTitle className="ml-3 mt-2">{dish.name}</CardTitle>
                <CardText className="ml-3">{dish.description}</CardText>
            </Card>
        </div>
    );
}

function RenderComments({ comments }) {
    const comment = comments.map((cmt) => {
        return (
            <div key={cmt.id}>
                <div className="col-12 col-md-12 mb-3">{cmt.comment}</div>
                <div className="col-12 col-md-12 mb-3">-- {cmt.author} , {format(new Date(cmt.date), 'MMM dd, yyyy')}</div>
            </div>
        );
    });
    return (
        <div className="m-1 col-12 col-md-5">
            <h4>Comments</h4>
            {comment}
        </div>
    );
}

const DishDetail = (props) => {
    
        if (props.dish == null) {
            return (
                <div></div>
            );
        }

        
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );


}

export default DishDetail;
