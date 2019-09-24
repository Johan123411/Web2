import React, { Component } from "react";
//Import Query from react-apollo
import { Query } from "react-apollo";

//Import the Modals for Adding and Updating Employee
import AddModal from "./modals/AddModal";
import EditEmployeeModal from "./modals/EditEmployeeModal";
import DeleteEmployeeModal from "./modals/DeleteEmployeeModal";

//Import the file where my query constants are defined
import queries from "../queries";

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showAddModal: false,
      showDeleteModal: false,
      editEmployee: null,
      deleteEmployee: null
    };
    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
    this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
    this.handleCloseModals = this.handleCloseModals.bind(this);
  }
  handleOpenEditModal(todos) {
    this.setState({
      showEditModal: true,
      editEmployee: todos
    });
  }

  handleOpenDeleteModal(todos) {
    this.setState({
      showDeleteModal: true,
      deleteEmployee: todos
    });
  }
  handleCloseModals() {
    this.setState({
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false
    });
  }

  handleOpenAddModal() {
    this.setState({ showAddModal: true });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={this.handleOpenAddModal}>
          Create TODOS
        </button>
        <br />
        <br />
        <Query query={queries.GET_TODOS}>
          {({ data }) => {
            console.log(data);
            const { todos } = data;
            if (!todos) {

              return null;
            }
            console.log({todos});
            return (
              <div>
                {todos.map(employee => {
                  let someVar = "";
                  if(employee.completed === "true")
                  {
                    someVar = "Completed"
                  }
                  else
                  {
                    someVar = "Pending"
                  }
                  return (
                    <div className="card" key={employee.id}>
                      <div className="card-body">
                        <h5 className="card-title">
                          Title: {employee.title}
                        </h5>
                        <h5> Status: {someVar}</h5>
                        <h5> Assigned to userId: {employee.userId}</h5>
                        <button
                          className="button"
                          onClick={() => {
                            this.handleOpenEditModal(employee);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="button"
                          onClick={() => {
                            console.log("inside", todos);
                            this.handleOpenDeleteModal(employee);
                          }}
                        >
                          Delete
                        </button>
                        <br />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Query>

        {/*Edit Employee Modal - NOT DONE YET */}
        {this.state && this.state.showEditModal && (
          <EditEmployeeModal
            isOpen={this.state.showEditModal}
            employee={this.state.editEmployee}
            handleClose={this.handleCloseModals}
          />
        )}

        {/*Add Employee Modal */}
        {this.state && this.state.showAddModal && (
          <AddModal
            isOpen={this.state.showAddModal}
            handleClose={this.handleCloseModals}
            modal="addEmployee"
          />
        )}

        {/*Delete Employee Modal */}
        {this.state && this.state.showDeleteModal && (
          <DeleteEmployeeModal
            isOpen={this.state.showDeleteModal}
            handleClose={this.handleCloseModals}
            deleteEmployee={this.state.deleteEmployee}
          />
        )}
      </div>
    );
  }
}

export default Employees;
