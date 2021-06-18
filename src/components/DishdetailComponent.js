import React, {Component} from 'react';
import { Card, CardImg, CardText, CardTitle, Breadcrumb,BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,Row, Label,Col  } from 'reactstrap';
import { format } from 'date-fns';
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;


class CommentForm extends Component{
    constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    console.log(values.comment);
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <Col md={{ size: 12 }}>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows={5}
                    className="form-control"
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


function RenderDish({ dish }) {
    return (
         <div className="col-12 col-md-5 m-1">
            <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardTitle className="ml-3 mt-2">{dish.name}</CardTitle>
                <CardText className="ml-3">{dish.description}</CardText>
            </Card>
        </div>
    );
}

function RenderComments({ comments,postComment,dishId }) {
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
        <CommentForm dishId={dishId} postComment={postComment}/>
        </div>
    );
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
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
              <RenderComments comments={props.comments}
                postComment={props.postComment}
                dishId={props.dish.id}
              />
          </div>
      </div>
  );


}

export default DishDetail;