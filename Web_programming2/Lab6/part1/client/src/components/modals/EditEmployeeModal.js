import React, { Component } from "react";
//Import Query from react-apollo
import { Query, Mutation } from "react-apollo";
import ReactModal from "react-modal";

//Import the file where my query constants are defined
import queries from "../../queries";

//For react-modal
ReactModal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    border: "1px solid #28547a",
    borderRadius: "4px"
  }
};

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered.
That’s the important part: it executes the query when it is rendered.
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class EditEmployeesModal extends Component {
  constructor(props) {
    //console.log(this.props.employee);
    super(props);
    this.state = {
      showEditModal: this.props.isOpen,
      employee: this.props.employee
    };
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
  }

  handleCloseEditModal() {
    this.setState({ showEditModal: false, employee: null });
    this.props.handleClose();
  }

  render() {
    let title;
    let userId;
    let completed;
    console.log(this.state.employee);
    return (
        <div>
          {/*Edit Employee Modal - NOT DONE YET */}
          <ReactModal
              name="editModal"
              isOpen={this.state.showEditModal}
              contentLabel="Edit Employee"
              style={customStyles}
          >
            <Mutation mutation={queries.EDIT_TODOS}>
              {(editEmployee, { data }) => (
                  <form
                      className="form"
                      id="add-employee"
                      onSubmit={e => {
                        e.preventDefault();
                        editEmployee({
                          variables: {
                            id: this.state.employee.id,
                            title: title.value,
                            userId: userId.value,
                            completed: completed.value
                          }
                        });
                        title.value = "";
                        userId.value= "";
                        completed.value = "";

                        this.setState({ showEditModal: false });
                        alert("Todos Updated");
                        this.props.handleClose();
                      }}
                  >
                    <div className="form-group">
                      <label>
                        TITLE:
                        <br />
                        <input
                            ref={node => {
                              title = node;
                            }}
                            defaultValue={this.props.employee.title}
                            autoFocus={true}
                        />
                      </label>
                      <br/>
                      <label>
                        USERID:
                        <br />
                        <select ref={node => {
                          userId = node;
                        }}
                                defaultValue={this.props.employee.userId}
                        >
                          <option value="1">User 1</option>
                          <option value="2">User 2</option>
                          <option value="3">User 3</option>
                          <option value="4">User 4</option>
                          <option value="5">User 5</option>
                          <option value="6">User 6</option>
                          <option value="7">User 7</option>
                          <option value="8">User 8</option>

                        </select>
                        <br/>
                        COMPLETED
                        <br />
                        <select  ref={node => {
                          completed = node;
                        }}

                                defaultValue={this.props.employee.completed}
                        >
                          <option value= "true">True</option>
                          <option  value= "false">False</option>
                        </select>
                      </label>


                    </div>
                    <br />
                    {/*<div className="form-group">*/}
                    {/*  <label>*/}
                    {/*    Last Name:*/}
                    {/*    <br />*/}
                    {/*    <input*/}
                    {/*        ref={node => {*/}
                    {/*          lastName = node;*/}
                    {/*        }}*/}
                    {/*        defaultValue={this.props.employee.lastName}*/}
                    {/*    />*/}
                    {/*  </label>*/}
                    {/*</div>*/}
                    {/*<br />*/}

                    {/*<Query query={queries.GET_EMPLOYERS}>*/}
                    {/*  {({ data }) => {*/}
                    {/*    const { employers } = data;*/}
                    {/*    if (!employers) {*/}
                    {/*      return null;*/}
                    {/*    }*/}
                    {/*    return (*/}
                    {/*        <div className="form-group">*/}
                    {/*          <label>*/}
                    {/*            Employer:*/}
                    {/*            <select*/}
                    {/*                defaultValue={this.props.employee.employer.id}*/}
                    {/*                className="form-control"*/}
                    {/*                ref={node => {*/}
                    {/*                  employerId = node;*/}
                    {/*                }}*/}
                    {/*            >*/}
                    {/*              {employers.map(employer => {*/}
                    {/*                return (*/}
                    {/*                    <option key={employer.id} value={employer.id}>*/}
                    {/*                      {employer.name}*/}
                    {/*                    </option>*/}
                    {/*                );*/}
                    {/*              })}*/}
                    {/*            </select>*/}
                    {/*          </label>*/}
                    {/*        </div>*/}
                    {/*    );*/}
                    {/*  }}*/}
                    {/*</Query>*/}
                    {/*<br />*/}
                    <br />
                    <button className="button add-button" type="submit">
                      Update Todos
                    </button>
                  </form>
              )}
            </Mutation>
            <button
                className="button cancel-button"
                onClick={this.handleCloseEditModal}
            >
              Cancel
            </button>
          </ReactModal>
        </div>
    );
  }
}

export default EditEmployeesModal;
