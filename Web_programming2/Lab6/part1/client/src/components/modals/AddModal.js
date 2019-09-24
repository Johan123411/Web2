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
class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddModal: this.props.isOpen
        };
        this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
    }

    handleOpenAddModal() {
        this.setState({ showAddModal: true });
    }

    handleCloseAddModal() {
        this.setState({ showAddModal: false });
        this.props.handleClose(false);
    }
    render() {
        let body;
        //check which add modal they are trying to get to and then render the form, mutation/query accordingly
        //if Add Employee
        if (this.props.modal === "addEmployee") {
            let title;
            let userId;
            body = (
                <Mutation
                    mutation={queries.ADD_TODOS}
                    update={(cache, {data: {addEmployee}}) => {
                        const {employees} = cache.readQuery({
                            query: queries.ADD_TODOS
                        });
                        cache.writeQuery({
                            query: queries.GET_TODOS,
                            data: {employees: employees.concat([addEmployee])}
                        });
                    }}
                >
                    {(addEmployee, {data}) => (
                        <form
                            className="form"
                            id="add-employee"
                            onSubmit={e => {
                                e.preventDefault();
                                addEmployee({
                                    variables: {
                                        title: title.value,
                                        userId: userId.value
                                    }
                                });
                                title.value = "";
                                title.value = "";
                                this.setState({showAddModal: false});
                                alert("Todo Added!!! plz reafresh!!!");
                                this.props.handleClose();
                            }}
                        >
                            <div className="form-group">
                                <label>
                                    Title
                                    <br/>
                                    <input
                                        ref={node => {
                                            title = node;
                                        }}
                                        required
                                        autoFocus={true}
                                    />
                                </label>

                                <label>
                                    userrId
                                    <br/>

                                    <select ref={node => {
                                        userId = node;
                                    }}
                                            autoFocus={true}
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
                                </label>


                            </div>
                            <br/>
                            {/*<div className="form-group">*/}
                            {/*  <label>*/}
                            {/*    Last Name:*/}
                            {/*    <br />*/}
                            {/*    <input*/}
                            {/*      ref={node => {*/}
                            {/*        lastName = node;*/}
                            {/*      }}*/}
                            {/*      required*/}
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
                            {/*      <div className="form-group">*/}
                            {/*        <label>*/}
                            {/*          Employer:*/}
                            {/*          <select*/}
                            {/*            className="form-control"*/}
                            {/*            ref={node => {*/}
                            {/*              employerId = node;*/}
                            {/*            }}*/}
                            {/*          >*/}
                            {/*            {employers.map(employer => {*/}
                            {/*              return (*/}
                            {/*                <option key={employer.id} value={employer.id}>*/}
                            {/*                  {employer.name}*/}
                            {/*                </option>*/}
                            {/*              );*/}
                            {/*            })}*/}
                            {/*          </select>*/}
                            {/*        </label>*/}
                            {/*      </div>*/}
                            {/*    );*/}
                            {/*  }}*/}
                            {/*</Query>*/}
                            {/*<br />*/}
                            <br/>
                            <button className="button add-button" type="submit">
                                Add QUOTE
                            </button>
                        </form>
                    )}
                </Mutation>
            );
            //If add Employer
            // } else if (this.props.modal === "addEmployer") {
            //   let name;
            //   body = (
            //     <Mutation
            //       mutation={queries.ADD_EMPLOYER}
            //       update={(cache, { data: { addEmployer } }) => {
            //         const { employers } = cache.readQuery({
            //           query: queries.GET_EMPLOYERS_WITH_EMPLOYEES
            //         });
            //         cache.writeQuery({
            //           query: queries.GET_EMPLOYERS_WITH_EMPLOYEES,
            //           data: { employers: employers.concat([addEmployer]) }
            //         });
            //       }}
            //     >
            //       {(addEmployer, { data }) => (
            //         <form
            //           className="form"
            //           id="add-employer"
            //           onSubmit={e => {
            //             e.preventDefault();
            //             addEmployer({
            //               variables: {
            //                 name: name.value
            //               }
            //             });
            //             name.value = "";
            //             this.setState({ showAddModal: false });
            //             alert("Employer Added");
            //             this.props.handleClose();
            //           }}
            //         >
            //           <div className="form-group">
            //             <label>
            //               Employer Name:
            //               <br />
            //               <input
            //                 ref={node => {
            //                   name = node;
            //                 }}
            //                 required
            //                 autoFocus={true}
            //               />
            //             </label>
            //           </div>
            //           <br />
            //
            //           <br />
            //           <br />
            //           <button className="button add-button" type="submit">
            //             Add Employer
            //           </button>
            //         </form>
            //       )}
            //     </Mutation>
            //   );
            // }
        }

        return (
            <div>
                <ReactModal
                    name="addModal"
                    isOpen={this.state.showAddModal}
                    contentLabel="Add Modal"
                    style={customStyles}
                >
                    {body}
                    <button
                        className="button cancel-button"
                        onClick={this.handleCloseAddModal}
                    >
                        Cancel
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default AddModal;
